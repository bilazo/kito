import { Button } from '@bilazo/kito/components/button'
import { DirectionProvider } from '@bilazo/kito/components/direction'

export default function Scoped() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">LTR (default)</p>
        <div className="flex gap-2">
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>

      <DirectionProvider direction="rtl">
        <div dir="rtl" className="space-y-2">
          <p className="text-xs text-muted-foreground">RTL via DirectionProvider</p>
          <div className="flex gap-2">
            <Button>ذخیره</Button>
            <Button variant="outline">انصراف</Button>
          </div>
        </div>
      </DirectionProvider>
    </div>
  )
}
