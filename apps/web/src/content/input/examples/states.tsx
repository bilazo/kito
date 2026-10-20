import { Input } from '@bilazo/kito/components/input'

export default function States() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Input placeholder="Default" aria-label="Default" />
      <Input placeholder="Disabled" disabled aria-label="Disabled" />
      <Input defaultValue="Read only" readOnly aria-label="Read only" />
      <Input defaultValue="not-an-email" aria-invalid aria-label="Invalid" />
    </div>
  )
}
