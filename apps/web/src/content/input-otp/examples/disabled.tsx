import { InputOTP } from '@bilazo/kito/components/input-otp'

export default function Disabled() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Enabled</p>
        <InputOTP length={6} defaultValue="123456" />
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Disabled</p>
        <InputOTP length={6} defaultValue="123456" disabled />
      </div>
    </div>
  )
}
