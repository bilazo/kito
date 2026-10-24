import { Slider } from '@bilazo/kito/components/slider'

export default function Basic() {
  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={33} aria-label="Volume" />
    </div>
  )
}
