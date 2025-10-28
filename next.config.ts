import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Настройки для server components
  serverExternalPackages: [],

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
}

export default nextConfig
