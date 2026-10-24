import { Avatar, AvatarFallback, AvatarImage } from '@bilazo/kito/components/avatar'

export default function Basic() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
