import { useQuery } from '@tanstack/react-query';
import { fetcher, ApiError } from '@/lib/api';

interface AnalysisSummary {
    total_leakage_amount: number;
    flagged_count: number;
    total_records: number;
    average_risk_score: number;
    top_risk_state: string;
}

interface FraudCase {
    id: string;
    beneficiary_name: string;
    scheme: string;
    amount: number;
    risk_score: number;
    fraud_reasons: string[];
}

interface AnalysisResult {
    file_id: string;
    summary: AnalysisSummary;
    cases: FraudCase[];
}

export function useGetResults(fileId: string) {
    return useQuery<AnalysisResult, ApiError>({
        queryKey: ['results', fileId],
        queryFn: () => fetcher<AnalysisResult>(`/results/${fileId}`),
        enabled: !!fileId,
    });
}
