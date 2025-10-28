#!/bin/bash

# Тестовый скрипт для проверки API

echo "🧪 Тестирование API консультаций..."

# Тест 1: Минимальные данные
echo "1. Тест с минимальными данными:"
response1=$(curl -s -X POST http://localhost:3000/api/consultations \
  -H "Content-Type: application/json" \
  -d '{"name": "Тест", "age": "30", "complaint": "Головний біль"}')

echo "Ответ: $response1"
echo ""

# Тест 2: Полные данные
echo "2. Тест с полными данными:"
response2=$(curl -s -X POST http://localhost:3000/api/consultations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Іван Петренко",
    "age": "35", 
    "gender": "Чоловік",
    "phone": "+380501234567",
    "height": 180,
    "weight": 75,
    "bmi": 23.1,
    "complaint": "Болить голова",
    "examinations": "[\"Огляд\"]",
    "painLevel": 5
  }')

echo "Ответ: $response2"
echo ""

# Тест 3: Получение всех консультаций
echo "3. Получение всех консультаций:"
response3=$(curl -s http://localhost:3000/api/consultations)
echo "Ответ: ${response3:0:200}..."

echo ""
echo "✅ Тестирование завершено"