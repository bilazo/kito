import { Slider } from '@bilazo/kito/components/slider'

export default function Vertical() {
  return (
    <div className="flex h-64 items-end gap-8">
      <Slider orientation="vertical" defaultValue={25} aria-label="Low" />
      <Slider orientation="vertical" defaultValue={50} aria-label="Medium" />
      <Slider orientation="vertical" defaultValue={75} aria-label="High" />
    </div>
  )
}
