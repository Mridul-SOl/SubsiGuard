# SubsiGuard: Complete Project Guide & Tutorial

Welcome to **SubsiGuard**! 🛡️

Whether you are a complete beginner or a developer, this guide has everything you need. It explains **what** the project is, **how** it works (in simple terms), and **how to run it**.

---

## 🌟 Part 1: For Beginners (The "Restaurant" Analogy)

If you have **zero knowledge** of coding, think of this web application like a **Restaurant**.

### 1. The Big Picture

#### 🧑‍💻 **Frontend (The Waiter & Menu)** `SubsiGuard-FE`
*   **What it is**: This is the website you see and click on.
*   **Role**: It shows you the buttons, forms, and graphs. It takes your order (uploaded file) and brings you your food (results).
*   **Technology**: **Next.js** (React).

#### 👨‍🍳 **Backend (The Chef)** `SubsiGaurd-BE`
*   **What it is**: The kitchen in the back that you don't see.
*   **Role**: It does the hard work. It cooks the food (processes data), checks for bad ingredients (fraud detection), and plates it up.
*   **Technology**: **FastAPI** (Python).

#### 🧊 **Database (The Fridge)** `subsiguard.db`
*   **What it is**: Where ingredients (data) are stored.
*   **Role**: It keeps your files and results safe so they don't disappear when the chef goes home (server restarts).
*   **Technology**: **SQLite**.

### 2. The Workflow (How It Works)

1.  **You (User)** go to the website (Frontend).
2.  **You upload a file** (Order a meal).
3.  **Frontend** sends the file to the **Backend** (Waiter gives ticket to Chef).
4.  **Backend** saves the file in the **Database** (Chef puts ingredients in Fridge).
5.  **Backend** runs math to find fraud (Chef cooks the meal).
6.  **Backend** saves the result in the **Database**.
7.  **Frontend** asks for the result and shows it to you (Waiter brings your food).

---

## 🏗️ Part 2: Project Architecture & Code Tour

### The Backend (`backend/SubsiGaurd-BE`)

*   **`main.py`** (The Manager): The entry point. It starts the server and tells the backend which "routers" (stations) are open.
*   **`requirements.txt`** (Grocery List): A list of all tools we need to install (`fastapi`, `pandas`, `aiosqlite`).
*   **`api/`** (Kitchen Stations):
    *   **`upload.py`**: Handles incoming files.
    *   **`analyze.py`**: Triggers fraud detection.
    *   **`database.py`**: Connection line to the Database.
*   **`models/schemas.py`** (Recipes): Defines what data looks like (e.g., "A User has an ID and Name").
*   **`services/`** (Chefs):
    *   **`fraud_detection.py`**: The smart chef. Contains the logic to find fraud.
    *   **`data_storage.py`**: The inventory manager. Handles saving/loading from the DB.
*   **`subsiguard.db`** (Fridge): The file where data lives.

### The Frontend (`frontend/SubsiGuard-FE`)

*   **`app/`**:
    *   **`page.tsx`**: Homepage.
    *   **`upload/page.tsx`**: Upload page.
    *   **`dashboard/page.tsx`**: Dashboard with charts.
*   **`components/`**: Reusable blocks (Buttons, Cards, Navbar).
*   **`hooks/useAnalyze.ts`**: Special code that talks to the backend API.

---

## 🚀 Part 3: Getting Started (Setup Guide)

Follow these steps to set up and run the project from scratch.

### Prerequisites
*   **Node.js** (v18 or higher)
*   **Python** (v3.10 or higher. **Note:** Python 3.14 requires special care, which we handled).

### 1. Backend Setup (Python)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend/SubsiGaurd-BE
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # macOS/Linux
    python3 -m venv .venv
    source .venv/bin/activate
    
    # Windows
    python -m venv .venv
    .venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the Server:**
    ```bash
    uvicorn main:app --reload
    ```
    *   The server will start at `http://localhost:8000`.
    *   **API Docs**: `http://localhost:8000/docs`.

### 2. Frontend Setup (Next.js)

1.  **Open a NEW terminal** (keep the backend running).

2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend/SubsiGuard-FE
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    # OR
    npm start # if you built the project
    ```
    *   The app will start at `http://localhost:3000`.

---

## 📖 How to Use

1.  **Open the App**: Go to [http://localhost:3000](http://localhost:3000).
2.  **Upload Data**:
    *   Navigate to **Upload**.
    *   Upload a CSV file.
    *   *Need data?* Use the backend's `/synthetic` endpoint (via API docs) to generate it.
3.  **Analyze**: Click "Analyze".
4.  **View Results**:
    *   **Dashboard**: See charts and maps.
    *   **Results**: See line-by-line fraud details.

---

## 🔧 Troubleshooting

### 1. "Address already in use" (`Errno 48`)
*   **Problem**: Another process is using port 8000 (backend) or 3000 (frontend).
*   **Fix**: Kill the old process:
    ```bash
    lsof -ti:8000 | xargs kill -9
    ```

### 2. "Bad Interpreter" / "Module Not Found"
*   **Problem**: You moved the project folder, breaking the virtual environment.
*   **Fix**: Delete and recreate the `.venv` folder:
    ```bash
    rm -rf .venv
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    ```
