import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'
import { Menu } from 'lucide-react'

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/projects', label: 'Projects' },
  { href: '/settings', label: 'Settings' },
  { href: '/billing', label: 'Billing' },
]

export default function Navigation() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
        <Menu />
      </SheetTrigger>
      <SheetPopup side="start">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <SheetBody className="flex flex-col gap-2 px-2">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <SheetClose
                key={item.href}
                // oxlint-disable-next-line jsx-a11y/control-has-associated-label
                render={<a href={item.href} />}
                className="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </SheetClose>
            ))}
          </nav>
        </SheetBody>
      </SheetPopup>
    </Sheet>
  )
}
