import { Textarea } from '@bilazo/kito/components/textarea'

export default function AutoResize() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Fixed rows (default)</p>
        <Textarea rows={3} placeholder="Three fixed rows" aria-label="Fixed" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">autoResize — grows with content</p>
        <Textarea
          autoResize
          rows={1}
          placeholder="Start typing and watch me grow…"
          aria-label="Auto resize"
        />
      </div>
    </div>
  )
}
