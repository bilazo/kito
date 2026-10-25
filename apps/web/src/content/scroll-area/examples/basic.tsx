import { ScrollArea } from '@bilazo/kito/components/scroll-area'

export default function Basic() {
  return (
    <ScrollArea className="h-64 w-80 rounded-lg border border-border p-4">
      <div className="flex flex-col gap-3 text-sm">
        {Array.from({ length: 25 }, (_, i) => (
          <p key={i}>Line {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        ))}
      </div>
    </ScrollArea>
  )
}
