import { Separator } from '@bilazo/kito/components/separator'

export default function Variants() {
  return (
    <div className="w-full max-w-sm space-y-6 text-sm">
      <div className="space-y-2">
        <p className="text-muted-foreground">Solid</p>
        <Separator variant="solid" />
      </div>
      <div className="space-y-2">
        <p className="text-muted-foreground">Dashed</p>
        <Separator variant="dashed" />
      </div>
      <div className="space-y-2">
        <p className="text-muted-foreground">Dotted</p>
        <Separator variant="dotted" />
      </div>
    </div>
  )
}
