import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

export default function Rtl() {
  return (
    <div className="w-full max-w-2xl rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نام</TableHead>
            <TableHead>سطح</TableHead>
            <TableHead>تاریخ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">علی رضایی</TableCell>
            <TableCell>پیشرفته</TableCell>
            <TableCell>۱۴۰۳/۰۳/۱۲</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">سارا احمدی</TableCell>
            <TableCell>مقدماتی</TableCell>
            <TableCell>۱۴۰۳/۰۵/۰۸</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
