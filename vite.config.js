import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        theme_color: '#282524',
        background_color: '#282524',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        name: 'Noty',
        short_name: 'Noty',
        icons: [
          {
            src: '/icon-192x192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable',
          },
          {
            src: 'pwa_icon_1024px_mac.png',
            type: 'image/png',
            sizes: '1024x1024',
            purpose: 'any',
          },
        ],
      },
    }),
    eslintPlugin(),
  ],
})
