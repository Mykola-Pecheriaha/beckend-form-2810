# Vercel Deployment Guide

## Настройки переменных окружения в Vercel

1. **Обязательная переменная:**
   ```
   DATABASE_URL = "your_database_connection_string"
   ```

2. **Для production рекомендуется PostgreSQL:**
   ```
   DATABASE_URL = "postgresql://username:password@host:5432/database"
   ```

3. **Для тестирования можно использовать SQLite:**
   ```
   DATABASE_URL = "file:./dev.db"
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