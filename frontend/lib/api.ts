
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

export interface AnalysisReportDetails {
    executive_summary: string;
    key_findings: string[];
    recommendations: string[];
    conclusion: string;
}

export interface AnalysisResult {
    file_id: string;
    summary: AnalysisSummary;
    cases: FraudCase[];
    report_details?: AnalysisReportDetails;
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

// --- API Client ---

const API_BASE_URL = "/api";

// TOGGLE THIS FOR THE HACKATHON DEMO
// If your backend isn't deployed, set this to true to use fake data.
const USE_DEMO_MODE = true;

const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
    async login(username: string, password: string): Promise<LoginResponse> {
        if (USE_DEMO_MODE) {
            await mockDelay(1000);
            if (username && password) { // Accept any creds for demo
                return {
                    success: true,
                    user: {
                        id: 1,
                        username: username,
                        role: "Administrator",
                        full_name: "Admin User"
                    },
                    token: "mock-demo-token-12345",
                    message: "Login successful (Demo Mode)"
                };
            }
        }

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
        if (USE_DEMO_MODE) {
            await mockDelay(1500);
            return {
                file_id: "demo-file-id-" + Math.random().toString(36).substring(7),
                filename: file.name,
                total_rows: 15420,
                preview_rows: [
                    { "TransactionID": "TXN88210", "Beneficiary": "Ramesh Kumar", "Amount": 4500, "State": "Uttar Pradesh" },
                    { "TransactionID": "TXN88211", "Beneficiary": "Sita Devi", "Amount": 4500, "State": "Bihar" },
                    { "TransactionID": "TXN88212", "Beneficiary": "Abdul Khan", "Amount": 4500, "State": "Maharashtra" },
                    { "TransactionID": "TXN88213", "Beneficiary": "John Doe", "Amount": 4500, "State": "Kerala" },
                    { "TransactionID": "TXN88214", "Beneficiary": "Priya Singh", "Amount": 4500, "State": "Punjab" },
                ],
                message: "File uploaded successfully (Demo Mode)"
            };
        }

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
        if (USE_DEMO_MODE) {
            await mockDelay(2000);
            return {
                file_id: fileId,
                summary: {
                    total_leakage_amount: 14500000, // 1.45 Cr
                    flagged_count: 342,
                    total_records: 15420,
                    average_risk_score: 78.5,
                    top_risk_state: "Uttar Pradesh"
                },
                cases: [
                    { id: "CASE-001", beneficiary_name: "Ramesh Kumar", scheme: "PM-KISAN", amount: 6000, risk_score: 95, fraud_reasons: ["Duplicate Beneficiary", "Invalid Land Record"] },
                    { id: "CASE-002", beneficiary_name: "Sita Devi", scheme: "PDS", amount: 2500, risk_score: 88, fraud_reasons: ["Ghost Beneficiary", "Location Mismatch"] },
                    { id: "CASE-003", beneficiary_name: "Vikram Singh", scheme: "MGNREGA", amount: 12000, risk_score: 92, fraud_reasons: ["Wage Syphoning", "Impossible Work Hours"] },
                    { id: "CASE-004", beneficiary_name: "Anita Raj", scheme: "PDS", amount: 1800, risk_score: 85, fraud_reasons: ["Bulk Purchase Anomaly"] },
                    { id: "CASE-005", beneficiary_name: "Mohammed Ali", scheme: "PM-KISAN", amount: 6000, risk_score: 98, fraud_reasons: ["Deceased Beneficiary Claim"] },
                    { id: "CASE-006", beneficiary_name: "Rahul Verma", scheme: "LPG", amount: 900, risk_score: 76, fraud_reasons: ["Multiple Connections", "Income > Threshold"] },
                    { id: "CASE-007", beneficiary_name: "Sunita Gupta", scheme: "PDS", amount: 3200, risk_score: 82, fraud_reasons: ["Outlier Transaction Pattern"] },
                    { id: "CASE-008", beneficiary_name: "Amit Shah", scheme: "PM-KISAN", amount: 6000, risk_score: 45, fraud_reasons: ["Data Mismatch (Minor)"] },
                    { id: "CASE-009", beneficiary_name: "Priya Sharma", scheme: "MGNREGA", amount: 8500, risk_score: 89, fraud_reasons: ["Ghost Worker", "Bank Account Flagged"] },
                    { id: "CASE-010", beneficiary_name: "Karan Johar", scheme: "LPG", amount: 1200, risk_score: 91, fraud_reasons: ["Commercial Use of Domestic Cylinder"] },
                ],
                report_details: {
                    executive_summary: "The automated audit of the provided beneficiary dataset reveals significant anomalies indicating potential systemic fraud. The hybrid detection engine (Rule-based + Isolation Forest) has flagged 2.2% of the total records as 'High Risk'. The primary drivers of these anomalies appear to be duplicate identity registrations across multiple schemes and income threshold violations. Immediate corrective action is advised to prevent estimated leakage of ₹1.45 Cr.",
                    key_findings: [
                        "342 beneficiaries flagged with Risk Score > 80, indicating near-certain fraud.",
                        "Cluster analysis detected 4 distinct groups of 'Ghost Beneficiaries' sharing identical bank account details.",
                        "Geographic mismatch found in 12% of PDS claims (claimant location vs. fair price shop location).",
                        "Income verification API cross-check failed for 89 PM-KISAN recipients."
                    ],
                    recommendations: [
                        "Immediately freeze payments for the 342 high-risk cases pending physical verification.",
                        "Initiate e-KYC re-verification for the identified cluster of duplicate accounts.",
                        "Deploy field inspection teams to the 'Uttar Pradesh' and 'Bihar' border districts where geographic mismatches are highest.",
                        "Integrate real-time bank account validation API to prevent future duplicate entries."
                    ],
                    conclusion: "The dataset exhibits a high probability of organized leakage. While the majority of records (97.8%) appear compliant, the concentrated nature of the flagged cases suggests a coordinated attempt to siphon funds. Implementing the recommended freeze and re-verification protocols could save the exchequer approximately ₹1.45 Cr in this cycle alone."
                }
            };
        }

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
        if (USE_DEMO_MODE) {
            // Mock data is same as analyze for now
            return this.analyzeData(fileId);
        }

        const response = await fetch(`${API_BASE_URL}/results/${fileId}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: "Unknown fetch error" }));
            throw new Error(errorData.detail || `Fetching results failed: ${response.statusText}`);
        }

        return response.json();
    },

    async downloadReport(fileId: string): Promise<void> {
        if (USE_DEMO_MODE) {
            await mockDelay(1000);
            // Create a dummy CSV for demo
            const csvContent = "data:text/csv;charset=utf-8,"
                + "TransactionID,Beneficiary,Amount,Status,RiskScore\n"
                + "TXN88210,Ramesh Kumar,4500,Flagged,95\n"
                + "TXN88211,Sita Devi,4500,Cleared,12\n"
                + "TXN88212,Abdul Khan,4500,Flagged,88";

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `subsiguard_audit_${fileId}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
        }

        const response = await fetch(`${API_BASE_URL}/results/${fileId}/export`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: "Unknown export error" }));
            throw new Error(errorData.detail || `Export failed: ${response.statusText}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `subsiguard_export_${fileId}.csv`); // Assuming CSV
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
};
