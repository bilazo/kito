import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'

export default function Disabled() {
  return (
    <Tabs defaultValue="a" className="w-full max-w-md">
      <TabsList>
        <TabsTab value="a">Enabled</TabsTab>
        <TabsTab value="b" disabled>
          Disabled
        </TabsTab>
        <TabsTab value="c">Another</TabsTab>
        <TabsIndicator />
      </TabsList>
      <TabsPanel value="a" className="pt-4">
        First panel.
      </TabsPanel>
      <TabsPanel value="b" className="pt-4">
        This panel is unreachable — the tab is disabled.
      </TabsPanel>
      <TabsPanel value="c" className="pt-4">
        Third panel.
      </TabsPanel>
    </Tabs>
  )
}
