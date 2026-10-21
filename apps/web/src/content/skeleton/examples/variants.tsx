import { Skeleton } from '@bilazo/kito/components/skeleton'

export default function Variants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          <code className="font-mono">variant=&quot;pulse&quot;</code> (default)
        </p>
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          <code className="font-mono">variant=&quot;shimmer&quot;</code>
        </p>
        <Skeleton variant="shimmer" className="h-4 w-48" />
        <Skeleton variant="shimmer" className="h-4 w-32" />
      </div>
    </div>
  )
}
