#!/bin/bash

echo "🛑 Stopping SubsiGuard Services..."

# Kill process on port 8000 (Backend)
echo "Stopping Backend (Port 8000)..."
lsof -ti:8000 | xargs kill -9 2>/dev/null

# Kill process on port 3000 (Frontend)
echo "Stopping Frontend (Port 3000)..."
lsof -ti:3000 | xargs kill -9 2>/dev/null

echo "✅ All services stopped."
