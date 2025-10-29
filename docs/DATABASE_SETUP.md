# 🗄️ Настройка базы данных для проекта

## Рекомендуемые провайдеры (бесплатно)

### 1. 🔥 Vercel Postgres (лучший выбор)

**Преимущества:** Интеграция с Vercel, автонастройка переменных окружения

**Как настроить:**
1. В Vercel Dashboard вашего проекта
2. Storage → Create Database → Postgres
3. Название: `beckend-form-database` 
4. Переменная DATABASE_URL добавится автоматически!

**Готовая строка подключения:**
```
POSTGRES_URL="postgresql://default:abc123@ep-example.us-east-1.postgres.vercel-storage.com/verceldb"
```

---

### 2. 🚀 Supabase (популярный выбор)

**Преимущества:** Бесплатно 500MB, готовая админка, API

**Как настроить:**
1. Перейдите на https://supabase.com
2. "New project" → Выберите организацию
3. Название проекта: `beckend-form-2810`
4. Регион: выберите ближайший (Europe West для Украины)
5. Пароль: придумайте сложный пароль
6. Settings → Database → Connection string

**Строка подключения:**
```
DATABASE_URL="postgresql://postgres:ВАШ_ПАРОЛЬ@db.abc123.supabase.co:5432/postgres"
```

---

### 3. 🚂 Railway

**Преимущества:** Простая настройка, $5 бесплатно в месяц

**Как настроить:**
1. https://railway.app → "Start a New Project"
2. "Deploy PostgreSQL" 
3. В проекте: Variables → DATABASE_URL (скопируйте значение)

**Строка подключения:**
```
DATABASE_URL="postgresql://postgres:abc123@containers-us-west-1.railway.app:5432/railway"
```

---

### 4. ⚡ Neon

**Преимущества:** Serverless PostgreSQL, быстрый холодный старт

**Как настроить:**
1. https://neon.tech → "Sign Up"
2. "Create your first project"
3. Название: `beckend-form-2810`
4. Dashboard → Connection Details → Connection string

**Строка подключения:**
```
DATABASE_URL="postgresql://username:password@ep-example.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

---

## 🔧 Настройка в Vercel

После получения DATABASE_URL:

1. **Vercel Dashboard** → Ваш проект → Settings → Environment Variables
2. **Add New:**
   - Name: `DATABASE_URL`
   - Value: ваша строка подключения
   - Environments: ✅ Production ✅ Preview ✅ Development
3. **Save**

## 🧪 Проверка подключения

Локально протестируйте подключение:

```bash
# Установите переменную окружения
export DATABASE_URL="ваша_строка_подключения"

# Проверьте подключение к БД
yarn prisma db push

# Заполните тестовыми данными
yarn db:seed
```

## ⚠️ Важные моменты

1. **Безопасность:** Никогда не добавляйте DATABASE_URL в код
2. **SSL:** Для production БД всегда используйте SSL (`?sslmode=require`)
3. **Backup:** Настройте бэкапы в выбранном провайдере
4. **Мониторинг:** Следите за использованием квот бесплатных планов

## 🆘 Если что-то не работает

1. **Проверьте доступность БД:** можете ли подключиться из вашего IP
2. **Проверьте синтаксис:** строка должна начинаться с `postgresql://`
3. **Проверьте кодировку:** пароль может содержать специальные символы
4. **Логи Vercel:** смотрите ошибки в Functions logs