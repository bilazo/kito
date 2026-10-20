import { Badge } from '@bilazo/kito/components/badge'

export default function AsLink() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge render={<a href="/tags/react" aria-label="React" />} variant="outline">
        React
      </Badge>
      <Badge render={<a href="/tags/typescript" aria-label="TypeScript" />} variant="outline">
        TypeScript
      </Badge>
      <Badge render={<a href="/tags/tailwind" aria-label="Tailwind" />} variant="outline">
        Tailwind
      </Badge>
    </div>
  )
}
