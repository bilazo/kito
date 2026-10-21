import { Skeleton } from '@bilazo/kito/components/skeleton'

export default function Shimmer() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="shimmer" className="size-(--control-md) shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton variant="shimmer" className="h-4 w-1/3" />
          <Skeleton variant="shimmer" className="h-3 w-1/2" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton variant="shimmer" className="h-4 w-full" />
        <Skeleton variant="shimmer" className="h-4 w-full" />
        <Skeleton variant="shimmer" className="h-4 w-2/3" />
      </div>
    </div>
  )
}
