import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

const ITEMS = [
  { id: 1, name: 'Wireless keyboard', qty: 2, price: '$89.00' },
  { id: 2, name: 'USB-C hub', qty: 1, price: '$45.00' },
  { id: 3, name: 'Monitor stand', qty: 1, price: '$120.00' },
]

export default function WithFooter() {
  return (
    <div className="w-full max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ITEMS.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.qty}</TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>$254.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
