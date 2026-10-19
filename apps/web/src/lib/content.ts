/**
 * Frontmatter shape for every MDX page under `src/content/`.
 *
 * ```yaml
 * ---
 * title: Button
 * description: A pressable action element.
 * category: Actions
 * order: 10
 * links:
 *   doc: https://base-ui.com/react/components/button
 *   api: https://base-ui.com/react/components/button#api-reference
 * ---
 * ```
 */
export interface ContentFrontmatter {
  /** Shown in the sidebar and as the page's H1. Required. */
  title: string

  /** One-line summary under the title. */
  description?: string

  /** Sidebar group. Must be one of `CATEGORY_ORDER`. */
  category?: Category

  /** Sort key inside the category. Lower = higher in the list. */
  order?: number

  /**
   * External links shown under the description.
   *
   * The key is the label ("doc", "api", …). Any string key is allowed —
   * the header renders them in the order given.
   */
  links?: Record<string, string | undefined>

  /** Hide the page from the sidebar. Still reachable by URL. */
  hidden?: boolean
}

/**
 * Fixed category order for the sidebar. Add a new category here and it
 * will appear in this position; any component whose `category` is missing
 * from this list lands in "Other" at the end.
 */
export const CATEGORY_ORDER = ['Components'] as const

export type Category = (typeof CATEGORY_ORDER)[number]

export interface ContentEntry {
  slug: string
  frontmatter: ContentFrontmatter
}

/**
 * Read the frontmatter of every MDX file under `src/content/`. Ordered by
 * category, then by `order`, then by `title`.
 */
export function loadContent(): ContentEntry[] {
  const modules = import.meta.glob<{
    frontmatter: ContentFrontmatter
  }>('../content/*/index.mdx', { eager: true })

  return Object.entries(modules)
    .map(([path, mod]) => ({
      // '../content/button/index.mdx' → 'button'
      slug: path.replace('../content/', '').replace('/index.mdx', ''),
      frontmatter: mod.frontmatter ?? { title: path },
    }))
    .filter((c) => !c.frontmatter.hidden)
    .toSorted((a, b) => {
      const aIdx = categoryIndex(a.frontmatter.category)
      const bIdx = categoryIndex(b.frontmatter.category)
      if (aIdx !== bIdx) return aIdx - bIdx

      const aOrder = a.frontmatter.order ?? 999
      const bOrder = b.frontmatter.order ?? 999
      if (aOrder !== bOrder) return aOrder - bOrder

      return a.frontmatter.title.localeCompare(b.frontmatter.title)
    })
}

export function groupByCategory(entries: ContentEntry[]): Map<Category | 'Other', ContentEntry[]> {
  const groups = new Map<Category | 'Other', ContentEntry[]>()
  for (const entry of entries) {
    const cat = (entry.frontmatter.category ?? 'Other') as Category | 'Other'
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push(entry)
  }
  return groups
}

function categoryIndex(cat: Category | undefined): number {
  if (!cat) return CATEGORY_ORDER.length
  const idx = (CATEGORY_ORDER as readonly string[]).indexOf(cat)
  return idx === -1 ? CATEGORY_ORDER.length : idx
}
