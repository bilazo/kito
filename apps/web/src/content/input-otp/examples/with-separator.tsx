import { InputOTP, InputOTPGroup, InputOTPSeparator } from '@bilazo/kito/components/input-otp'

export default function WithSeparator() {
  return (
    <InputOTP length={6}>
      <InputOTPGroup count={3} />
      <InputOTPSeparator />
      <InputOTPGroup count={3} />
    </InputOTP>
  )
}
