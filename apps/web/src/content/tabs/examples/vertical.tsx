import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'

export default function Vertical() {
  return (
    <Tabs defaultValue="general" orientation="vertical" className="flex w-full max-w-md gap-6">
      <TabsList orientation="vertical" className="w-40">
        <TabsTab orientation="vertical" value="general">
          General
        </TabsTab>
        <TabsTab orientation="vertical" value="security">
          Security
        </TabsTab>
        <TabsTab orientation="vertical" value="billing">
          Billing
        </TabsTab>
        <TabsIndicator />
      </TabsList>
      <div className="flex-1">
        <TabsPanel value="general">
          <p className="text-sm text-muted-foreground">Display name, timezone, language.</p>
        </TabsPanel>
        <TabsPanel value="security">
          <p className="text-sm text-muted-foreground">Password, two-factor authentication.</p>
        </TabsPanel>
        <TabsPanel value="billing">
          <p className="text-sm text-muted-foreground">Payment methods and invoices.</p>
        </TabsPanel>
      </div>
    </Tabs>
  )
}
