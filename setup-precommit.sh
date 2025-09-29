#!/bin/bash

echo "🚀 Setting up pre-commit hooks for DrinkMaker..."

# Check if pre-commit is installed
if ! command -v pre-commit &> /dev/null; then
    echo "📦 Installing pre-commit..."
    pip install pre-commit
fi

# Install pre-commit hooks
echo "🔗 Installing pre-commit hooks..."
pre-commit install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && bun install && cd ..

# Run pre-commit on all files to test
echo "🧪 Running pre-commit on all files..."
pre-commit run --all-files

echo "✅ Pre-commit setup complete!"
echo ""
echo "📋 Available commands:"
echo "  - Run all hooks: pre-commit run --all-files"
echo "  - Frontend lint: cd frontend && npm run lint"
echo "  - Backend lint: cd backend && bun run lint"
echo "  - Frontend format: cd frontend && npx prettier --write ."
echo "  - Backend format: cd backend && bun run format"