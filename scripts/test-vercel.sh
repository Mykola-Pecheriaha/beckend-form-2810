#!/bin/bash

# Тест развертывания Vercel локально
echo "🧪 Тестирование конфигурации Vercel..."

# Проверяем наличие yarn.lock
if [ ! -f "yarn.lock" ]; then
    echo "❌ yarn.lock не найден!"
    exit 1
fi

# Проверяем отсутствие package-lock.json
if [ -f "package-lock.json" ]; then
    echo "❌ package-lock.json найден! Удалите его для совместимости с Yarn"
    exit 1
fi

echo "✅ Файлы блокировки корректны"

# Проверяем переменную окружения
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL не установлена. Используем значение по умолчанию"
    export DATABASE_URL="file:./dev.db"
fi

echo "📦 Установка зависимостей..."
yarn install --frozen-lockfile

echo "🏗️  Сборка проекта..."
yarn build

echo "🚀 Запуск production сервера на порту 3000..."
echo "Откройте http://localhost:3000 для тестирования"
yarn start