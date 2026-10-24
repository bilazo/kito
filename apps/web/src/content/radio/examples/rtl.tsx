import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

export default function Rtl() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">عمودی (پیش‌فرض)</p>
        <RadioGroup defaultValue="medium" aria-label="سطح">
          <div className="flex items-center gap-2">
            <Radio value="beginner" id="rtl-basic-1" />
            <Label htmlFor="rtl-basic-1">مبتدی</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio value="medium" id="rtl-basic-2" />
            <Label htmlFor="rtl-basic-2">متوسط</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio value="advanced" id="rtl-basic-3" />
            <Label htmlFor="rtl-basic-3">پیشرفته</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">افقی</p>
        <RadioGroup defaultValue="credit" orientation="horizontal" aria-label="روش پرداخت">
          <div className="flex items-center gap-2">
            <Radio value="credit" id="rtl-h-credit" />
            <Label htmlFor="rtl-h-credit">کارت اعتباری</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio value="paypal" id="rtl-h-paypal" />
            <Label htmlFor="rtl-h-paypal">پی‌پال</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio value="crypto" id="rtl-h-crypto" />
            <Label htmlFor="rtl-h-crypto">رمزارز</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">اندازه‌ها</p>
        <RadioGroup defaultValue="a" size="sm" aria-label="کوچک">
          <div className="flex items-center gap-2">
            <Radio value="a" id="rtl-sm-a" />
            <Label htmlFor="rtl-sm-a">کوچک</Label>
          </div>
        </RadioGroup>
        <RadioGroup defaultValue="a" size="md" aria-label="متوسط">
          <div className="flex items-center gap-2">
            <Radio value="a" id="rtl-md-a" />
            <Label htmlFor="rtl-md-a">متوسط</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">حالت‌ها</p>
        <RadioGroup defaultValue="a" aria-label="غیرفعال">
          <div className="flex items-center gap-2">
            <Radio value="a" id="rtl-d-a" disabled />
            <Label htmlFor="rtl-d-a">غیرفعال (انتخاب‌شده)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio value="b" id="rtl-d-b" disabled />
            <Label htmlFor="rtl-d-b">غیرفعال</Label>
          </div>
        </RadioGroup>
        <RadioGroup aria-label="نامعتبر">
          <div className="flex items-center gap-2">
            <Radio value="a" id="rtl-i-a" aria-invalid />
            <Label htmlFor="rtl-i-a">گزینه نامعتبر</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
