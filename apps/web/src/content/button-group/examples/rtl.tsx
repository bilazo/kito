import { Button } from '@bilazo/kito/components/button'
import { ButtonGroup, ButtonGroupSeparator } from '@bilazo/kito/components/button-group'
import { Bold, ChevronDown, Italic, Underline } from 'lucide-react'

export default function Rtl() {
  return (
    <div className="flex flex-col gap-6">
      <ButtonGroup aria-label="قالب‌بندی متن">
        <Button variant="outline" size="icon" aria-label="درشت">
          <Bold />
        </Button>
        <Button variant="outline" size="icon" aria-label="کج">
          <Italic />
        </Button>
        <Button variant="outline" size="icon" aria-label="زیرخط">
          <Underline />
        </Button>
      </ButtonGroup>

      <ButtonGroup aria-label="ذخیره">
        <Button variant="primary">ذخیره</Button>
        <ButtonGroupSeparator />
        <Button variant="primary" size="icon" aria-label="گزینه‌های بیشتر">
          <ChevronDown />
        </Button>
      </ButtonGroup>
    </div>
  )
}
