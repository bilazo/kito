import { Separator } from '@bilazo/kito/components/separator'

export default function Vertical() {
  return (
    <div className="flex h-8 items-center gap-4 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Blog</span>
      <Separator orientation="vertical" />
      <span>About</span>
    </div>
  )
}
