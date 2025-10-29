# Vercel Deployment Guide

## Настройки переменных окружения в Vercel Dashboard

### Пошаговая инструкция:

1. **Откройте ваш проект в Vercel Dashboard**
   - Перейдите на https://vercel.com/dashboard
   - Выберите проект `beckend-form-2810`

2. **Перейдите в настройки проекта**
   - Нажмите на вкладку "Settings"
   - В боковом меню выберите "Environment Variables"

3. **Добавьте переменную DATABASE_URL**

   ```
   Name: DATABASE_URL
   Value: your_database_connection_string
   ```

   📋 **Где взять строку подключения?** См. [DATABASE_SETUP.md](DATABASE_SETUP.md)

4. **Выберите окружения для переменной:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. **Нажмите "Save"**

### Варианты значений DATABASE_URL:

**Для production (рекомендуется PostgreSQL):**

```
DATABASE_URL="postgresql://username:password@host:5432/database"
```

**Для тестирования (SQLite):**

```
DATABASE_URL="file:./dev.db"
```

**Для Prisma Postgres (облачная БД):**

```
DATABASE_URL="prisma://username:password@host/database"
```

## Настройки Build & Development в Vercel Dashboard

### Build Command

Vercel автоматически использует: `yarn build`

### Install Command

Vercel автоматически использует: `yarn install --frozen-lockfile`

### Output Directory

`.next`

### Node.js Version

`18.x` или выше

## Важные моменты

1. ✅ **Используется только Yarn** - npm заблокирован в package.json
2. ✅ **package-lock.json исключен** из развертывания
3. ✅ **Prisma Client генерируется** во время сборки
4. ✅ **API функции настроены** с таймаутом 30 секунд

## Возможные проблемы и решения

### Если появляется ошибка "Status not exported"

- Убедитесь, что DATABASE_URL настроена
- Проверьте, что Prisma Client генерируется правильно

### Если Vercel пытается использовать npm

- Проверьте, что yarn.lock присутствует в репозитории
- Убедитесь, что package-lock.json удален из git

### Если сборка падает с timeout

- Проверьте сложность миграций Prisma
- Рассмотрите использование Prisma Migrate Deploy вместо Dev

## Команды для локальной проверки

```bash
# Проверить сборку как на Vercel
yarn install --frozen-lockfile
yarn build

# Проверить production сервер
yarn start
```
