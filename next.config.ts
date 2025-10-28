import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Настройки для server components
  serverExternalPackages: ['@prisma/client', 'prisma'],

  // Настройки изображений для оптимизации
  images: {
    remotePatterns: [], // Используем remotePatterns вместо domains (новый API)
  },

  // Настройки TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Настройки для production
  compress: true,
  poweredByHeader: false,

  // Дополнительные настройки
  reactStrictMode: true,

  // Настройки для Webpack (для правильной работы Prisma)
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client')
    }
    return config
  },
}

export default nextConfig
