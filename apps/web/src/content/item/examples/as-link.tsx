import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@bilazo/kito/components/item'
import { Home, Settings, Users } from 'lucide-react'

const LINKS = [
  {
    href: '/dashboard',
    icon: <Home />,
    title: 'Dashboard',
    description: 'Overview of your account and activity.',
  },
  {
    href: '/team',
    icon: <Users />,
    title: 'Team',
    description: 'Manage members, roles, and permissions.',
  },
  {
    href: '/settings',
    icon: <Settings />,
    title: 'Settings',
    description: 'Profile, security, and integrations.',
  },
]

export default function AsLink() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      {LINKS.map((link) => (
        // oxlint-disable-next-line jsx-a11y/control-has-associated-label
        <Item key={link.href} render={<a href={link.href} />}>
          <ItemMedia variant="icon">{link.icon}</ItemMedia>
          <ItemContent>
            <ItemTitle>{link.title}</ItemTitle>
            <ItemDescription>{link.description}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}
