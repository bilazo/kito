import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'
import { Bell, CreditCard, User } from 'lucide-react'

export default function WithIcons() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList>
        <TabsTab value="account">
          <User />
          Account
        </TabsTab>
        <TabsTab value="notifications">
          <Bell />
          Notifications
        </TabsTab>
        <TabsTab value="billing">
          <CreditCard />
          Billing
        </TabsTab>
        <TabsIndicator />
      </TabsList>
      <TabsPanel value="account" className="pt-4">
        Profile settings.
      </TabsPanel>
      <TabsPanel value="notifications" className="pt-4">
        Email and push notification preferences.
      </TabsPanel>
      <TabsPanel value="billing" className="pt-4">
        Payment and invoice history.
      </TabsPanel>
    </Tabs>
  )
}
