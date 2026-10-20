import { buttonVariants } from '@bilazo/kito/components/button'
import { cn } from 'cn'
import { ExternalLink } from 'lucide-react'

import type { ContentFrontmatter } from '@/lib/content'

/**
 * Rendered above the MDX body of every component page. Pulls `title`,
 * `description`, and `links` from the file's frontmatter.
 *
 * The MDX body itself starts at `## Section` — it does **not** repeat the
 * title. That keeps the heading single-sourced from frontmatter and makes
 * the sidebar / page header stay in sync.
 */
export function PageHeader({ frontmatter }: { frontmatter: ContentFrontmatter }) {
  const links = Object.entries(frontmatter.links ?? {}).filter(([, href]) => Boolean(href))

  return (
    <header className="not-prose mb-8 flex justify-between border-b border-border pb-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{frontmatter.title}</h1>

        {frontmatter.description && (
          <p className="mt-2 text-base text-muted-foreground">{frontmatter.description}</p>
        )}
      </div>

      <div>
        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-xs')}
              >
                {capitalize(label)}
                <ExternalLink className="size-3" aria-hidden />
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
