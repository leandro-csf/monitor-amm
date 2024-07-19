import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5175, // ou qualquer porta que você preferir
  },
  build: {
    outDir: 'dist',
  },
  publicDir: 'public', // A pasta onde estão seus arquivos estáticos
  
})
