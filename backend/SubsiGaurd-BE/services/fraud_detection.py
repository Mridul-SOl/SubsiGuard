import pandas as pd
from sklearn.ensemble import IsolationForest
from typing import List, Dict, Any, Tuple
from models.schemas import FraudRecord, AnalysisResult

class FraudDetector:
    def __init__(self, contamination: float = 0.08):
        self.contamination = contamination
        self.model = IsolationForest(contamination=self.contamination, random_state=42)

    def detect_fraud(self, file_id: str, df: pd.DataFrame) -> AnalysisResult:
        # 1. Rule-Based Detection
        rule_flags = self._apply_rules(df)
        
        # 2. ML-Based Detection (Isolation Forest)
        ml_flags, scores = self._apply_ml(df)
        
        # 3. Combine Results
        results = []
        flagged_count = 0
        
        for idx, row in df.iterrows():
            reasons = rule_flags.get(idx, [])
            is_ml_fraud = ml_flags[idx] == -1 # -1 is anomaly in Isolation Forest
            
            if is_ml_fraud:
                reasons.append("ML Anomaly Detected (Unusual Pattern)")
            
            is_fraud = len(reasons) > 0
            if is_fraud:
                flagged_count += 1
            
            # Normalize score to 0-1 range (approximate)
            # Isolation Forest scores are roughly -0.5 to 0.5, lower is more anomalous
            # Inverting so higher = more likely fraud
            normalized_score = 0.5 - scores[idx] 
            normalized_score = max(0.0, min(1.0, normalized_score)) # Clamp to 0-1

            if is_fraud:
                 results.append(FraudRecord(
                    record_id=idx,
                    data=row.to_dict(),
                    fraud_score=normalized_score,
                    is_fraud=True,
                    reasons=reasons
                ))

        leakage_percent = (flagged_count / len(df)) * 100 if len(df) > 0 else 0
        
        # Identify high risk states
        high_risk_states = []
        if flagged_count > 0:
            flagged_df = pd.DataFrame([r.data for r in results])
            if 'state' in flagged_df.columns:
                 high_risk_states = flagged_df['state'].value_counts().head(3).index.tolist()

        return AnalysisResult(
            file_id=file_id,
            total_records=len(df),
            flagged_count=flagged_count,
            leakage_percent=round(leakage_percent, 2),
            high_risk_states=high_risk_states,
            flagged_records=results
        )

    def _apply_rules(self, df: pd.DataFrame) -> Dict[int, List[str]]:
        flags = {}
        
        # Pre-calculate implementation for speed
        aadhaar_counts = df['aadhaar'].value_counts()
        
        for idx, row in df.iterrows():
            reasons = []
            
            # Rule 1: Duplicate Aadhaar
            if aadhaar_counts.get(row['aadhaar'], 0) > 1:
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

    def _apply_ml(self, df: pd.DataFrame) -> Tuple[Any, Any]:
        # Select numeric features for ML
        features = ['amount', 'income']
        
        # Handle missing or non-numeric data simply for MVP
        X = df[features].apply(pd.to_numeric, errors='coerce').fillna(0)
        
        self.model.fit(X)
        flags = self.model.predict(X)
        scores = self.model.decision_function(X)
        
        return flags, scores
