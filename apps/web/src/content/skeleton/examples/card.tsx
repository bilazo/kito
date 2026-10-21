import { Skeleton } from '@bilazo/kito/components/skeleton'

export default function Card() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <Skeleton className="size-(--control-md) shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  )
}
