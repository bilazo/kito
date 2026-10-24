import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@bilazo/kito/components/avatar'

const users = [
  { id: 1, initials: 'CN' },
  { id: 2, initials: 'ML' },
  { id: 3, initials: 'ER' },
  { id: 4, initials: 'AK' },
  { id: 5, initials: 'SR' },
]

export default function GroupWithMax() {
  return (
    <AvatarGroup max={3}>
      {users.map((user) => (
        <Avatar key={user.id}>
          <AvatarImage src={`https://github.com/user${user.id}.png`} alt={user.initials} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}
