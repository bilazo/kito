import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@bilazo/kito/components/avatar'

const users = [
  { id: 1, src: 'https://github.com/shadcn.png', initials: 'CN' },
  { id: 2, src: 'https://github.com/maxleiter.png', initials: 'ML' },
  { id: 3, src: 'https://github.com/evilrabbit.png', initials: 'ER' },
]

export default function Group() {
  return (
    <AvatarGroup>
      {users.map((user) => (
        <Avatar key={user.id}>
          <AvatarImage src={user.src} alt={user.initials} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}
