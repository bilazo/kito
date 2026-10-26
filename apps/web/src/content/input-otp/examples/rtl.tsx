import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@bilazo/kito/components/input-otp'

export default function Rtl() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">پایه</p>
        <InputOTP length={6} defaultValue="123456" />
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">با جداکننده</p>
        <InputOTP length={6}>
          <InputOTPGroup count={3} />
          <InputOTPSeparator />
          <InputOTPGroup count={3} />
        </InputOTP>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">حالت نامعتبر</p>
        <InputOTP length={6} defaultValue="000000">
          {Array.from({ length: 6 }, (_, index) => (
            <InputOTPSlot key={index} aria-invalid />
          ))}
        </InputOTP>
      </div>
    </div>
  )
}
