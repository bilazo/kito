import { Badge } from '@bilazo/kito/components/badge'

export default function Count() {
  return (
    <div className="flex items-center gap-6 text-sm">
      <span className="flex items-center gap-2">
        Inbox
        <Badge variant="primary" size="sm">
          12
        </Badge>
      </span>
      <span className="flex items-center gap-2">
        Drafts
        <Badge variant="secondary" size="sm">
          3
        </Badge>
      </span>
      <span className="flex items-center gap-2">
        Archived
        <Badge variant="outline" size="sm">
          248
        </Badge>
      </span>
    </div>
  )
}
