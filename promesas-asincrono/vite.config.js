import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // 💡 Esto hace que las rutas sean relativas
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true, // 💡 Limpia la carpeta dist antes de cada build
  }
})
