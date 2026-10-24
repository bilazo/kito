import { AspectRatio } from '@bilazo/kito/components/aspect-ratio'

export default function Portrait() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-4">
      <AspectRatio ratio={9 / 16}>
        <div className="flex size-full items-center justify-center rounded-lg bg-muted font-mono text-xs text-muted-foreground">
          9 / 16
        </div>
      </AspectRatio>
      <AspectRatio ratio={3 / 4}>
        <div className="flex size-full items-center justify-center rounded-lg bg-secondary font-mono text-xs text-secondary-foreground">
          3 / 4
        </div>
      </AspectRatio>
    </div>
  )
}
