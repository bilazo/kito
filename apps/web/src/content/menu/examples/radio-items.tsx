import { Button } from '@bilazo/kito/components/button'
import {
  Menu,
  MenuGroupLabel,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from '@bilazo/kito/components/menu'
import { useState } from 'react'

export default function RadioControlled() {
  const [size, setSize] = useState<string>('medium')

  return (
    <div className="flex flex-col gap-3">
      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>Text size</MenuTrigger>
        <MenuPopup className="w-40">
          <MenuRadioGroup value={size} onValueChange={(value) => setSize(value as string)}>
            <MenuGroupLabel>Size</MenuGroupLabel>
            <MenuRadioItem value="small">Small</MenuRadioItem>
            <MenuRadioItem value="medium">Medium</MenuRadioItem>
            <MenuRadioItem value="large">Large</MenuRadioItem>
          </MenuRadioGroup>
        </MenuPopup>
      </Menu>

      <p className="text-xs text-muted-foreground">
        Selected: <span className="font-mono">{size}</span>
      </p>
    </div>
  )
}
