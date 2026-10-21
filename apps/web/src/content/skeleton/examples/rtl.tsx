import { Skeleton } from '@bilazo/kito/components/skeleton'

export default function Rtl() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">خطوط متن</p>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">آواتار</p>
        <div className="flex items-center gap-3">
          <Skeleton className="size-(--control-sm) rounded-full" />
          <Skeleton className="size-(--control-md) rounded-full" />
          <Skeleton className="size-(--control-lg) rounded-full" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">کارت</p>
        <div className="w-full rounded-xl border border-border bg-card p-6">
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
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">درخشش</p>
        <div className="flex flex-col gap-2">
          <Skeleton variant="shimmer" className="h-4 w-full" />
          <Skeleton variant="shimmer" className="h-4 w-full" />
          <Skeleton variant="shimmer" className="h-4 w-2/3" />
        </div>
      </div>

      <div aria-busy="true" aria-live="polite" className="flex flex-col gap-3">
        <p className="sr-only">در حال بارگذاری محتوا…</p>
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}
