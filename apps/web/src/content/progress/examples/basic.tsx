import { Progress } from '@bilazo/kito/components/progress'

export default function Basic() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress value={25} aria-label="25%" />
      <Progress value={57} aria-label="57%" />
      <Progress value={100} aria-label="Complete" />
    </div>
  )
}
