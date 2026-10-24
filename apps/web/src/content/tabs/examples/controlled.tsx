import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState('a')

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Tabs value={value} onValueChange={(v) => setValue(v as string)}>
        <TabsList>
          <TabsTab value="a">Tab A</TabsTab>
          <TabsTab value="b">Tab B</TabsTab>
          <TabsTab value="c">Tab C</TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="a" className="pt-4">
          Panel A
        </TabsPanel>
        <TabsPanel value="b" className="pt-4">
          Panel B
        </TabsPanel>
        <TabsPanel value="c" className="pt-4">
          Panel C
        </TabsPanel>
      </Tabs>
      <p className="text-xs text-muted-foreground">
        Active: <span className="font-mono">{value}</span>
      </p>
    </div>
  )
}
