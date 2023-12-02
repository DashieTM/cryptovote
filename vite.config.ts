import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: {
      origin: ['https://rpc2.sepolia.org'],
    },
  },
  plugins: [vue(), vuetify()],
})

