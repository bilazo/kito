import { Slider } from '@bilazo/kito/components/slider'

export default function Range() {
  return (
    <div className="w-full max-w-sm">
      {/* Array value → two thumbs. */}
      <Slider defaultValue={[25, 75]} aria-label="Price range" />
    </div>
  )
}
