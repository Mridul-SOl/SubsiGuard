import pandas as pd
from typing import List, Dict, Any, Tuple
from models.schemas import FraudRecord, AnalysisResult, FraudCase, AnalysisSummary

class FraudDetector:
    def __init__(self, contamination: float = 0.08):
        self.contamination = contamination
        # No heavy ML model needed for Z-Score analysis

    def detect_fraud(self, file_id: str, df: pd.DataFrame) -> AnalysisResult:
        # 1. Rule-Based Detection
        rule_flags = self._apply_rules(df)
        
        # 2. Statistical Detection (Z-Score)
        # Replaces heavy ML model with lightweight stats
        stat_flags, scores = self._apply_statistical_analysis(df)
        
        # 3. Combine Results
        results = []
        flagged_count = 0
        
        for idx, row in df.iterrows():
            reasons = rule_flags.get(idx, [])
            is_stat_fraud = stat_flags[idx] == 1 
            
            if is_stat_fraud:
                reasons.append("Statistical Anomaly (High Deviation)")
            
            is_fraud = len(reasons) > 0
            if is_fraud:
                flagged_count += 1
            
            # Use the statistical score as the fraud score (clamped 0-1)
            normalized_score = scores[idx]
            normalized_score = max(0.0, min(1.0, normalized_score))

            if is_fraud:
                 results.append(FraudRecord(
                    record_id=idx,
                    data=row.to_dict(),
                    fraud_score=normalized_score,
                    is_fraud=True,
                    reasons=reasons
                ))

        leakage_percent = (flagged_count / len(df)) * 100 if len(df) > 0 else 0
        
        # Prepare FraudCase objects
        fraud_cases = []
        total_leakage_amount = 0.0
        total_risk_score = 0
        
        for record in results:
            fraud_cases.append(FraudCase(
                id=str(record.record_id),
                beneficiary_name=record.data.get('name', 'Unknown'),
                scheme=record.data.get('subsidy_type', 'Unknown'),
                amount=record.data.get('amount', 0.0),
                risk_score=int(record.fraud_score * 100),
                fraud_reasons=record.reasons
            ))
            total_leakage_amount += record.data.get('amount', 0.0)
            total_risk_score += int(record.fraud_score * 100)

        average_risk_score = int(total_risk_score / flagged_count) if flagged_count > 0 else 0
        
        # Identify top risk state
        top_risk_state = "N/A"
        if flagged_count > 0:
            flagged_df = pd.DataFrame([r.data for r in results])
            if 'state' in flagged_df.columns:
                 top_risk_state = flagged_df['state'].value_counts().idxmax()

        return AnalysisResult(
            file_id=file_id,
            summary=AnalysisSummary(
                total_leakage_amount=round(total_leakage_amount, 2),
                flagged_count=flagged_count,
                total_records=len(df),
                average_risk_score=average_risk_score,
                top_risk_state=top_risk_state
            ),
            cases=fraud_cases
        )

    def _apply_rules(self, df: pd.DataFrame) -> Dict[int, List[str]]:
        flags = {}
        
        # Pre-calculate implementation for speed
        if 'aadhaar' in df.columns:
            aadhaar_counts = df['aadhaar'].value_counts()
        else:
            aadhaar_counts = {}
        
        for idx, row in df.iterrows():
            reasons = []
            
            # Rule 1: Duplicate Aadhaar
            if 'aadhaar' in row and aadhaar_counts.get(row['aadhaar'], 0) > 1:
                reasons.append("Duplicate Aadhaar Number")
            
            # Rule 2: High Income Threshold
            try:
                income = float(row.get('income', 0))
                if income > 250000:
                    reasons.append("Income exceeds threshold (₹2.5L)")
            except ValueError:
                pass
            
            # Rule 3: High Claim Amount (Simple threshold for MVP)
            try:
                 amount = float(row.get('amount', 0))
                 if amount > 50000: # Arbitrary high amount for MVP
                      reasons.append("Unusually high claim amount (>₹50k)")
            except ValueError:
                 pass

            if reasons:
                flags[idx] = reasons
                
        return flags

    def _apply_statistical_analysis(self, df: pd.DataFrame) -> Tuple[Any, Any]:
        """
        Calculates Z-scores for numerical columns to find statistical outliers.
        This replaces the heavy ML model for Vercel optimization.
        """
        features = ['amount', 'income']
        # Initialize flags (0 = normal, 1 = anomaly/fraud)
        flags = pd.Series(0, index=df.index)
        # Initialize scores (0.0 to 1.0)
        scores = pd.Series(0.0, index=df.index)
        
        # Ensure we have data
        if df.empty:
            return flags, scores

        for feature in features:
            if feature not in df.columns:
                continue
                
            # Convert to numeric, handle errors
            series = pd.to_numeric(df[feature], errors='coerce').fillna(0)
            
            # Calculate Z-Score: (Value - Mean) / StdDev
            mean = series.mean()
            std = series.std()
            
            if std == 0:
                continue
                
            z_scores = (series - mean) / std
            
            # Flag anything > 3 standard deviations as anomaly
            # Using bitwise OR to combine flags from multiple features
            is_outlier = z_scores.abs() > 3
            flags = flags | is_outlier.astype(int)
            
            # Normalize Z-score to 0-1 specific risk contribution
            # Cap Z-score at 5 for normalization purposes
            risk_contribution = (z_scores.abs() / 5).clip(0, 1)
            
            # Take the max risk score across features
            scores = pd.concat([scores, risk_contribution], axis=1).max(axis=1)

        return flags, scores
