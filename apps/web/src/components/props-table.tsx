import { loadMeta } from '@/lib/meta'

interface PropsTableProps {
  /** Component slug, e.g. `button`. */
  name: string
}

/**
 * Renders the props table for a component from its manual `meta.ts`.
 *
 * The list is intentionally short: only props that matter. Native HTML
 * attributes and Base UI pass-throughs are described in the optional
 * `propsNote` under the table, not enumerated as rows.
 */
export function PropsTable({ name }: PropsTableProps) {
  const meta = loadMeta(name)

  if (!meta) {
    return (
      <div className="my-6 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
        No props metadata for this component. Add a{' '}
        <code className="font-mono text-xs">meta.ts</code> next to{' '}
        <code className="font-mono text-xs">index.mdx</code>.
      </div>
    )
  }

  if (meta.props.length === 0) {
    return (
      <div className="my-6 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
        {meta.propsNote ?? 'This component takes no props of its own.'}
      </div>
    )
  }

  return (
    <div className="not-prose my-6">
      <div className="overflow-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-start">
            <tr>
              <th className="w-[1%] px-4 py-2 text-start font-medium whitespace-nowrap">Prop</th>
              <th className="px-4 py-2 text-start font-medium">Type</th>
              <th className="w-[1%] px-4 py-2 text-start font-medium whitespace-nowrap">Default</th>
              <th className="px-4 py-2 text-start font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {meta.props.map((p) => (
              <tr key={p.name} className="border-t border-border align-top">
                <td className="px-4 py-2 font-mono text-xs whitespace-nowrap">
                  {p.name}
                  {p.required ? <span className="ms-0.5 text-destructive">*</span> : null}
                </td>
                <td className="max-w-88 px-4 py-2 font-mono text-xs text-muted-foreground">
                  <code className="wrap-break-word">{p.type}</code>
                </td>
                <td className="px-4 py-2 font-mono text-xs whitespace-nowrap text-muted-foreground">
                  {p.default ?? '—'}
                </td>
                <td className="px-4 py-2 text-muted-foreground">{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {meta.propsNote && <p className="mt-3 text-xs text-muted-foreground">{meta.propsNote}</p>}
    </div>
  )
}
