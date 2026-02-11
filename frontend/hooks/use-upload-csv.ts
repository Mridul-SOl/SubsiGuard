import { useMutation } from '@tanstack/react-query';
import { uploadFile, ApiError } from '@/lib/api';

interface UploadResponse {
    file_id: string;
    filename: string;
    preview_rows: any[];
    total_rows: number;
    message?: string;
}

export function useUploadCsv() {
    return useMutation<UploadResponse, ApiError, File>({
        mutationFn: (file: File) => {
            // Note: uploadFile in lib/api.ts already returns the correct promise
            return uploadFile(file) as Promise<UploadResponse>;
        },
    });
}
