import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from '@bilazo/kito/components/avatar'

const users = [
  { id: 1, initials: 'س.ر' },
  { id: 2, initials: 'م.ل' },
  { id: 3, initials: 'ع.ک' },
  { id: 4, initials: 'ن.ح' },
  { id: 5, initials: 'ا.ف' },
]

export default function Rtl() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end gap-6">
        <Avatar size="sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="کاربر" />
          <AvatarFallback>س.ر</AvatarFallback>
        </Avatar>
        <Avatar size="md">
          <AvatarImage src="https://github.com/shadcn.png" alt="کاربر" />
          <AvatarFallback>س.ر</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>س.ر</AvatarFallback>
        </Avatar>
        <Avatar size="xl">
          <AvatarImage src="https://github.com/shadcn.png" alt="کاربر" />
          <AvatarFallback>س.ر</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex items-center gap-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="آنلاین" />
          <AvatarFallback>آن</AvatarFallback>
          <AvatarBadge status="online" />
        </Avatar>
        <Avatar>
          <AvatarFallback>آف</AvatarFallback>
          <AvatarBadge status="offline" />
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="مشغول" />
          <AvatarFallback>مش</AvatarFallback>
          <AvatarBadge status="busy" />
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="دور" />
          <AvatarFallback>دو</AvatarFallback>
          <AvatarBadge status="away" />
        </Avatar>
      </div>

      <AvatarGroup max={3}>
        {users.map((user) => (
          <Avatar key={user.id}>
            <AvatarImage src={`https://github.com/user${user.id}.png`} alt={user.initials} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  )
}
