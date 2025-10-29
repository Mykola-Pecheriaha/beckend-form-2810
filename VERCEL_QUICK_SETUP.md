# 🚀 Быстрая настройка Vercel

## 1. Переменные окружения

В Vercel Dashboard → Settings → Environment Variables добавьте:

```
DATABASE_URL = "ваша_строка_подключения_к_БД"
```

**Важно:** Отметьте все три окружения: Production, Preview, Development

## 2. Примеры DATABASE_URL

### PostgreSQL (рекомендуется для production):
```
postgresql://username:password@host:5432/database_name
```

### SQLite (для тестирования):
```
file:./dev.db
```

### Prisma Postgres:
```
prisma://username:password@host/database
```

## 3. Проверка развертывания

После добавления переменной:
1. Vercel автоматически пересоберет проект
2. Проверьте логи сборки на наличие ошибок
3. Откройте развернутое приложение

## 4. Что делать если что-то не работает

1. **Проверьте логи сборки** в Vercel Dashboard → Deployments
2. **Убедитесь что DATABASE_URL правильная** - можете протестировать локально
3. **Проверьте доступность базы данных** из интернета

## ⚠️ Важно

- НЕ добавляйте DATABASE_URL в код или .env файлы в git
- Используйте переменные окружения Vercel для безопасности
- Для production обязательно используйте PostgreSQL, а не SQLite