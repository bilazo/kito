import { Item, ItemContent, ItemDescription, ItemTitle } from '@bilazo/kito/components/item'

const variants = ['default', 'outline', 'muted'] as const

export default function Variants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {variants.map((variant) => (
        <Item key={variant} variant={variant}>
          <ItemContent>
            <ItemTitle>Variant: {variant}</ItemTitle>
            <ItemDescription>
              {variant === 'default' && 'Transparent — sits flat on the surface.'}
              {variant === 'outline' && 'Bordered — separates items in a list.'}
              {variant === 'muted' && 'Soft filled — good for selected or hover states.'}
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}
