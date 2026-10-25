import { ScrollArea, ScrollBar } from '@bilazo/kito/components/scroll-area'

export default function BothAxes() {
  return (
    <ScrollArea className="h-72 w-80 rounded-lg border border-border">
      <div className="p-4" style={{ width: 800 }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-start">
              {Array.from({ length: 8 }, (_, i) => (
                <th key={i} className="p-2 text-start font-medium">
                  Column {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 20 }, (_, r) => (
              <tr key={r} className="border-b border-border">
                {Array.from({ length: 8 }, (__, c) => (
                  <td key={c} className="p-2 whitespace-nowrap">
                    R{r + 1} · C{c + 1}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
