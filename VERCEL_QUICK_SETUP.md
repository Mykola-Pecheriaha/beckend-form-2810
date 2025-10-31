# 🚀 Быстрая настройка Vercel

## 1. Переменные окружения

В Vercel Dashboard → Settings → Environment Variables добавьте:

```
DATABASE_URL = "ваша_строка_подключения_к_БД"
```

**Важно:** Отметьте все три окружения: Production, Preview, Development

## 2. Где взять DATABASE_URL

### 🐘 PostgreSQL

#### Vercel Postgres (рекомендуется):

1. В Vercel Dashboard → Storage → Create Database → Postgres
2. Скопируйте POSTGRES_URL из созданной БД

#### Supabase (бесплатно):

1. https://supabase.com → New Project
2. Settings → Database → Connection string

```
postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

#### Railway (бесплатно):

1. https://railway.app → New Project → PostgreSQL
2. Variables → DATABASE_URL

```
postgresql://postgres:[PASSWORD]@[HOST]:5432/railway
```

#### Neon (бесплатно):

1. https://neon.tech → Create Project
2. Dashboard → Connection string

```
postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]?sslmode=require
```

### 🗄️ SQLite (только для разработки)

```
file:./dev.db
```

### ☁️ Prisma Postgres

1. https://console.prisma.io → Create workspace
2. Create database → Copy connection string

```
prisma://[API_KEY]@[HOST]/[DATABASE]
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
