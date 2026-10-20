import { DirectionProvider, useDirection } from '@bilazo/kito/components/direction'

function DirectionBadge() {
  const direction = useDirection()
  return <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs">{direction}</code>
}

export default function UseDirection() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Outside provider:</span>
        <DirectionBadge />
      </div>

      <DirectionProvider direction="rtl">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            Inside {'<DirectionProvider direction="rtl">'}:
          </span>
          <DirectionBadge />
        </div>
      </DirectionProvider>
    </div>
  )
}
