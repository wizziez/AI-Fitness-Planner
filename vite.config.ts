import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envPlugin from './vite-env-plugin'

export default defineConfig({
  plugins: [envPlugin(), react()],
  base: process.env.VITE_BASE_PATH || '/',
})
