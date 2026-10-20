import { Badge } from '@bilazo/kito/components/badge'

export default function Status() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="primary">Active</Badge>
      <Badge variant="soft">Pending</Badge>
      <Badge variant="outline">Draft</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="highlight">Featured</Badge>
    </div>
  )
}
