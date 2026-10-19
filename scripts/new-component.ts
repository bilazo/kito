import fs from 'node:fs'
import path from 'node:path'

const here = import.meta.dirname
const ROOT = path.resolve(here, '..')

const name = process.argv[2]
if (!name || !/^[a-z][a-z0-9-]*$/u.test(name)) {
  console.error('Usage: pnpm new:component <kebab-case-name>')
  process.exit(1)
}

/* -------------------------------------------------------------------------- */
/* Guard                                                                      */
/* -------------------------------------------------------------------------- */

const compDir = path.join(ROOT, 'packages/ui/src/components', name)
if (fs.existsSync(compDir)) {
  console.error(`✗ Component "${name}" already exists at ${compDir}`)
  process.exit(1)
}

/* -------------------------------------------------------------------------- */
/* 1. Component + test                                                        */
/* -------------------------------------------------------------------------- */

fs.mkdirSync(compDir, { recursive: true })
fs.writeFileSync(path.join(compDir, `${name}.tsx`), '')
fs.writeFileSync(path.join(compDir, `${name}.test.tsx`), '')

/* -------------------------------------------------------------------------- */
/* 2. Content folder                                                          */
/* -------------------------------------------------------------------------- */

const contentDir = path.join(ROOT, 'apps/web/src/content', name)
fs.mkdirSync(path.join(contentDir, 'examples'), { recursive: true })
fs.writeFileSync(path.join(contentDir, 'index.mdx'), '')
fs.writeFileSync(path.join(contentDir, 'examples', 'basic.tsx'), '')
fs.writeFileSync(path.join(contentDir, 'examples', 'rtl.tsx'), '')
fs.writeFileSync(
  path.join(contentDir, 'meta.ts'),
  `import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  summary: '',
  whenToUse: [],
  whenNotToUse: [],
  props: [],
  composition: [],
}
`,
)

console.log(`✓ Created component: ${name}`)
