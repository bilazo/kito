import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@bilazo/kito/components/navigation-menu'
import { BarChart3, FileText, Inbox } from 'lucide-react'

const ITEMS = [
  {
    href: '/analytics',
    icon: <BarChart3 />,
    label: 'Analytics',
    description: 'Realtime traffic and conversions.',
  },
  {
    href: '/inbox',
    icon: <Inbox />,
    label: 'Inbox',
    description: 'All customer conversations in one place.',
  },
  {
    href: '/reports',
    icon: <FileText />,
    label: 'Reports',
    description: 'Scheduled exports and data snapshots.',
  },
]

export default function WithIcons() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Workspace</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-96 gap-1">
              {ITEMS.map((item) => (
                <NavigationMenuLink key={item.href} href={item.href}>
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
