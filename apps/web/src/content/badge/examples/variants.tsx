import { Badge } from '@bilazo/kito/components/badge'

export default function Variants() {
  return (
    <div className="flex gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="highlight">Highlight</Badge>
    </div>
  )
}
