import build from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { script } from './vite-plugin-script'

export default defineConfig({
  plugins: [
    script(),
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
})
