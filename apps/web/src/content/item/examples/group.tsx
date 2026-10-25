import { Badge } from '@bilazo/kito/components/badge'
import { Button } from '@bilazo/kito/components/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@bilazo/kito/components/item'
import { Bell, Lock, Palette } from 'lucide-react'

const SETTINGS = [
  {
    id: 'notifications',
    icon: <Bell />,
    title: 'Notifications',
    description: 'Choose how you want to hear from us.',
    action: 'Manage',
  },
  {
    id: 'appearance',
    icon: <Palette />,
    title: 'Appearance',
    description: 'Theme and layout for your workspace.',
    badge: 'New',
  },
  {
    id: 'security',
    icon: <Lock />,
    title: 'Security',
    description: 'Two-factor authentication and sessions.',
    action: 'Review',
  },
]

export default function Group() {
  return (
    <div className="w-full max-w-md">
      <ItemGroup>
        {SETTINGS.map((s) => (
          <Item key={s.id} variant="outline">
            <ItemMedia variant="icon">{s.icon}</ItemMedia>
            <ItemContent>
              <ItemTitle>{s.title}</ItemTitle>
              <ItemDescription>{s.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              {s.badge ? <Badge variant="soft">{s.badge}</Badge> : null}
              {s.action ? (
                <Button variant="outline" size="sm">
                  {s.action}
                </Button>
              ) : null}
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
