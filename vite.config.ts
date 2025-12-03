import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Force server restart
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})
