import { Button } from '@bilazo/kito/components/button'
import { Separator } from '@bilazo/kito/components/separator'

export default function Semantic() {
  return (
    // TODO: replace with <Toolbar> once available
    <div
      role="toolbar"
      aria-label="Text formatting"
      className="flex items-center gap-1 rounded-md border border-border p-1"
    >
      <Button size="sm" variant="ghost" aria-label="Bold">
        B
      </Button>
      <Button size="sm" variant="ghost" aria-label="Italic">
        I
      </Button>
      <Button size="sm" variant="ghost" aria-label="Underline">
        U
      </Button>
      <Separator orientation="vertical" decorative={false} className="mx-1 h-8" />
      <Button size="sm" variant="ghost">
        Left
      </Button>
      <Button size="sm" variant="ghost">
        Center
      </Button>
      <Button size="sm" variant="ghost">
        Right
      </Button>
    </div>
  )
}
