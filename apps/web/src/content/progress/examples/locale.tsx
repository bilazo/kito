import { Progress, ProgressLabel, ProgressValue } from '@bilazo/kito/components/progress'

export default function Locale() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress value={57} locale="en-US">
        <div className="flex items-center justify-between text-sm">
          <ProgressLabel>Progress (en-US)</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>
      <Progress value={57} locale="fa-IR">
        <div className="flex items-center justify-between text-sm">
          <ProgressLabel>Progress (fa-IR)</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>
    </div>
  )
}
