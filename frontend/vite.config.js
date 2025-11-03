import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración principal de Vite
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige cualquier request que empiece con /api hacia tu backend en Render
      '/api': {
        target: 'https://neonbyte.onrender.com',
        changeOrigin: true,
        secure: true,
        // Si tu backend usa rutas SIN prefijo /api → dejamos esto:
        rewrite: (path) => path.replace(/^\/api/, '')
        // ⚠️ Si tu backend usa rutas CON prefijo /api (por ejemplo /api/productos),
        // entonces eliminá la línea "rewrite" completamente.
      }
    }
  }
})
