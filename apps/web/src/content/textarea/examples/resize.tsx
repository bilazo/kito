import { Textarea } from '@bilazo/kito/components/textarea'

export default function Resize() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">resize-y (default) — drag the bottom edge</p>
        <Textarea placeholder="I can be resized vertically" aria-label="Resizable" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">autoResize — the browser sizes to content</p>
        <Textarea autoResize rows={1} aria-label="Auto-resizing" />
      </div>
    </div>
  )
}
