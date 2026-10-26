import { InputOTP } from '@bilazo/kito/components/input-otp'

const sizes = ['sm', 'md', 'lg'] as const

export default function Sizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {sizes.map((size) => (
        <InputOTP length={6} key={size} size={size} />
      ))}
    </div>
  )
}
