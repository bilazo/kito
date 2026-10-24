import { AspectRatio } from '@bilazo/kito/components/aspect-ratio'

export default function Basic() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9}>
        <div className="flex size-full items-center justify-center rounded-lg bg-muted font-mono text-xs text-muted-foreground">
          16 / 9
        </div>
      </AspectRatio>
    </div>
  )
}
