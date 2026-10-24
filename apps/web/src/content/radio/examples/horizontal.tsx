import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

export default function Horizontal() {
  return (
    <RadioGroup defaultValue="credit" orientation="horizontal" aria-label="Payment method">
      <div className="flex items-center gap-2">
        <Radio value="credit" id="h-credit" />
        <Label htmlFor="h-credit">Credit card</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="paypal" id="h-paypal" />
        <Label htmlFor="h-paypal">PayPal</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="crypto" id="h-crypto" />
        <Label htmlFor="h-crypto">Crypto</Label>
      </div>
    </RadioGroup>
  )
}
