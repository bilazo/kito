import { Input } from '@bilazo/kito/components/input'

export default function Types() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Input type="email" placeholder="you@example.com" aria-label="Email" />
      <Input type="url" placeholder="https://example.com" aria-label="URL" />
      <Input type="password" placeholder="••••••••" aria-label="Password" />
      <Input type="tel" placeholder="+98 912 000 0000" aria-label="Phone" />
      <Input type="number" placeholder="42" aria-label="Quantity" />
      <Input type="search" placeholder="Search…" aria-label="Search" />
    </div>
  )
}
