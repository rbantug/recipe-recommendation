import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./__test__/utils/setup-teardown-hook.js'],
  },
})