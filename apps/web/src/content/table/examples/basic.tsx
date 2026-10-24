import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

const STUDENTS = [
  { id: 1, name: 'Alice Johnson', level: 'Advanced', joined: '2024-03-12' },
  { id: 2, name: 'Bob Smith', level: 'Beginner', joined: '2024-05-08' },
  { id: 3, name: 'Carol Wu', level: 'Intermediate', joined: '2024-06-21' },
]

export default function Basic() {
  return (
    <div className="w-full max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {STUDENTS.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.level}</TableCell>
              <TableCell className="text-muted-foreground">{student.joined}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
