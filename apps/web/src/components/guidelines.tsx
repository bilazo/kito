// oxlint-disable react/no-array-index-key
import { loadMeta } from '@/lib/meta'

export function Guidelines({ name }: { name: string }) {
  const meta = loadMeta(name)
  if (!meta) return null

  const hasBullets = meta.whenToUse.length > 0 || meta.whenNotToUse.length > 0
  if (!hasBullets) return null

  return (
    <section className="not-prose my-8 overflow-hidden rounded-xl border border-border">
      <div className="grid divide-border md:grid-cols-2 md:divide-x">
        <div className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-primary md:px-6">
          <span aria-hidden>✅</span>
          <span>Use when</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-destructive md:px-6">
          <span aria-hidden>❌</span>
          <span>Avoid when</span>
        </div>
      </div>

      <div className="grid divide-border border-t border-border md:grid-cols-2 md:divide-x">
        <div className="px-4 py-4 md:px-6 md:py-5">
          <ul className="space-y-2 text-sm">
            {meta.whenToUse.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-0.5 shrink-0 text-primary">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-border px-4 py-4 md:border-t-0 md:px-6 md:py-5">
          <ul className="space-y-2 text-sm">
            {meta.whenNotToUse.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-0.5 shrink-0 text-destructive">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
