import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

const ROWS = [
  { id: 1, name: 'Project Apollo', selected: false },
  { id: 2, name: 'Project Borealis', selected: true },
  { id: 3, name: 'Project Castor', selected: false },
]

export default function SelectedRow() {
  return (
    <div className="w-full max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row) => (
            <TableRow key={row.id} data-state={row.selected ? 'selected' : undefined}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.selected ? 'Active' : 'Archived'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
