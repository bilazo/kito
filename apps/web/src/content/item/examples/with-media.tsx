import { Avatar, AvatarFallback } from '@bilazo/kito/components/avatar'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@bilazo/kito/components/item'
import { Image, Zap } from 'lucide-react'

export default function WithMedia() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {/* Icon */}
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Zap />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Automations</ItemTitle>
          <ItemDescription>Rules that run when an event fires.</ItemDescription>
        </ItemContent>
      </Item>

      {/* Avatar */}
      <Item variant="outline">
        <ItemMedia>
          <Avatar size="md">
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Alice Lee</ItemTitle>
          <ItemDescription>alice@example.com</ItemDescription>
        </ItemContent>
      </Item>

      {/* Image */}
      <Item variant="outline">
        <ItemMedia variant="image">
          <img
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=80&h=80&fit=crop"
            alt=""
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            <Image className="size-3.5" />
            cover.jpg
          </ItemTitle>
          <ItemDescription>Hero image for the landing page.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
