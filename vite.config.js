import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    // Production settings
    minify: 'terser',
    manifest: true,
    sourcemap: false
  },
  // Base URL configuration
  base: '/',
  // Add this if you're getting the specific error
  define: {
    'process.env.NODE_ENV': '"production"',
    __VUE_PROD_DEVTOOLS__: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
