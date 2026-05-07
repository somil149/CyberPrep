#!/bin/bash
set -e

echo "🚀 CyberPrep Nexus — Setup"
echo "================================"

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Install from https://nodejs.org (v18+)"
  exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Node.js v18+ required. Current: $(node -v)"
  exit 1
fi

echo "✅ Node.js $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Available commands:"
echo "  npm run dev      — Start development server"
echo "  npm run build    — Build for production"
echo "  npm run preview  — Preview production build"
echo "  bash scripts/deploy.sh — Deploy to GitHub Pages"
