import { ScrollArea, ScrollBar } from '@bilazo/kito/components/scroll-area'

export default function Horizontal() {
  return (
    <ScrollArea className="w-full max-w-lg rounded-lg border border-border p-4">
      <div className="flex gap-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex size-32 shrink-0 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
