import { Input } from '@bilazo/kito/components/input'

export default function Disabled() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Input disabled aria-label="Disabled" placeholder="Disabled" />
      <Input readOnly aria-label="Read only" defaultValue="Read only" />
    </div>
  )
}
