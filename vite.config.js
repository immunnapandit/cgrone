import { fileURLToPath, URL } from 'node:url'
import { existsSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/* In production the files under /api are Vercel serverless functions. The Vite
 * dev server only serves static assets, so without this they 404 locally and
 * the forms cannot be exercised with `npm run dev`.
 *
 * This mounts the same handler modules on the dev server and gives them the
 * `res.status().json()` helpers Vercel's runtime adds, so one implementation
 * covers both. Dev only — `apply: 'serve'`.
 */
function localApi() {
  return {
    name: 'local-api-routes',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next()

        const route = req.url.split('?')[0].slice('/api/'.length).replace(/\/+$/, '')
        // Keep the lookup inside /api: a route like "../vite.config" must not resolve.
        if (!/^[a-z0-9-]+$/i.test(route)) return next()

        const path = fileURLToPath(new URL(`./api/${route}.js`, import.meta.url))
        if (!existsSync(path)) return next()

        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (payload) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(payload))
          return res
        }

        try {
          // ssrLoadModule picks up handler edits without a dev-server restart.
          const mod = await server.ssrLoadModule(path)
          await mod.default(req, res)
        } catch (err) {
          server.config.logger.error(`[api/${route}] ${err.stack || err.message}`)
          if (!res.writableEnded) res.status(500).json({ error: 'Internal error.' })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /* The API handlers read process.env directly, the way they will on Vercel.
     Vite only exposes VITE_-prefixed vars to the client bundle, so loading
     with an empty prefix here keeps the Graph credentials server-side. */
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), localApi()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
