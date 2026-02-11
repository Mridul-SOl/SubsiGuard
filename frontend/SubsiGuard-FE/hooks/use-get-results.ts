'use client';

import { useQuery } from '@tanstack/react-query';
import { ApiError, fetcher } from '@/lib/api';

export interface FraudCase {
  id: string;
  beneficiary_name: string;
  scheme: string;
  amount: number;
  state: string;
  district: string;
  pincode: string;
  status: 'Flagged' | 'Verified' | 'Suspicious';
  risk_score: number;
  fraud_reasons: string[];
  submission_date: string;
}

export interface AnalysisResults {
  file_id: string;
  summary: {
    total_records: number;
    flagged_count: number;
    total_leakage_amount: number;
    average_risk_score: number;
    top_risk_state: string;
  };
  cases: FraudCase[];
  distribution: {
    state_breakdown: Record<string, number>;
    risk_levels: { high: number; medium: number; low: number };
  };
}

export function useGetResults(fileId: string) {
  return useQuery<AnalysisResults, ApiError>({
    queryKey: ['results', fileId],
    queryFn: async () => {
      return fetcher<AnalysisResults>(`/results/${fileId}`);
    },
    enabled: !!fileId,
  });
}
