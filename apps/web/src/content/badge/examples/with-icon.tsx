import { Badge } from '@bilazo/kito/components/badge'
import { BadgeCheck, BookmarkIcon, Check } from 'lucide-react'

export default function WithIcon() {
  return (
    <div className="flex gap-2">
      <Badge variant="secondary">
        <BadgeCheck data-icon="inline-start" />
        Verified
      </Badge>

      <Badge variant="outline">
        Bookmark
        <BookmarkIcon data-icon="inline-end" />
      </Badge>

      <Badge variant="soft">
        <Check />
        Approved
      </Badge>
    </div>
  )
}
