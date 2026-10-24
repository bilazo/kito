import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@bilazo/kito/components/avatar'

export default function WithBadge() {
  return (
    <div className="flex items-center gap-6">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Online" />
        <AvatarFallback>ON</AvatarFallback>
        <AvatarBadge status="online" />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Offline" />
        <AvatarFallback>OF</AvatarFallback>
        <AvatarBadge status="offline" />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Busy" />
        <AvatarFallback>BU</AvatarFallback>
        <AvatarBadge status="busy" />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Away" />
        <AvatarFallback>AW</AvatarFallback>
        <AvatarBadge status="away" />
      </Avatar>
    </div>
  )
}
