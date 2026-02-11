'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadFile, ApiError } from '@/lib/api';
import { toast } from 'sonner';

interface UploadResponse {
    file_id: string;
    filename: string;
    preview_rows: Record<string, unknown>[];
    total_rows: number;
}

export function useUploadCsv() {
    return useMutation<UploadResponse, ApiError, File>({
        mutationFn: async (file: File) => {
            const response = await uploadFile(file);
            return {
                file_id: response.file_id,
                filename: file.name,
                preview_rows: response.preview_rows as Record<string, unknown>[],
                total_rows: 0 // The API might not return total_rows immediately, adjusting based on response type
            };
        },
        onSuccess: (data) => {
            toast.success('File uploaded successfully', {
                description: `${data.filename} ready for analysis.`
            });
        },
        onError: (error) => {
            toast.error('Upload failed', {
                description: error.message
            });
        }
    });
}
