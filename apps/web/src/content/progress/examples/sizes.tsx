import { Progress } from '@bilazo/kito/components/progress'

export default function Sizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">sm</p>
        <Progress value={60} size="sm" aria-label="Small" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">md</p>
        <Progress value={60} size="md" aria-label="Medium" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">lg</p>
        <Progress value={60} size="lg" aria-label="Large" />
      </div>
    </div>
  )
}
