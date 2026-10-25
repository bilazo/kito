import { Avatar, AvatarFallback } from '@bilazo/kito/components/avatar'
import { Badge } from '@bilazo/kito/components/badge'
import { ScrollArea } from '@bilazo/kito/components/scroll-area'

const MEMBERS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: `Member ${i + 1}`,
  initials: `M${i + 1}`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
}))

export default function WithList() {
  return (
    <ScrollArea className="h-72 w-80 rounded-lg border border-border">
      <div className="flex flex-col divide-y divide-border">
        {MEMBERS.map((m) => (
          <div key={m.id} className="flex items-center gap-3 p-3">
            <Avatar size="sm">
              <AvatarFallback>{m.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{m.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                @{m.name.toLowerCase().replace(' ', '')}
              </p>
            </div>
            <Badge
              variant={m.role === 'Admin' ? 'primary' : m.role === 'Editor' ? 'soft' : 'secondary'}
              size="sm"
            >
              {m.role}
            </Badge>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
