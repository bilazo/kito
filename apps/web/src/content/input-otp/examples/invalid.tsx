import { InputOTP, InputOTPSlot } from '@bilazo/kito/components/input-otp'

export default function Invalid() {
  return (
    <div className="flex flex-col gap-3">
      <InputOTP length={6} defaultValue="000000">
        {Array.from({ length: 6 }, (_, index) => (
          <InputOTPSlot key={index} aria-invalid />
        ))}
      </InputOTP>
      <p className="text-xs text-destructive">The code is incorrect. Try again.</p>
    </div>
  )
}
