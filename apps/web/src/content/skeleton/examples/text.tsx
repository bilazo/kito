import { Skeleton } from '@bilazo/kito/components/skeleton'

export default function Text() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      {/* Last line is shorter, like real text wrap. */}
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}
