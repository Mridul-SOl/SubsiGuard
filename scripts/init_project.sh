#!/bin/bash

# --- SubsiGuard Project Initializer ---
# This script sets up the entire environment (Backend & Frontend) from scratch.

echo "🛡️  Initializing SubsiGuard Project..."

# Function to check if a command exists
check_cmd() {
    command -v "$1" >/dev/null 2>&1 || { echo >&2 "❌ Error: $1 is not installed. Please install it and try again."; exit 1; }
}

# 1. Check Prerequisites
echo "🔍 Checking prerequisites..."
check_cmd python3
check_cmd node
check_cmd npm

# 2. Setup Backend
echo "🍳 Setting up Backend (Python)..."
cd backend || exit
if [ -d ".venv" ]; then
    echo "♻️  Virtual environment already exists. Skipping creation..."
else
    echo "📦 Creating virtual environment..."
    python3 -m venv .venv
fi

echo "📥 Installing backend dependencies..."
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Ensure greenlet is explicitly installed (safety check)
pip install greenlet

cd ..

# 3. Setup Frontend
echo "💻 Setting up Frontend (Next.js)..."
cd frontend || exit
echo "📥 Installing frontend dependencies (this may take a minute)..."
npm install
cd ..

echo ""
echo "✅ Setup Complete! All systems are ready."
echo "------------------------------------------------"
echo "🚀 To start the app, run: ./start.sh"
echo "🛑 To stop the app, run:  ./stop.sh"
echo "------------------------------------------------"
echo "🌐 Frontend: http://localhost:3000"
echo "🛠️ Backend:  http://localhost:8000/docs"
