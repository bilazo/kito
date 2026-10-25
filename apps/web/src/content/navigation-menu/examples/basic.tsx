import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@bilazo/kito/components/navigation-menu'

const PRODUCTS = [
  {
    href: '/products/analytics',
    label: 'Analytics',
    description: 'Traffic and conversion dashboards.',
  },
  {
    href: '/products/inbox',
    label: 'Inbox',
    description: 'Unified customer conversations.',
  },
  {
    href: '/products/reports',
    label: 'Reports',
    description: 'Scheduled exports and alerts.',
  },
]

export default function Basic() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-80 gap-1">
              {PRODUCTS.map((p) => (
                <NavigationMenuLink key={p.href} href={p.href}>
                  <div className="flex flex-col">
                    <span className="font-medium">{p.label}</span>
                    <span className="text-xs text-muted-foreground">{p.description}</span>
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <a href="/pricing" className={navigationMenuTriggerStyle()}>
            Pricing
          </a>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <a href="/docs" className={navigationMenuTriggerStyle()}>
            Docs
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
