import { Progress, ProgressLabel, ProgressValue } from '@bilazo/kito/components/progress'

export default function WithLabel() {
  return (
    <Progress value={57} className="w-full max-w-md">
      <div className="flex items-center justify-between text-sm">
        <ProgressLabel>Weekly progress</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  )
}
