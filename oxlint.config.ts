import { base, unicorn, node } from '@bilazo/oxc-config/lint'
import { defineConfig } from 'oxlint'

export default defineConfig({
  ignorePatterns: ['pnpm-lock.yaml'],
  extends: [base(), unicorn(), node()],
})
