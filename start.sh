#!/bin/bash

# Get the absolute path of the project root
PROJECT_ROOT=$(pwd)

echo "🚀 Starting SubsiGuard Services..."

# 1. Start Backend in a new terminal window
echo "📦 Starting Backend (FastAPI)..."
osascript -e "tell application \"Terminal\" to do script \"cd '$PROJECT_ROOT/backend' && source .venv/bin/activate && uvicorn main:app --reload\""

# 2. Start Frontend in a new terminal window
echo "💻 Starting Frontend (Next.js)..."
osascript -e "tell application \"Terminal\" to do script \"cd '$PROJECT_ROOT/frontend' && npm run dev\""

echo "✅ Both services are starting in separate terminal windows!"
echo "🌐 Frontend: http://localhost:3000"
echo "🛠️ Backend: http://localhost:8000/docs"
