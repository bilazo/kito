import { Toaster } from '@bilazo/kito/components/toast'
import { MDXProvider } from '@mdx-js/react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { CodeBlock } from '@/components/code-block'
import { ComponentPreview } from '@/components/component-preview'
import { Guidelines } from '@/components/guidelines'
import { PropsTable } from '@/components/props-table'
import { SettingsSheet } from '@/components/settings-sheet'
import { Toolbar } from '@/components/toolbar'
import { groupByCategory, loadContent, CATEGORY_ORDER } from '@/lib/content'
import { PreferencesProvider } from '@/lib/preferences'

export const Route = createRootRoute({ component: RootLayout })

const entries = loadContent()
const grouped = groupByCategory(entries)

function RootLayout() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <PreferencesProvider>
      <MDXProvider components={{ ComponentPreview, PropsTable, CodeBlock, Guidelines }}>
        <div className="min-h-screen bg-background text-foreground">
          {/* Sidebar */}
          <aside className="fixed inset-y-0 left-0 w-60 overflow-y-auto border-r border-border p-4">
            <h1 className="text-lg font-semibold">Kito</h1>

            <nav className="mt-6 flex flex-col gap-6 text-sm">
              {CATEGORY_ORDER.map((category) => {
                const items = grouped.get(category)
                if (!items || items.length === 0) return null

                return (
                  <div key={category}>
                    <h2 className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {category}
                    </h2>
                    <ul className="flex flex-col gap-0.5">
                      {items.map((entry) => (
                        <li key={entry.slug}>
                          <Link
                            to="/components/$slug"
                            params={{ slug: entry.slug }}
                            className="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            activeProps={{
                              className: 'bg-accent text-accent-foreground',
                            }}
                          >
                            {entry.frontmatter.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </nav>
          </aside>

          {/* Content column: toolbar + page */}
          <div className="flex min-w-0 flex-1 flex-col ps-60">
            <Toolbar onOpenSettings={() => setSettingsOpen(true)} />

            <main className="flex-1">
              <div className="mx-auto prose max-w-4xl px-8 py-12 prose-neutral dark:prose-invert">
                <Outlet />
              </div>
            </main>
          </div>
        </div>

        {/* Settings panel */}
        <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />

        {/* Toast Provider */}
        <Toaster position="bottom-right" />
      </MDXProvider>
    </PreferencesProvider>
  )
}
