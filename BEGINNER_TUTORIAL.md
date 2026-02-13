# 🎓 SubsiGuard: A Beginner's Guide

Welcome! If you have **zero knowledge** of coding, think of this web application like a **Restaurant**.

---

## 1. The Big Picture (The Restaurant Analogy)

### 🧑‍💻 **Frontend (The Waiter & Menu)** `SubsiGuard-FE`
*   **What it is**: This is what you (the customer) see and touch.
*   **Role**: It shows you the buttons, forms, and graphs. It takes your order (uploaded file) and brings you your food (results).
*   **Technology**: **Next.js** (React).

### 👨‍🍳 **Backend (The Chef)** `SubsiGaurd-BE`
*   **What it is**: The kitchen in the back that you don't see.
*   **Role**: It does the hard work. It cooks the food (processes data), checks for bad ingredients (fraud detection), and plates it up.
*   **Technology**: **FastAPI** (Python).

### 🧊 **Database (The Fridge)** `subsiguard.db`
*   **What it is**: Where ingredients (data) are stored.
*   **Role**: It keeps your files and results safe so they don't disappear when the chef goes home (server restarts).
*   **Technology**: **SQLite**.

---

## 2. How It All Works Together (The Workflow)

1.  **You (User)** go to the website (Frontend).
2.  **You upload a file** (Order a meal).
3.  **Frontend** sends the file to the **Backend** (Waiter gives ticket to Chef).
4.  **Backend** saves the file in the **Database** (Chef puts ingredients in Fridge).
5.  **Backend** runs math to find fraud (Chef cooks the meal).
6.  **Backend** saves the result in the **Database**.
7.  **Frontend** asks for the result and shows it to you (Waiter brings your food).

---

## 3. Tour of the Code (Files & Folders)

### 📂 The Backend (`backend/SubsiGaurd-BE`)

*   **`main.py`** (The Restaurant Manager)
    *   This is the entry point. It starts the server and tells the backend which "routers" (stations) are open.
*   **`requirements.txt`** (The Grocery List)
    *   A list of all the tools (libraries) we need to install, like `fastapi`, `pandas`, `aiosqlite`.
*   **`api/`** (The Kitchen Stations)
    *   **`upload.py`**: Handles incoming files.
    *   **`analyze.py`**: Triggers the fraud detection logic.
    *   **`database.py`**: The connection line to the Database.
*   **`models/schemas.py`** (The Recipes)
    *   Defines what data looks like. "A User has an ID and a Name". "A Result has a score and a list of frauds".
*   **`services/`** (The Chefs)
    *   **`fraud_detection.py`**: The smart chef. It contains the logic to actually find fraud.
    *   **`data_storage.py`**: The inventory manager. It handles saving/loading from the database.
*   **`subsiguard.db`** (The Fridge)
    *   A single file that contains all your saved data.

### 📂 The Frontend (`frontend/SubsiGuard-FE`)

*   **`app/`** (The Dining Area)
    *   **`page.tsx`**: The homepage you see first.
    *   **`upload/page.tsx`**: The page where you upload files.
    *   **`dashboard/page.tsx`**: The page with all the charts.
*   **`components/`** (The Utensils)
    *   Reusable blocks like `Button.tsx`, `Card.tsx`, `Navbar.tsx`. Instead of writing code for a button 10 times, we write it once here and use it everywhere.
*   **`hooks/useAnalyze.ts`** (The Waiter's Notepad)
    *   Special code that handles talking to the backend API. "Go tell the backend to analyze this file".

---

## 4. Why is this structure "Good"?

1.  **Separation of Concerns**: The interface (Frontend) is separate from the logic (Backend). You can change the colors of the website without breaking the fraud detection math.
2.  **Modularity**: Each file has **one job**. `upload.py` only handles uploads. `database.py` only handles database connections. This makes it easy to fix bugs.
3.  **Scalability**: Because it's organized, you can easily add new features (like a Login page) without rewriting the whole app.

---

## 5. What You Just Did

You successfully:
1.  **Set up the Backend**: Installed Python tools and started the server.
2.  **Connected a Database**: Switched from temporary memory to a real SQLite database file so your data is saved.
3.  **Verified It**: Ran a test script to make sure the "Chef" is cooking correctly.
4.  **Launched the Frontend**: Started the visual interface so you can interact with your creation.

**You are now running a full-stack, database-backed application!** 🚀
