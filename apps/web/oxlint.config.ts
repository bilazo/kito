import { base, unicorn, depend, reactVite, tanstackRouter, a11y } from '@bilazo/oxc-config/lint'
import { defineConfig } from 'oxlint'

export default defineConfig({
  extends: [base(), unicorn(), depend(), reactVite(), tanstackRouter(), a11y()],
  overrides: [
    // Route files must use default export for components
    {
      files: ['src/routes/**/*.{ts,tsx}'],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
})
