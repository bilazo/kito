import { Separator } from '@bilazo/kito/components/separator'

export default function Basic() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <p className="text-sm">Above the line</p>
      <Separator />
      <p className="text-sm">Below the line</p>
    </div>
  )
}
