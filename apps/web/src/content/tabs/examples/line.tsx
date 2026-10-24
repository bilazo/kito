import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'

export default function Line() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="line">
        <TabsTab variant="line" value="overview">
          Overview
        </TabsTab>
        <TabsTab variant="line" value="projects">
          Projects
        </TabsTab>
        <TabsTab variant="line" value="account">
          Account
        </TabsTab>
        <TabsIndicator />
      </TabsList>
      <TabsPanel value="overview" className="pt-4">
        Overview content
      </TabsPanel>
      <TabsPanel value="projects" className="pt-4">
        Projects content
      </TabsPanel>
      <TabsPanel value="account" className="pt-4">
        Account content
      </TabsPanel>
    </Tabs>
  )
}
