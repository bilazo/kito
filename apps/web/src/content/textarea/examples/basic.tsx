import { Textarea } from '@bilazo/kito/components/textarea'

export default function Basic() {
  return (
    <div className="w-full max-w-md">
      <Textarea placeholder="Tell us what you think…" aria-label="Message" />
    </div>
  )
}
