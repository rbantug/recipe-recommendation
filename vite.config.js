import { defineConfig } from 'vitest/config'
import { config } from 'dotenv'

config({ path: './.env' })

export default defineConfig({
  test: {
    setupFiles: ['./__test__/utils/setup-teardown-hook.js'],
  },
})