import { createFileRoute, notFound } from '@tanstack/react-router'

import { PageHeader } from '@/components/page-header'

import type { ContentFrontmatter } from '@/lib/content'
import type { ComponentType } from 'react'

const docs = import.meta.glob<{
  default: ComponentType
  frontmatter: ContentFrontmatter
}>('../content/*/index.mdx', { eager: true })

export const Route = createFileRoute('/components/$slug')({
  component: ComponentPage,
  notFoundComponent: () => <div>Component not found</div>,
})

function ComponentPage() {
  const { slug } = Route.useParams()
  const mod = docs[`../content/${slug}/index.mdx`]
  if (!mod) throw notFound()

  const MdxComponent = mod.default
  const frontmatter = mod.frontmatter ?? { title: slug }

  return (
    <>
      <PageHeader frontmatter={frontmatter} />
      <MdxComponent />
    </>
  )
}
