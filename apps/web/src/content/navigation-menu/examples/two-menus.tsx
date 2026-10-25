import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@bilazo/kito/components/navigation-menu'
import { BookOpen, Rocket, Settings, Users } from 'lucide-react'

export default function TwoMenus() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-72 gap-1">
              <NavigationMenuLink href="/products/app">
                <Rocket />
                <span>App</span>
              </NavigationMenuLink>
              <NavigationMenuLink href="/products/admin">
                <Settings />
                <span>Admin</span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-72 gap-1">
              <NavigationMenuLink href="/docs">
                <BookOpen />
                <span>Documentation</span>
              </NavigationMenuLink>
              <NavigationMenuLink href="/community">
                <Users />
                <span>Community</span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <a href="/pricing" className={navigationMenuTriggerStyle()}>
            Pricing
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
