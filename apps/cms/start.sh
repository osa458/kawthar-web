#!/bin/sh

echo "🚀 Starting Kawthar CMS..."

# Wait a moment for the database to be ready
sleep 5

echo "📝 Initializing database..."
npm run init

echo "🌐 Starting Next.js server..."
npm start
