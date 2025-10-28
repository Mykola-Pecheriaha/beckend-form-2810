# Backend Form 2810 - Modern Next.js Project

Современный Next.js проект с полным стеком технологий для разработки веб-приложений.

## 🚀 Технологии

- **Next.js 16.0.0** - React фреймворк с App Router
- **TypeScript** - Типизированный JavaScript
- **Turbopack** - Быстрый бандлер от команды Next.js
- **Tailwind CSS v4** - Utility-first CSS фреймворк
- **Prisma** - Modern Database ORM для TypeScript
- **SQLite** - База данных для локальной разработки
- **CSR (Client-Side Rendering)** - Клиентская отрисовка компонентов
- **Yarn** - Менеджер пакетов
- **Prettier** - Форматирование кода
- **ESLint** - Линтинг с поддержкой Next.js, React и TypeScript

## 📁 Структура проекта

```
backend-form-2810/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── api/               # API Routes
│   │   │   └── consultations/ # API для работы с консультациями
│   │   ├── admin/             # Страница администратора
│   │   ├── consultation/      # Страница формы консультации
│   │   ├── globals.css        # Глобальные стили с Tailwind
│   │   ├── layout.tsx         # Корневой layout
│   │   └── page.tsx           # Главная страница
│   ├── components/            # React компоненты
│   │   ├── Counter.tsx        # Пример CSR компонента
│   │   └── ConsultationForm.tsx # Форма консультации
│   └── lib/                   # Утилиты и конфигурации
│       └── prisma.ts          # Настройка Prisma клиента
├── prisma/                    # Prisma схема и миграции
│   ├── migrations/            # Миграции базы данных
│   ├── schema.prisma          # Схема базы данных
│   └── seed.ts               # Тестовые данные
├── public/                    # Статические файлы
├── .vscode/                   # Настройки VS Code
├── next.config.ts            # Конфигурация Next.js
├── tailwind.config.ts        # Конфигурация Tailwind CSS
├── tsconfig.json             # Конфигурация TypeScript
├── eslint.config.mjs         # Конфигурация ESLint
└── .prettierrc              # Конфигурация Prettier
```

## 🛠️ Доступные команды

```bash
# Разработка с Turbopack
yarn dev

# Сборка проекта
yarn build

# Запуск production сервера
yarn start

# Линтинг
yarn lint
yarn lint:fix

# Форматирование кода
yarn format
yarn format:check

# Проверка типов TypeScript
yarn type-check

# Prisma команды
yarn db:migrate         # Создать и применить миграцию
yarn db:generate        # Генерировать Prisma клиент
yarn db:push            # Отправить схему в БД без миграции
yarn db:studio          # Открыть Prisma Studio
yarn db:seed            # Заполнить БД тестовыми данными
```

## 🚀 Быстрый старт

1. **Установите зависимости:**

   ```bash
   yarn install
   ```

2. **Запустите проект в режиме разработки:**

   ```bash
   yarn dev
   ```

3. **Настройте базу данных:**

   ```bash
   yarn db:migrate
   yarn db:seed
   ```

4. **Откройте браузер:**
   Перейдите по адресу [http://localhost:3000](http://localhost:3000)

## 🔧 Настройки разработки

### VS Code расширения

Рекомендуемые расширения автоматически предложены в `.vscode/extensions.json`:

- Tailwind CSS IntelliSense
- Prettier - Code formatter
- TypeScript Next.js Plugin
- Auto Rename Tag
- Path Intellisense
- Error Lens

### Настройки форматирования

- **Prettier** настроен на автоформатирование при сохранении
- **ESLint** исправляет ошибки автоматически
- **TypeScript** строгий режим включен

## 🎨 Tailwind CSS

Проект использует Tailwind CSS v4 с настроенными темами для светлого и темного режимов.

Основные CSS переменные:

- `--background` - цвет фона
- `--foreground` - цвет текста

## 🔥 Turbopack

Для ускорения разработки используется Turbopack - быстрый бандлер от команды Next.js. Запускается автоматически с флагом `--turbo`.

## 📱 CSR Компоненты

Пример клиентского компонента находится в `src/components/Counter.tsx`. Используйте директиву `'use client'` для создания интерактивных компонентов.

## 🗄️ База данных и API

### Модель данных

Проект включает модель `Consultation` со следующими полями:

- `id` - уникальный идентификатор
- `name` - имя клиента (обязательное)
- `age` - возраст (обязательное)
- `complaint` - жалоба/вопрос (обязательное)
- `phone` - телефон (опциональное)
- `email` - email (опциональное)
- `status` - статус консультации (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)
- `createdAt` - дата создания
- `updatedAt` - дата обновления

### API Endpoints

- `GET /api/consultations` - получить все консультации
- `POST /api/consultations` - создать новую консультацию
- `GET /api/consultations/[id]` - получить консультацию по ID
- `PATCH /api/consultations/[id]` - обновить статус консультации
- `DELETE /api/consultations/[id]` - удалить консультацию

### Страницы приложения

- `/` - главная страница с демонстрацией технологий
- `/consultation` - форма для подачи заявки на консультацию
- `/admin` - панель администратора для управления заявками

## 🚀 Деплой

### Vercel (рекомендуется)

Самый простой способ развернуть проект - использовать [Vercel Platform](https://vercel.com/new).

### Другие платформы

Проект можно развернуть на любой платформе, поддерживающей Node.js.

## 📝 Разработка

### Добавление новых страниц

Создайте новую папку в `src/app/` с файлом `page.tsx`.

### Добавление компонентов

Создайте новые компоненты в `src/components/`.

### Стилизация

Используйте Tailwind CSS классы для стилизации компонентов.

## 🤝 Вклад в проект

1. Форк проекта
2. Создайте ветку для новой функции
3. Внесите изменения
4. Отправьте Pull Request

## 📄 Лицензия

Этот проект создан для образовательных целей.
