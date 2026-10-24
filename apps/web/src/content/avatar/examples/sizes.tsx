import { Avatar, AvatarFallback, AvatarImage } from '@bilazo/kito/components/avatar'

const sizes = ['sm', 'md', 'lg', 'xl'] as const

export default function Sizes() {
  return (
    <div className="flex items-end gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar size={size}>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-mono text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  )
}
