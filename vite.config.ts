import path from 'path'
import url from 'url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^solarwind$/,
        replacement: path.resolve(dirname, './src/index.ts'),
      },
      {
        find: /^solarwind\/(.*)/,
        replacement: path.resolve(dirname, './src/$1'),
      },
    ],
  },
  build: {
    lib: {
      entry: path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/index.ts',
      ),
      name: 'solarwind',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
