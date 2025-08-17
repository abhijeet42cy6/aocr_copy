import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0', // Allow external connections
    open: false // Disable auto-open to avoid xdg-open errors
  },
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}) 