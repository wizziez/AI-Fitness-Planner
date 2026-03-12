import type { Plugin } from 'vite'

export default function envPlugin(): Plugin {
  return {
    name: 'env-plugin',
    config(config, env) {
      const define: Record<string, string> = {}

      // Inject all VITE_ prefixed env vars from process.env (available in CI/CD)
      for (const [key, value] of Object.entries(process.env)) {
        if (key.startsWith('VITE_')) {
          define[`import.meta.env.${key}`] = JSON.stringify(value || '')
        }
      }

      return {
        define,
      }
    },
  }
}
