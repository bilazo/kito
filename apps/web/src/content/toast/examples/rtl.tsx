import { Button } from '@bilazo/kito/components/button'
import { toast } from '@bilazo/kito/components/toast'

async function fakeSave(succeed: boolean): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1500)
  })
  if (!succeed) throw new Error('Save failed')
}

export default function Rtl() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast('تغییرات شما ذخیره شد.')}>نمایش اعلان</Button>

      <Button variant="outline" onClick={() => toast.success('با موفقیت ذخیره شد')}>
        موفقیت
      </Button>

      <Button variant="outline" onClick={() => toast.error('خطا در ذخیره‌سازی')}>
        خطا
      </Button>

      <Button variant="outline" onClick={() => toast.warning('این عمل قابل بازگشت نیست')}>
        هشدار
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: 'آیا مطمئن هستید؟',
            description: 'این عمل قابل بازگشت نیست.',
            action: {
              label: 'بازگشت',
              onClick: () => toast.success('بازیابی شد'),
            },
          })
        }
      >
        حذف
      </Button>

      <Button
        onClick={() =>
          toast.promise(fakeSave(true), {
            loading: 'در حال ذخیره سازی...',
            success: 'ذخیره شد',
            error: 'ذخیره انجام نشد',
          })
        }
      >
        ثبت (موفق)
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast.promise(fakeSave(false), {
            loading: 'در حال ذخیره سازی...',
            success: 'ذخیره شد',
            error: 'ذخیره انجام نشد',
          })
        }
      >
        ثبت (ناموفق)
      </Button>
    </div>
  )
}
