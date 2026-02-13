
// --- Types ---

export interface UploadResponse {
    file_id: string;
    filename: string;
    total_rows: number;
    preview_rows: Record<string, any>[];
    message: string;
}

export interface FraudCase {
    id: string;
    beneficiary_name: string;
    scheme: string;
    amount: number;
    risk_score: number;
    fraud_reasons: string[];
}

export interface AnalysisSummary {
    total_leakage_amount: number;
    flagged_count: number;
    total_records: number;
    average_risk_score: number;
    top_risk_state: string;
}

export interface AnalysisResult {
    file_id: string;
    summary: AnalysisSummary;
    cases: FraudCase[];
}

export interface SyntheticDataResponse {
    count: number;
    data: Record<string, any>[];
}

export interface LoginResponse {
    success: boolean;
    user: {
        id: number;
        username: string;
        role: string;
        full_name: string;
    };
    token: string;
    message: string;
}

// --- API Client ---

const API_BASE_URL = "http://127.0.0.1:8000";

export const api = {
    async login(username: string, password: string): Promise<LoginResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: "Login failed" }));
            throw new Error(error.detail || "Authentication failed");
        }

        return response.json();
    },

    async uploadFile(file: File): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: "Unknown upload error" }));
            throw new Error(errorData.detail || `Upload failed: ${response.statusText}`);
        }

        return response.json();
    },

    async analyzeData(fileId: string): Promise<AnalysisResult> {
        const response = await fetch(`${API_BASE_URL}/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ file_id: fileId }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: "Unknown analysis error" }));
            throw new Error(errorData.detail || `Analysis failed: ${response.statusText}`);
        }

        return response.json();
    },

    async getResults(fileId: string): Promise<AnalysisResult> {
        const response = await fetch(`${API_BASE_URL}/results/${fileId}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: "Unknown fetch error" }));
            throw new Error(errorData.detail || `Fetching results failed: ${response.statusText}`);
        }

        return response.json();
    }
};
