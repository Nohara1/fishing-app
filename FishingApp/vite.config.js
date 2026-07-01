import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/fishing-app/',
  plugins: [vue(), vueDevTools(),createSvgIconsPlugin({iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],symbolId: 'icon-[dir]-[name]',}),],
  server: {
    hmr: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
