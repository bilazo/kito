import { format, tailwindFormat } from '@bilazo/oxc-config/format'
import { defineConfig } from 'oxfmt'

export default defineConfig({
  ...format(),
  ...tailwindFormat({ stylesheet: 'src/styles/defaults.css' }),
})
