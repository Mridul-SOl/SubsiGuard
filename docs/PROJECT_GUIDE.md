# SubsiGuard: Complete Project Guide & Tutorial

Welcome to **SubsiGuard**! 🛡️

Whether you are a complete beginner or a developer, this guide has everything you need. It explains **what** the project is, **how** it works (in simple terms), and **how to run it**.

---

## 🌟 Part 1: For Beginners (The "Restaurant" Analogy)

If you have **zero knowledge** of coding, think of this web application like a **Restaurant**.

### 1. The Big Picture

#### 🧑‍💻 **Frontend (The Waiter & Menu)**
*   **What it is**: This is the website you see and click on (located in the `frontend/` folder).
*   **Role**: It shows you the buttons, forms, and graphs. It takes your order (uploaded file) and brings you your food (results).
*   **Technology**: **Next.js** (React).

#### 👨‍🍳 **Backend (The Chef)**
*   **What it is**: The kitchen in the back that you don't see (located in the `backend/` folder).
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

### The Backend (`backend/`)

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

### The Frontend (`frontend/`)

*   **`app/`**:
    *   **`page.tsx`**: Homepage.
    *   **`upload/page.tsx`**: Upload page.
    *   **`dashboard/page.tsx`**: Dashboard with charts.
*   **`components/`**: Reusable blocks (Buttons, Cards, Navbar).
*   **`hooks/useAnalyze.ts`**: Special code that talks to the backend API.

---

---

## 🚀 Part 3: Getting Started (Quick Setup)

The fastest way to get SubsiGuard running on a new computer is using the **Unified Initializer**.

### 1. One-Command Setup
Open your terminal in the **project root folder** and run:
```bash
./init_project.sh
```
*This script will automatically:*
*   Check if you have Python and Node installed.
*   Create the Python virtual environment and install backend libraries.
*   Install all frontend (Next.js) tools.

### 2. Start the App
Once the setup is done, launch everything with:
```bash
./start.sh
```

---

## 🏗️ Part 4: Manual Setup (Advanced)

If you prefer to setup parts individually:

### 1. Backend Setup
1. `cd backend`
2. `python3 -m venv .venv`
3. `source .venv/bin/activate`
4. `pip install -r requirements.txt`
5. `uvicorn main:app --reload`

### 2. Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

## 📖 How to Use

1.  **Open the App**: Go to [http://localhost:3000](http://localhost:3000).
2.  **Upload Data**:
    *   Navigate to **Upload**.
    *   Upload a CSV file.
3.  **Analyze**: Click "Analyze".
4.  **View Results**:
    *   **Dashboard**: See charts and maps.
    *   **Results**: See line-by-line fraud details.

---

## 🔧 Troubleshooting

### 1. "Address already in use" (`Errno 48`)
*   **Problem**: Another process is using port 8000 (backend) or 3000 (frontend).
*   **Fix**: Run `./stop.sh` from the root folder.

### 2. "ValueError: the greenlet library is required"
*   **Fix**: Run `pip install greenlet` in the backend folder.
