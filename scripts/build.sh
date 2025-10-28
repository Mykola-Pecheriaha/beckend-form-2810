#!/bin/bash

# Vercel build script
echo "🔧 Starting Vercel build process..."

# Проверяем наличие файла схемы Prisma
if [ ! -f "./prisma/schema.prisma" ]; then
    echo "❌ Prisma schema not found!"
    exit 1
fi

echo "📦 Installing dependencies..."
yarn install --frozen-lockfile

echo "🗄️ Generating Prisma client..."
npx prisma generate --schema=./prisma/schema.prisma

echo "🚀 Building Next.js application..."
npx next build

echo "✅ Build completed successfully!"