// oxlint-disable unicorn/prefer-single-call unicorn/no-immediate-mutation
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

/* -------------------------------------------------------------------------- */
/* Paths                                                                      */
/* -------------------------------------------------------------------------- */

const ROOT = path.resolve(import.meta.dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'apps/web/src/content')
const AI_DIR = path.join(ROOT, '.ai')
const AI_COMPONENTS_DIR = path.join(AI_DIR, 'components')
const PUBLIC_DIR = path.join(ROOT, 'apps/web/public')

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface PropMeta {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

interface CodeExample {
  title: string
  description?: string
  code: string
}

interface ComponentMeta {
  exports?: string[]
  summary: string
  whenToUse: string[]
  whenNotToUse: string[]
  props: PropMeta[]
  propsNote?: string
  composition: CodeExample[]
}

interface Frontmatter {
  title: string
  description?: string
  category?: string
  order?: number
}

interface LoadedComponent {
  name: string
  meta: ComponentMeta
  frontmatter: Frontmatter
  exportsList: string[]
  importLine: string
}

/* -------------------------------------------------------------------------- */
/* Frontmatter parsing                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Parse the YAML frontmatter block at the top of an MDX file.
 *
 * Handles flat keys (`title: Button`) and one level of nesting
 * (`links:\n  doc: …`). Anything more complex than what we write in our
 * `.mdx` files is ignored — this is not a general YAML parser.
 */
function parseFrontmatter(source: string): Record<string, unknown> {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/u)
  if (!match) return {}

  const lines = match[1].split(/\r?\n/u)
  const result: Record<string, unknown> = {}
  let currentNested: Record<string, string> | null = null

  for (const line of lines) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue

    // Two-space indent → member of the previously opened nested block.
    const nestedMatch = line.match(/^\s{2,}(\w+):\s*(.*)$/u)
    if (nestedMatch && currentNested) {
      currentNested[nestedMatch[1]] = stripQuotes(nestedMatch[2])
      continue
    }

    // Top-level key.
    const topMatch = line.match(/^(\w+):\s*(.*)$/u)
    if (topMatch) {
      const [, key, value] = topMatch
      if (value === '') {
        currentNested = {}
        result[key] = currentNested
      } else {
        currentNested = null
        result[key] = stripQuotes(value)
      }
    }
  }

  return result
}

