import { Avatar, AvatarFallback } from '@bilazo/kito/components/avatar'
import { Badge } from '@bilazo/kito/components/badge'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
} from '@bilazo/kito/components/drawer'
import { Separator } from '@bilazo/kito/components/separator'
import { useState } from 'react'

type Status = 'At risk' | 'Healthy' | 'Paused'

interface Customer {
  id: string
  name: string
  company: string
  email: string
  initials: string
  owner: string
  status: Status
  summary: string
}

const CUSTOMERS: Customer[] = [
  {
    id: 'marcus-lind',
    name: 'Marcus Lind',
    company: 'Polar Banking',
    email: 'marcus@polarbanking.fi',
    initials: 'ML',
    owner: 'Devon Reed',
    status: 'At risk',
    summary:
      'Stakeholders are hesitant to renew until audit exports and multilingual queue governance are stabilized.',
  },
  {
    id: 'alia-hassan',
    name: 'Alia Hassan',
    company: 'Northwind Logistics',
    email: 'alia@northwind.co',
    initials: 'AH',
    owner: 'Priya Patel',
    status: 'Healthy',
    summary:
      'Recently expanded to a second region. CSAT trending up after the Q1 onboarding revamp.',
  },
  {
    id: 'tomas-vega',
    name: 'Tomas Vega',
    company: 'Ferro Studio',
    email: 'tomas@ferrostudio.es',
    initials: 'TV',
    owner: 'Jordan Liu',
    status: 'Paused',
    summary: 'Paused billing during a reorg. Champion confirmed expected restart next quarter.',
  },
]

const STATUS_VARIANT: Record<Status, 'destructive' | 'primary' | 'secondary'> = {
  'At risk': 'destructive',
  'Healthy': 'primary',
  'Paused': 'secondary',
}

export default function Floating() {
  const [active, setActive] = useState<Customer | null>(null)

  return (
    <>
      <div className="flex flex-col gap-1 rounded-md border border-border bg-background p-1">
        {CUSTOMERS.map((customer) => (
          <button
            key={customer.id}
            type="button"
            onClick={() => setActive(customer)}
            className="flex items-center gap-3 rounded-sm px-2 py-2 text-start transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
          >
            <Avatar size="sm">
              <AvatarFallback>{customer.initials}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium">{customer.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {customer.company} · {customer.email}
              </span>
            </div>
            <Badge variant={STATUS_VARIANT[customer.status]}>{customer.status}</Badge>
          </button>
        ))}
      </div>

      <Drawer
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
        side="right"
        variant="floating"
      >
        <DrawerPopup>
          {active && (
            <>
              <DrawerHeader className="flex-row items-center gap-3 border-b">
                <Avatar size="lg">
                  <AvatarFallback>{active.initials}</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-start">
                  <DrawerTitle className="truncate">{active.name}</DrawerTitle>
                  <span className="truncate text-xs text-muted-foreground">
                    {active.company} · {active.email}
                  </span>
                </div>
              </DrawerHeader>

              <DrawerBody className="flex flex-col gap-5 p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Owner · {active.owner}</Badge>
                  <Badge variant={STATUS_VARIANT[active.status]}>{active.status}</Badge>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{active.summary}</p>

                <Separator />

                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-xs text-muted-foreground">Company</dt>
                    <dd>{active.company}</dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-xs text-muted-foreground">Owner</dt>
                    <dd>{active.owner}</dd>
                  </div>
                </dl>
              </DrawerBody>
            </>
          )}
        </DrawerPopup>
      </Drawer>
    </>
  )
}
