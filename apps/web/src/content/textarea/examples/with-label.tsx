import { Label } from '@bilazo/kito/components/label'
import { Textarea } from '@bilazo/kito/components/textarea'

export default function WithLabel() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Label htmlFor="demo-message">Message</Label>
      <Textarea id="demo-message" placeholder="Write your message here…" rows={4} />
      <p className="text-xs text-muted-foreground">Maximum 500 characters.</p>
    </div>
  )
}
