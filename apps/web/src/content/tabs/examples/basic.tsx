import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'

export default function Basic() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="projects">Projects</TabsTab>
        <TabsTab value="account">Account</TabsTab>
        <TabsIndicator />
      </TabsList>
      <TabsPanel value="overview" className="pt-4">
        <p className="text-sm text-muted-foreground">Workspace stats and recent activity.</p>
      </TabsPanel>
      <TabsPanel value="projects" className="pt-4">
        <p className="text-sm text-muted-foreground">
          Milestones and deadlines for active projects.
        </p>
      </TabsPanel>
      <TabsPanel value="account" className="pt-4">
        <p className="text-sm text-muted-foreground">
          Profile, password, and notification preferences.
        </p>
      </TabsPanel>
    </Tabs>
  )
}
