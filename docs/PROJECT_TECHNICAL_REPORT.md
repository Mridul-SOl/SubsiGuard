# SubsiGuard: Technical Project Report

**Project Name:** SubsiGuard
**Domain:** Government Technology (GovTech) / FinTech
**Objective:** AI-Powered Fraud Detection for Public Subsidy Schemes

---

## 1. Executive Summary

SubsiGuard is an advanced analytics platform designed to detect and prevent financial leakage in India's government subsidy distribution systems (such as PDS, PM-KISAN, and MGNREGA). By leveraging a hybrid approach of rule-based policy enforcement and machine learning-driven anomaly detection, SubsiGuard identifies fraudulent claims, duplicate beneficiaries, and potential misuse of funds in real-time.

---

## 2. Technical Stack Overview

The application is built using a modern, scalable architecture designed for high performance and ease of deployment.

| Component | Technology | Reasoning |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14** (React) | Server-side rendering for speed, App Router for modern navigation. |
| **Styling** | **Tailwind CSS** | rapid UI development, responsive design, and consistent theming. |
| **Backend** | **Python (FastAPI)** | High-performance async API, native support for ML libraries. |
| **AI/ML Engine** | **Scikit-Learn** | Robust library for implementing the Isolation Forest algorithm. |
| **Data Processing** | **Pandas** | Efficient handling and manipulation of large CSV datasets. |
| **Database** | **SQLite** (Dev) / **PostgreSQL** (Prod) | Relational data integrity for user management and audit logs. |
| **Visualization** | **Recharts** & **Leaflet.js** | Interactive charts and geographical heatmaps for data insights. |

---

## 3. Frontend Architecture (The User Interface)

The frontend is the command center for government officials. It is designed to be intuitive, accessible, and information-dense.

### Key Modules:
*   **FileUpload Component:** A drag-and-drop interface that accepts large CSV files. It handles file validation and securely streams data to the backend.
*   **Analytical Dashboard:**
    *   **Live Metrics:** Displays total leakage prevented, active cases, and risk distribution.
    *   **Interactive Heatmap:** Visualizes high-risk districts across India using geospatial data.
    *   **Bento Grid Layout:** Organizes complex data into digestible, modular blocks.
*   **Results & Reporting:**
    *   Detailed case view for individual beneficiaries.
    *   **Client-Side PDF Generation:** Uses `jspdf` to generate official audit reports directly in the browser.
*   **Demo Mode:** A built-in simulation layer that allows the frontend to demonstrate full functionality (charts, uploads, analysis) even without a live backend connection, ensuring reliability during presentations.

---

## 4. Backend Architecture (The Intelligence Core)

The backend is a RESTful API service built with **FastAPI**. It follows a modular structure separating API routes, business logic services, and data models.

### Key Services:
*   **Auth Service:** Handles user authentication using JWT (JSON Web Tokens) to secure API endpoints.
*   **Ingestion Service:** Parses uploaded files, cleans data (handling missing values/types), and prepares it for analysis.
*   **Fraud Detection Engine:** The core microservice that runs the hybrid analysis logic.

### API Endpoints:
*   `POST /auth/login`: Authenticates users and issues tokens.
*   `POST /upload`: Accepts beneficiary data files.
*   `POST /analyze`: Triggers the fraud detection pipeline.
*   `GET /results/{id}`: Retrieves detailed analysis for a processed file.

---

## 5. Database Schema & Data Logic

While the system is designed to be stateless for high-throughput file processing, it maintains a structured schema for user management and audit trails.

### Primary Entities:
1.  **Users:**
    *   `id` (PK), `username`, `password_hash`, `role` (e.g., Administrator, Field Officer).
2.  **AuditLogs:**
    *   `id` (PK), `user_id` (FK), `action`, `timestamp`, `details`.
3.  **BeneficiaryData (In-Memory/Temporary):**
    *   During analysis, data is processed as **DataFrames**.
    *   **Fields Analyzed:** `beneficiary_id`, `name`, `aadhaar_hash`, `scheme`, `subsidy_amount`, `income_level`, `location`.

---

## 6. The AI & Fraud Detection Logic

SubsiGuard uses a **Hybrid Detection Strategy** to maximize accuracy and minimize false positives.

### Phase 1: Deterministic Rule Engine
Strict checks against defined government policies.
*   **Duplicate Check:** Flags identical Aadhaar numbers appearing multiple times.
*   **Income Viability:** Flags beneficiaries with reported income > ₹2,50,000 (ineligible for most schemes).
*   **High-Value Claims:** Flags claims exceeding standard thresholds (e.g., > ₹50,000).

### Phase 2: Probabilistic ML Model
Captures complex, non-linear fraud patterns that rules miss.
*   **Algorithm:** **Isolation Forest** (Unsupervised Anomaly Detection).
*   **Feature Engineering:** The model analyzes relationships between features (e.g., `Income` vs. `Subsidy Amount`).
*   **Anomaly Scoring:** Data points that isolate quickly in the decision trees are marked as anomalies. These receive a high "Risk Score".

### Phase 3: Risk Scoring & Remediation
*   A final **Risk Score (0-100)** is calculated for every record.
*   **High Risk (80-100):** Immediate block recommendation.
*   **Medium Risk (50-79):** Marked for field verification.
*   **Low Risk (0-49):** Cleared for payment.

---


---

## 8. National Impact Overview

SubsiGuard is not just a digital tool; it is a strategic asset for national economic security. By deploying this system, potential impacts span across economic, social, and administrative domains.

### 💰 Economic Impact
*   **Leakage Prevention:** Estimates suggest that 10-15% of subsidy funds are lost to leakage. For a scheme like PDS (₹2 Lakh Crore budget), SubsiGuard could potentially save **₹20,000 Crore annually**.
*   **Fiscal De-burdening:** Recovered funds can be redirected to reduce the national fiscal deficit or fund infrastructure projects.
*   **Direct Benefit Transfer (DBT) Efficiency:** Ensures that 100% of the intended amount reaches the genuine beneficiary without intermediary siphoning.

### 🤝 Social Impact
*   **Equity & Fairness:** By removing ghost beneficiaries and ineligible claimants (e.g., wealthy individuals), the system ensures resources are available for the *poorest of the poor*.
*   **Trust in Governance:** Transparent, AI-driven audits reduce human bias and corruption, restoring public faith in welfare distribution.
*   **Faster Dispute Resolution:** Genuine beneficiaries wrongly flagged can be quickly verified using the digital trail, reducing harassment.

### 🏛️ Administrative Impact
*   **Workload Reduction:** Automates the initial screening of millions of records, allowing field officers to focus only on the <1% of high-risk cases.
*   **Data-Driven Policy:** The "Live Monitoring" dashboard provides policymakers with real-time insights into which districts or schemes are most vulnerable, enabling targeted interventions.
*   **Standardization:** Creates a unified fraud detection standard across states, replacing fragmented and manual verification processes.

---

## 9. Future Roadmap

1.  **Aadhaar API Integration:** Real-time biometric verification.
2.  **Blockchain Ledger:** Storing audit logs on a private blockchain for immutability.
3.  **Multilingual Support:** Adding 12+ regional Indian languages for local field officers.

