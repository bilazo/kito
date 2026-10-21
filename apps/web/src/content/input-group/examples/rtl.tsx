import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Search } from 'lucide-react'

export default function Rtl() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="جستجوی درس…" aria-label="جستجو" />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="نام کاربری" aria-label="نام کاربری" />
        <InputGroupAddon dir="ltr">vatyar.com/</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="۰" inputMode="numeric" aria-label="مبلغ" />
        <InputGroupAddon align="inline-end">تومان</InputGroupAddon>
      </InputGroup>
    </div>
  )
}
