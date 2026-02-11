import { useMutation } from '@tanstack/react-query';
import { fetcher, ApiError } from '@/lib/api';

interface AnalyzeResponse {
    file_id: string;
    status: string;
    message: string;
}

export function useAnalyze() {
    return useMutation<AnalyzeResponse, ApiError, { file_id: string }>({
        mutationFn: async ({ file_id }) => {
            return fetcher<AnalyzeResponse>('/analyze', {
                method: 'POST',
                body: JSON.stringify({ file_id }),
            });
        },
    });
}
