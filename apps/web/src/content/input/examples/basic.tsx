import { Input } from '@bilazo/kito/components/input'

export default function Basic() {
  return (
    <div className="w-full max-w-md">
      <Input placeholder="you@example.com" aria-label="Email" />
    </div>
  )
}
