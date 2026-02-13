#!/bin/bash

# SubsiGuard Git Setup Script

echo "Initializing Git Repository for SubsiGuard..."

# 1. Remove nested git repositories to avoid confusion
if [ -d "backend/SubsiGaurd-BE/.git" ]; then
    echo "removing nested backend .git..."
    rm -rf backend/SubsiGaurd-BE/.git
fi

if [ -d "frontend/SubsiGuard-FE/.git" ]; then
    echo "removing nested frontend .git..."
    rm -rf frontend/SubsiGuard-FE/.git
fi

# 2. Initialize Root Git
git init
echo "Initialized empty Git repository in $(pwd)"

# 3. Create Root .gitignore
cat <<EOL > .gitignore
# System
.DS_Store
.vscode/

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/
backend/SubsiGaurd-BE/subsiguard.db

# Node
node_modules/
npm-debug.log
yarn-error.log
.next/
out/
build/
dist/
EOL

echo "Created .gitignore"

# 4. Add all files
git add .

# 5. Initial Commit
git commit -m "Initial commit: Complete SubsiGuard Project"

echo "------------------------------------------------"
echo "✅ Git Repository Initialized!"
echo "------------------------------------------------"
echo "NEXT STEPS:"
echo "1. Go to GitHub.com and create a 'New Repository'."
echo "2. Copy the commands under '…or push an existing repository from the command line'."
echo "3. Run them here. They look like this:"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/SubsiGuard.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo "------------------------------------------------"
