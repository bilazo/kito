import { AspectRatio } from '@bilazo/kito/components/aspect-ratio'

export default function Square() {
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-4">
      <AspectRatio ratio={1}>
        <div className="flex size-full items-center justify-center rounded-lg bg-primary-soft font-mono text-xs text-primary-soft-foreground">
          1 / 1
        </div>
      </AspectRatio>
      <AspectRatio ratio={1}>
        <div className="flex size-full items-center justify-center rounded-lg bg-secondary font-mono text-xs text-secondary-foreground">
          1 / 1
        </div>
      </AspectRatio>
      <AspectRatio ratio={1}>
        <div className="flex size-full items-center justify-center rounded-lg bg-highlight font-mono text-xs text-highlight-foreground">
          1 / 1
        </div>
      </AspectRatio>
    </div>
  )
}
