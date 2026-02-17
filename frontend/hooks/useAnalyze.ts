
import { useState } from 'react';
import { api, AnalysisResult, UploadResponse } from '@/lib/api';

export function useAnalyze() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(null);

    const processFile = async (file: File) => {
        setLoading(true);
        setError(null);
        setResult(null);
        setUploadResponse(null);

        try {
            console.log("Uploading file...");
            const uploadRes = await api.uploadFile(file);
            setUploadResponse(uploadRes);
            console.log("Upload successful, file_id:", uploadRes.file_id);

            console.log("Starting analysis...");
            const analysisRes = await api.analyzeData(uploadRes.file_id);
            setResult(analysisRes);
            console.log("Analysis successful");

        } catch (err: unknown) {
            console.error("Process failed:", err);
            // DEBUG LOG
            console.log("Full error object:", JSON.stringify(err, Object.getOwnPropertyNames(err)));

            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
            setError(errorMessage);
        } finally {
            console.log("Process finished, loading set to false");
            setLoading(false);
        }
    };

    const reset = () => {
        setLoading(false);
        setError(null);
        setResult(null);
        setUploadResponse(null);
    }

    return {
        loading,
        error,
        result,
        uploadResponse,
        processFile,
        reset
    };
}