function stripQuotes(value: string): string {
  const match = value.match(/^["'](.*)["']$/u)
  return match ? match[1] : value
}

/* -------------------------------------------------------------------------- */
/* Loading                                                                    */
/* -------------------------------------------------------------------------- */

function toPascalCase(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

async function loadComponent(name: string): Promise<LoadedComponent | null> {
  const metaPath = path.join(CONTENT_DIR, name, 'meta.ts')
  const mdxPath = path.join(CONTENT_DIR, name, 'index.mdx')

  if (!fs.existsSync(metaPath) || !fs.existsSync(mdxPath)) {
    console.warn(`⚠ ${name}: missing meta.ts or index.mdx — skipping`)
    return null
  }

  let mod: { meta?: ComponentMeta }
  try {
    mod = await import(pathToFileURL(metaPath).href)
  } catch (error) {
    console.error(`✗ ${name}: failed to import meta.ts`, error)
    return null
  }

  if (!mod.meta || typeof mod.meta !== 'object') {
    console.error(`✗ ${name}: meta.ts does not export a \`meta\` object`)
    return null
  }

  const frontmatter = parseFrontmatter(fs.readFileSync(mdxPath, 'utf8')) as unknown as Frontmatter

  if (!frontmatter.title) {
    console.error(`✗ ${name}: index.mdx is missing a \`title\` in frontmatter`)
    return null
  }

  const exportsList = mod.meta.exports ?? [toPascalCase(name)]
  const importLine = `import { ${exportsList.join(', ')} } from '@bilazo/kito/components/${name}'`

  return {
    name,
    meta: mod.meta,
    frontmatter,
    exportsList,
    importLine,
  }
}

/* -------------------------------------------------------------------------- */
/* Rendering                                                                  */
/* -------------------------------------------------------------------------- */

function renderComponentDoc(
  component: LoadedComponent,
  allByName: Map<string, LoadedComponent>,
): string {
  const { name, meta, frontmatter, importLine } = component

  const sections: string[] = []

  // ── Header ────────────────────────────────────────────────────────
  sections.push(`# ${frontmatter.title}`)

  if (frontmatter.description) {
    sections.push(`> ${frontmatter.description}`)
  }

  sections.push(meta.summary)

  // ── Import ────────────────────────────────────────────────────────
  sections.push(['## Import', '```tsx', importLine, '```'].join('\n\n'))

  // ── When to use ───────────────────────────────────────────────────
  if (meta.whenToUse.length > 0) {
    sections.push(['## When to use', ...meta.whenToUse.map((item) => `- ${item}`)].join('\n\n'))
  }

  // ── When NOT to use ───────────────────────────────────────────────
  if (meta.whenNotToUse.length > 0) {
    sections.push(
      ['## When NOT to use', ...meta.whenNotToUse.map((item) => `- ${item}`)].join('\n\n'),
    )
  }

  // ── Props ─────────────────────────────────────────────────────────
  if (meta.props.length > 0) {
    const rows = meta.props.map((p) => {
      const prop = p.required ? `\`${p.name}\`*` : `\`${p.name}\``
      const type = `\`${p.type.replaceAll('|', '\\|')}\``
      const def = p.default ? `\`${p.default}\`` : '—'
      return `| ${prop} | ${type} | ${def} | ${p.description} |`
    })

    const table = [
      '| Prop | Type | Default | Description |',
      '| --- | --- | --- | --- |',
      ...rows,
    ].join('\n')

    const block = ['## Props', table]
    if (meta.propsNote) block.push(meta.propsNote)
    sections.push(block.join('\n\n'))
  } else if (meta.propsNote) {
    sections.push(['## Props', meta.propsNote].join('\n\n'))
  }

  // ── Composition ───────────────────────────────────────────────────
  if (meta.composition.length > 0) {
    const blocks = meta.composition.map((example) => {
      const parts = [`### ${example.title}`]
      if (example.description) parts.push(example.description)
      parts.push(['```tsx', example.code, '```'].join('\n'))
      return parts.join('\n\n')
    })
    sections.push(['## Composition', ...blocks].join('\n\n'))
  }

  // ── Footer ────────────────────────────────────────────────────────
  sections.push(
    `---\n\n_Generated from \`apps/web/src/content/${name}/meta.ts\`. Do not edit directly._`,
  )

  return sections.join('\n\n') + '\n'
}

function renderFullDoc(components: LoadedComponent[]): string {
  const header = [
    '# Kito UI — Full Documentation',
    '',
    '> A React design system built on Base UI and Tailwind CSS v4. Framework-agnostic.',
    '',
    '## Setup',
    '',
    '```bash',
    'pnpm add @bilazo/kito',
    '```',
    '',
    'Import the stylesheet once near the app root:',
    '',
    '```tsx',
    "import '@bilazo/kito/styles.css'",
    '```',
    '',
    'All components are imported from subpaths:',
    '',
    '```tsx',
    "import { Button } from '@bilazo/kito/components/button'",
    "import { Input } from '@bilazo/kito/components/input'",
    '```',
    '',
    '---',
    '',
    'This file contains the complete documentation for every component. Each',
    'component has its own section below.',
  ].join('\n')

  const body = components
    .map((c) => renderComponentDoc(c, new Map(components.map((x) => [x.name, x]))))
    .join('\n\n---\n\n')

  return header + '\n\n---\n\n' + body
}

function renderPublicIndex(components: LoadedComponent[]): string {
  const byCategory = new Map<string, LoadedComponent[]>()
  for (const c of components) {
    const cat = c.frontmatter.category ?? 'Other'
    if (!byCategory.has(cat)) byCategory.set(cat, [])
    byCategory.get(cat)!.push(c)
  }

  for (const list of byCategory.values()) {
    list.sort((a, b) => {
      const ao = a.frontmatter.order ?? 999
      const bo = b.frontmatter.order ?? 999
      if (ao !== bo) return ao - bo
      return a.frontmatter.title.localeCompare(b.frontmatter.title)
    })
  }

  const lines: string[] = [
    '# Kito UI',
    '',
    '> A React design system built on Base UI and Tailwind CSS v4. Framework-agnostic.',
    '',
    'Complete documentation is also available as a single file at',
    '[llms-full.txt](./llms-full.txt).',
  ]

  for (const [category, items] of byCategory) {
    lines.push('', `## ${category}`)
    for (const c of items) {
      const desc = c.frontmatter.description ? `: ${c.frontmatter.description}` : ''
      lines.push(`- [${c.frontmatter.title}](./ai/components/${c.name}.md)${desc}`)
    }
  }

  return lines.join('\n') + '\n'
}

/* -------------------------------------------------------------------------- */
/* Main                                                                       */
/* -------------------------------------------------------------------------- */

async function main() {
  // Fresh output every run.
  fs.rmSync(AI_DIR, { recursive: true, force: true })
  fs.rmSync(path.join(PUBLIC_DIR, 'ai'), { recursive: true, force: true })
  fs.mkdirSync(AI_COMPONENTS_DIR, { recursive: true })
  fs.mkdirSync(path.join(PUBLIC_DIR, 'ai/components'), { recursive: true })

  // Discover every component that has a meta.ts.
  const names = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(CONTENT_DIR, name, 'meta.ts')))
    .toSorted()

  if (names.length === 0) {
    console.warn('⚠ No components with meta.ts found.')
    return
  }

  // First pass: load everything into a shared map so `related` links can
  // resolve their titles.
  const loaded: LoadedComponent[] = []
  const byName = new Map<string, LoadedComponent>()

  for (const name of names) {
    const component = await loadComponent(name)
    if (!component) continue
    loaded.push(component)
    byName.set(name, component)
  }

  // Second pass: write per-component docs.
  for (const component of loaded) {
    const md = renderComponentDoc(component, byName)
    const fileName = `${component.name}.md`

    fs.writeFileSync(path.join(AI_COMPONENTS_DIR, fileName), md)
    fs.writeFileSync(path.join(PUBLIC_DIR, 'ai/components', fileName), md)
  }

  // Full doc.
  const full = renderFullDoc(loaded)
  fs.writeFileSync(path.join(AI_DIR, 'llms-full.md'), full)
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), full)

  // Public index.
  const index = renderPublicIndex(loaded)
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), index)

  console.log(`✓ Generated docs for ${loaded.length} component(s):`)
  for (const c of loaded) {
    const filename = `${c.name}.md`
    console.log(`  • ${filename}`)
  }
  console.log(`✓ .ai/llms-full.md`)
  console.log(`✓ apps/web/public/llms.txt`)
  console.log(`✓ apps/web/public/llms-full.txt`)
}

try {
  await main()
} catch (error) {
  console.error(error)
  process.exit(1)
}
