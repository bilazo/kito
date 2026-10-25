import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@bilazo/kito/components/accordion'
import { CreditCard, Lock, Settings, User } from 'lucide-react'

const SECTIONS = [
  {
    value: 'profile',
    icon: <User />,
    title: 'Profile',
    body: 'Display name, avatar, and public bio.',
  },
  {
    value: 'security',
    icon: <Lock />,
    title: 'Security',
    body: 'Password, two-factor authentication, and active sessions.',
  },
  {
    value: 'billing',
    icon: <CreditCard />,
    title: 'Billing',
    body: 'Payment methods, invoices, and plan details.',
  },
  {
    value: 'settings',
    icon: <Settings />,
    title: 'Settings',
    body: 'Workspace preferences and integrations.',
  },
]

export default function WithIcons() {
  return (
    <Accordion className="w-full max-w-md">
      {SECTIONS.map((section) => (
        <AccordionItem key={section.value} value={section.value}>
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                {section.icon}
              </span>
              {section.title}
            </span>
          </AccordionTrigger>
          <AccordionContent>{section.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
