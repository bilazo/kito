import fs from 'node:fs'
import path from 'node:path'

import { defineConfig } from 'tsdown'

const COMPONENTS_DIR = 'src/components'

const entries = Object.fromEntries(
  fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(COMPONENTS_DIR, name, `${name}.tsx`)))
    .map((name) => [`components/${name}`, path.join(COMPONENTS_DIR, name, `${name}.tsx`)]),
)

export default defineConfig({
  entry: entries,
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  deps: {
    neverBundle: ['react', 'react-dom', '@base-ui/react'],
  },
})
