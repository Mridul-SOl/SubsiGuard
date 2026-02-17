# SubsiGuard Project Description Prompt

You can use the following prompt to explain the SubsiGuard project to another AI:

---

**Project: SubsiGuard - AI-Powered Subsidy Leakage Detection System**

**Objective:**
Developed a comprehensive dashboard to detect and prevent leakage in Indian government subsidy programs (PDS, PM-KISAN, MGNREGA, LPG). The goal is to identify fraudulent beneficiaries and anomalies in disbursement data to save public funds.

**Problem Statement:**
Government subsidies often suffer from "leakage" due to ghost beneficiaries, duplicate claims, and ineligible recipients. Verifying millions of records manually is impossible.

**Solution:**
SubsiGuard is a full-stack web application that allows officials to upload beneficiary data (CSV), automatically analyzes it using a hybrid detection engine, and visualizes the results on an interactive dashboard.

**Technical Architecture:**

1.  **Frontend (User Interface):**
    *   **Framework:** Next.js 15 (App Router) with TypeScript.
    *   **Styling:** Tailwind CSS + Shadcn UI for a premium, clean, government-tech aesthetic.
    *   **Features:**
        *   **Drag-and-Drop Upload**: Parses CSV files in the browser.
        *   **Interactive Dashboard**: Uses Recharts for data visualization (bar charts, area charts).
        *   **Bento Grid Layout**: "Live Monitoring" section to show key metrics at a glance.
        *   **Report Generation**: Auto-generates PDF audit reports for officials.

2.  **Backend (Logic & API):**
    *   **Framework:** FastAPI (Python) for high-performance async processing.
    *   **Database:** SQLite with SQLModel (Async) for local data persistence.
    *   **Fraud Detection Engine:**
        *   **Rule-Based:** Checks specific government criteria (e.g., income limits).
        *   **Statistical/ML Anomaly Detection:** Uses Z-Score analysis (optimized for serverless deployment) to identify statistical outliers in claim amounts and frequencies.

3.  **Deployment & Infrastructure:**
    *   **Monorepo:** Both frontend and backend are in a single Git repository.
    *   **Platform:** Vercel (Frontend on Next.js, Backend as Serverless Python Functions).
    *   **CI/CD:** Automated deployments via GitHub.

**Key Workflows:**
1.  **Upload:** User uploads a CSV file containing beneficiary details (Name, Aadhaar, Scheme, Amount, Income, etc.).
2.  **Analyze:** The backend processes the file, runs validation rules, and calculates risk scores for each record.
3.  **Visualize:** The frontend displays the "Leakage Estimate," "High-Risk Cases," and "Fraud Distribution" charts.
4.  **Act:** Officials can download a detailed audit report ("Final Audit Report") with executive summaries and recommendations.

**Current Status:**
The project is fully functional with a working frontend-backend integration. It includes a "Demo Mode" for testing without a backend and a "Real Mode" for actual data processing.

---
