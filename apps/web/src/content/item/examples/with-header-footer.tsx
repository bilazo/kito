import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@bilazo/kito/components/item'
import { BookOpen } from 'lucide-react'

export default function WithHeaderFooter() {
  return (
    <div className="w-full max-w-md">
      <Item variant="outline">
        <ItemHeader>
          <span>Lesson</span>
          <span>4 min read</span>
        </ItemHeader>
        <ItemMedia variant="icon">
          <BookOpen />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Travel vocabulary</ItemTitle>
          <ItemDescription>Common phrases for airports, hotels, and restaurants.</ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span>Updated Mar 12</span>
          <span>Beginner</span>
        </ItemFooter>
      </Item>
    </div>
  )
}
