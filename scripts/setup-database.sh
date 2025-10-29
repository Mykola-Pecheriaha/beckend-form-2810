#!/bin/bash

# Быстрая настройка новой базы данных
echo "🗄️ Настройка базы данных для проекта..."

# Проверяем наличие DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Переменная DATABASE_URL не установлена!"
    echo ""
    echo "Установите её одним из способов:"
    echo "export DATABASE_URL=\"ваша_строка_подключения\""
    echo "или добавьте в файл .env.local"
    echo ""
    echo "📖 Где взять DATABASE_URL: docs/DATABASE_SETUP.md"
    exit 1
fi

echo "✅ DATABASE_URL найдена"
echo "🔗 Подключение: ${DATABASE_URL:0:20}..."

echo ""
echo "📋 Применяем схему базы данных..."
yarn prisma db push

if [ $? -eq 0 ]; then
    echo "✅ Схема применена успешно!"
    
    echo ""
    echo "🌱 Заполняем тестовыми данными..."
    yarn db:seed
    
    if [ $? -eq 0 ]; then
        echo "✅ Тестовые данные добавлены!"
        echo ""
        echo "🎉 База данных готова к использованию!"
        echo "🖥️  Откройте Prisma Studio: yarn db:studio"
    else
        echo "⚠️  Не удалось добавить тестовые данные, но база работает"
    fi
else
    echo "❌ Ошибка при применении схемы базы данных"
    echo "🔍 Проверьте правильность DATABASE_URL"
fi