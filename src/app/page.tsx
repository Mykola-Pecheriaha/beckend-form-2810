import Image from 'next/image'
import Counter from '@/components/Counter'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-8">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50 mb-4">
              Next.js 16 + TypeScript + Turbopack + Tailwind CSS
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              Современный стек для разработки с App Router и CSR компонентами
            </p>
          </div>

          {/* CSR Component Demo */}
          <Counter />

          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
              Технологии проекта:
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <strong>Next.js 16</strong>
                <br />
                App Router
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <strong>TypeScript</strong>
                <br />
                Type Safety
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <strong>Turbopack</strong>
                <br />
                Fast Builds
              </div>
              <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                <strong>Tailwind CSS v4</strong>
                <br />
                Styling
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-5 text-white transition-colors md:w-[200px]"
            href="/consultation"
          >
            📝 Форма консультації
          </a>
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-600 hover:bg-green-700 px-5 text-white transition-colors md:w-[200px]"
            href="/admin"
          >
            👨‍💼 Адміністрування
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  )
}
