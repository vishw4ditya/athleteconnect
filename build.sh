#!/bin/bash
set -e

echo "📦 Installing root dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "🔨 Building frontend with Vite..."
npx vite build

echo "📦 Copying frontend to backend..."
cd ..
node scripts/build.js

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "✅ Build complete!"
