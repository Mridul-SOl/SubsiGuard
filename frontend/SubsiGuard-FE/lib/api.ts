import { QueryClient } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiError {
    message: string;
    status?: number;
    details?: unknown;
}

/**
 * Base fetcher utility for API calls
 */
export async function fetcher<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${API_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
                status: response.status,
                details: errorData,
            } as ApiError;
        }

        return response.json();
    } catch (error) {
        if ((error as ApiError).status) {
            throw error;
        }
        throw {
            message: error instanceof Error ? error.message : 'Network error',
            details: error,
        } as ApiError;
    }
}

/**
 * Upload file to API
 */
export async function uploadFile(file: File): Promise<{ file_id: string; preview_rows: unknown[] }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
            message: errorData.message || 'Upload failed',
            status: response.status,
            details: errorData,
        } as ApiError;
    }

    return response.json();
}

/**
 * Create and configure the global QueryClient
 */
export function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 minutes
                gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
                retry: 1,
                refetchOnWindowFocus: false,
            },
            mutations: {
                retry: 0,
            },
        },
    });
}

export { API_URL };
