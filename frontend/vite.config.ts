import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',  // Temel yolunuzu buraya tanımlayın (örneğin '/subdir/' gibi)
  plugins: [react()],
  build: {
    assetsDir: 'assets',  // Tüm varlık dosyalarının bu dizine yerleştirileceğinden emin olun
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]', // Dosya adlarının düzgün olması için hashing ve dizin belirleme
      },
    },
  },
})