import { Button } from '@bilazo/kito/components/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@bilazo/kito/components/item'
import { FileText } from 'lucide-react'

export default function Basic() {
  return (
    <div className="w-full max-w-md">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileText />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Q3 Report.pdf</ItemTitle>
          <ItemDescription>Updated 2 days ago · 1.4 MB</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Open
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
