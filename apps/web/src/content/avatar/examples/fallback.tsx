import { Avatar, AvatarFallback, AvatarImage } from '@bilazo/kito/components/avatar'

export default function Fallback() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage src="https://example.invalid/broken.png" alt="Broken" />
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    </div>
  )
}
