import { Item, ItemContent, ItemDescription, ItemTitle } from '@bilazo/kito/components/item'

const sizes = ['default', 'sm', 'xs'] as const

export default function Sizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {sizes.map((size) => (
        <Item key={size} size={size} variant="outline">
          <ItemContent>
            <ItemTitle>Size: {size}</ItemTitle>
            <ItemDescription>Row padding and gap shrink with size.</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}
