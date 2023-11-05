import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: {
      origin: ['https://rpc2.sepolia.org'],
    },
  },
  plugins: [vue()],
})
