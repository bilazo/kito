import { Button } from '@bilazo/kito/components/button'
import {
  Menu,
  MenuLinkItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from '@bilazo/kito/components/menu'
import { BookOpen, ExternalLink, HelpCircle } from 'lucide-react'

export default function LinkItems() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Help</MenuTrigger>
      <MenuPopup className="w-56">
        <MenuLinkItem href="/docs">
          <BookOpen />
          Documentation
        </MenuLinkItem>
        <MenuLinkItem href="/support">
          <HelpCircle />
          Support
        </MenuLinkItem>
        <MenuSeparator />
        <MenuLinkItem href="https://example.com" target="_blank" rel="noreferrer">
          <ExternalLink />
          Changelog
        </MenuLinkItem>
      </MenuPopup>
    </Menu>
  )
}
