import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  base: './',
  define: {
    "window.jQuery": {},
    "window.$": {},
  },
})
