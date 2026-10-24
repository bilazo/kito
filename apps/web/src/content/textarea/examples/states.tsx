import { Textarea } from '@bilazo/kito/components/textarea'

export default function States() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Textarea placeholder="Default" aria-label="Default" />
      <Textarea placeholder="Disabled" disabled aria-label="Disabled" />
      <Textarea defaultValue="Read-only content" readOnly aria-label="Read only" />
      <Textarea defaultValue="This value is not valid" aria-invalid aria-label="Invalid" />
    </div>
  )
}
