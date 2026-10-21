import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'

export default function PrefixSuffix() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>vatyar.com/</InputGroupAddon>
        <InputGroupInput placeholder="username" aria-label="Username" />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="0" inputMode="numeric" aria-label="Amount" dir="auto" />
        <InputGroupAddon align="inline-end">تومان</InputGroupAddon>
      </InputGroup>
    </div>
  )
}
