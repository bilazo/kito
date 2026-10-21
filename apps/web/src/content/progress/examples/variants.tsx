import { Progress, ProgressLabel, ProgressValue } from '@bilazo/kito/components/progress'

export default function Variants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress value={57} variant="primary">
        <div className="flex items-center justify-between text-sm">
          <ProgressLabel>Weekly progress</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>
      <Progress value={42} variant="highlight" size="lg">
        <div className="flex items-center justify-between text-sm">
          <ProgressLabel>Streak this month</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>
    </div>
  )
}
