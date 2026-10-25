import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@bilazo/kito/components/navigation-menu'

export default function TriggerStyle() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <a href="/docs" className={navigationMenuTriggerStyle()}>
            Documentation
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/changelog" className={navigationMenuTriggerStyle()}>
            Changelog
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/blog" className={navigationMenuTriggerStyle()}>
            Blog
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
