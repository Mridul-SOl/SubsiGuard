# 📖 SubsiGuard: Commands Cheat Sheet

This file contains all the commands you need to run, manage, and debug the SubsiGuard project.

---

## ⚡ One-Click Startup & Setup
The easiest way to manage the app from the **root folder**.

| Command | Meaning |
| :--- | :--- |
| `./init_project.sh`| **(Run this first!)** Sets up the entire environment (Backend & Frontend). |
| `./start.sh` | Starts both Backend and Frontend in separate terminal windows. |
| `./stop.sh` | Safely stops everything running on port 8000 and 3000. |

---

## 👨‍🍳 Backend Commands (Python/FastAPI)
Run these inside the `backend/` folder.

| Command | Meaning |
| :--- | :--- |
| `source .venv/bin/activate` | Enters the "Virtual Environment" (turns on the Python tools). |
| `uvicorn main:app --reload` | Starts the backend server. It "reloads" every time you save a file. |
| `pip install -r requirements.txt`| Installs all the Python libraries (like Pandas and FastAPI) needed. |
| `pip install <package_name>` | Installs a new library (e.g., `pip install greenlet`). |

---

## 💻 Frontend Commands (Next.js/React)
Run these inside the `frontend/` folder.

| Command | Meaning |
| :--- | :--- |
| `npm run dev` | Starts the website server so you can see it in your browser. |
| `npm install` | Installs all the Javascript tools needed for the website. |
| `npm start` | Runs the "Production" version of the site (after building). |

---

## 🗄️ Database Commands (SQLite)
Run these if you want to look at the data manually.

| Command | Meaning |
| :--- | :--- |
| `sqlite3 subsiguard.db` | Opens the database file for manual searching. |
| `.tables` | Shows all the tables (like `uploadedfile`) inside SQLite. |
| `SELECT * FROM uploadedfile;` | Shows all the files you have uploaded. |

---

## 🛠️ Helpful Shortcuts
*   **Stop a command**: `Ctrl + C` (Hold Control and press C).
*   **Go back one folder**: `cd ..`
*   **Clear the screen**: `clear`
