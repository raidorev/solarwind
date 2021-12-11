import path from 'path'
import url from 'url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
  root: path.resolve(dirname),
  optimizeDeps: {
    exclude: ['solarwind'],
  },
  server: {
    host: true,
    fs: {
      allow: ['..'],
    },
  },
  resolve: {
    alias: [
      {
        find: /^solarwind$/,
        replacement: path.resolve(dirname, '../src/index.ts'),
      },
      {
        find: /^solarwind\/(.*)/,
        replacement: path.resolve(dirname, '../src/$1'),
      },
    ],
  },
  plugins: [vue()],
})
