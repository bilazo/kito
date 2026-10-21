import { Progress, ProgressLabel, ProgressValue } from '@bilazo/kito/components/progress'

export default function Indeterminate() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress value={null} aria-label="Loading" />
      <Progress value={null} variant="highlight" aria-label="Processing">
        <ProgressLabel>Processing…</ProgressLabel>
      </Progress>
    </div>
  )
}
