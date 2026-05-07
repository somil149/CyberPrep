#!/bin/bash
set -e

echo "🚀 CyberPrep Nexus — Deploy to GitHub Pages"
echo "============================================="

# Build
echo "📦 Building..."
npm run build

# Deploy using gh-pages branch
echo "🌐 Deploying to GitHub Pages..."
cd dist

# Initialize git in dist
git init
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to gh-pages branch
git push -f git@github.com:somil149/CyberPrep.git main:gh-pages

cd ..

echo ""
echo "✅ Deployed! Live at: https://somil149.github.io/CyberPrep/"
