import { Skeleton } from '@bilazo/kito/components/skeleton'

export default function Avatar() {
  return (
    <div className="flex items-center gap-3">
      {/* Matches Avatar's sm, md, lg sizes so the swap-in has no shift. */}
      <Skeleton className="size-(--control-sm) rounded-full" />
      <Skeleton className="size-(--control-md) rounded-full" />
      <Skeleton className="size-(--control-lg) rounded-full" />
    </div>
  )
}
