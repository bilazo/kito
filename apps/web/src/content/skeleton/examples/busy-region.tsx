import { Skeleton } from '@bilazo/kito/components/skeleton'

export default function BusyRegion() {
  return (
    <div aria-busy="true" aria-live="polite" className="flex w-full max-w-md flex-col gap-3">
      <p className="sr-only">Loading content…</p>
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
