# 📂 SubsiGuard: Project Structure Reference

This document provides a hierarchical view of the SubsiGuard codebase, explaining the role of each directory and file.

## 🏗️ Project Overview

```text
SubsiGuard/
├── backend/                # 🍳 The "Kitchen" (Processing Data)
│   ├── api/                # 📍 API Endpoints (Upload, Analyze, Results)
│   │   ├── analyze.py      # Core logic trigger for fraud detection
│   │   ├── database.py     # SQLite connection configuration
│   │   ├── results.py      # Endpoints to fetch analysis results
│   │   ├── synthetic.py    # Endpoints to generate mock data
│   │   └── upload.py       # Endpoints to handle CSV file uploads
│   ├── models/             # 📦 Data structures (Tables, Schemas)
│   │   └── schemas.py      # Database tables and API validation models
│   ├── services/           # 🧠 Core Logic (Fraud Detection, Storage)
│   │   ├── fraud_detection.py # Rule-based & ML detection logic
│   │   ├── data_storage.py  # DB interaction for large datasets
│   │   └── synthetic_data.py # Logic for generating test data
│   ├── utils/              # 🛠️ Helper functions
│   ├── main.py             # ⚙️ The "Boss" (FastAPI Entry Point)
│   ├── requirements.txt    # 📋 Python dependency list
│   ├── subsiguard.db       # 🗄️ SQLite Database file
│   └── verify_script.py    # ✅ Script to test backend API
│
├── frontend/               # 📋 The "Menu" (User Interface)
│   ├── app/                # 🚀 Next.js Pages & Layouts (App Router)
│   │   ├── dashboard/      # Main stats and summary charts
│   │   ├── results/        # Detailed fraud case tables
│   │   ├── upload/         # CSV drag-and-drop upload interface
│   │   ├── layout.tsx      # Main layout (Navbar, Site structure)
│   │   └── page.tsx        # Homepage/Landing page
│   ├── components/         # 🧱 Reusable UI Blocks (Buttons, Cards, etc.)
│   │   ├── ui/             # Atomic components (Basics)
│   │   └── data-table.tsx  # Specialized table for displaying cases
│   ├── hooks/              # ⚓ Custom hooks for API communication
│   │   └── use-analyze.ts  # Logic for talking to the Analyze API
│   ├── public/             # 🖼️ Static files (Images, Icons)
│   ├── next.config.ts      # ⚙️ Configuration for Next.js
│   ├── package.json        # 📋 Javascript dependency list
│   └── tsconfig.json       # 📐 TypeScript configuration
│
├── docs/                   # 📖 Documentation & Guides
│   ├── COMMANDS.md         # ⚡ Quick-reference command cheat sheet
│   ├── PROJECT_GUIDE.md    # 🛡️ Beginner-friendly project tutorial
│   └── STRUCTURE.md        # 📂 This visual structure reference
│
├── start.sh                # 🚀 One-click Startup Script (Opens Tabs)
├── stop.sh                 # 🛑 One-click Stop Script (Stops services)
├── setup_git.sh            # 🐙 Script to initialize Git repo
└── sample_subsidy_data.csv # 📊 Test CSV data for uploading
```

---

## ✅ Key Structure Features
1.  **Flattened Architecture**: Redundant subfolders have been removed for a cleaner developer experience.
2.  **Logic-Data Separation**: Backend logic is separated into `api` (input), `services` (processing), and `models` (structure).
3.  **App Router**: The frontend uses the modern Next.js App Router for faster, more organized page handling.
4.  **Dev-Friendly Tools**: Includes startup/stop scripts and sample data to get running instantly.
