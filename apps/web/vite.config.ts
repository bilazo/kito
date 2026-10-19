import path from 'node:path'

import mdx from '@mdx-js/rollup'
import tailwind from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'

const here = import.meta.dirname
const uiSrc = path.resolve(here, '../../packages/ui/src')

export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    mdx({
      providerImportSource: '@mdx-js/react',
      // GFM adds tables, strikethrough, task lists, autolinks. Without it,
      // markdown tables in our docs render as plain text.
      remarkPlugins: [
        remarkGfm,
        // Parse the YAML block at the top of the MDX file.
        remarkFrontmatter,
        // Export it as a named `frontmatter` from the MDX module.
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
      ],
    }),
    react(),
    tailwind(),
  ],
  resolve: {
    alias: [
      // Docs source alias: @/foo → apps/web/src/foo
      // Regex (not bare string) so `@base-ui/*` is not swallowed.
      {
        find: /^@\//u,
        replacement: `${path.resolve(here, 'src')}/`,
      },
      // Kito styles — resolve to source during dev
      {
        find: /^@bilazo\/kito\/styles\/defaults\.css$/u,
        replacement: path.resolve(uiSrc, 'styles/defaults.css'),
      },
      // Kito components — resolve to source for HMR
      // `@bilazo/kito/components/button` → src/components/button/button.tsx
      {
        find: /^@bilazo\/kito\/components\/(.+)$/u,
        replacement: path.resolve(uiSrc, 'components/$1/$1.tsx'),
      },
    ],
  },
})
