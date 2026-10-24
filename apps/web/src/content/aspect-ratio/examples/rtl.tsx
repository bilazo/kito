import { AspectRatio } from '@bilazo/kito/components/aspect-ratio'

export default function Rtl() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <AspectRatio ratio={16 / 9}>
        <div className="flex size-full items-center justify-center rounded-lg bg-muted font-mono text-xs text-muted-foreground">
          نسبت ۱۶ / ۹
        </div>
      </AspectRatio>

      <div className="grid grid-cols-2 gap-4">
        <AspectRatio ratio={1}>
          <div className="flex size-full items-center justify-center rounded-lg bg-primary-soft font-mono text-xs text-primary-soft-foreground">
            مربع ۱ / ۱
          </div>
        </AspectRatio>
        <AspectRatio ratio={9 / 16}>
          <div className="flex size-full items-center justify-center rounded-lg bg-secondary font-mono text-xs text-secondary-foreground">
            عمودی ۹ / ۱۶
          </div>
        </AspectRatio>
      </div>
    </div>
  )
}
