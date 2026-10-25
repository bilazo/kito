import { Button } from '@bilazo/kito/components/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@bilazo/kito/components/item'
import { Bell, FileText, Lock, Palette } from 'lucide-react'

const SETTINGS = [
  {
    id: 'notifications',
    icon: <Bell />,
    title: 'اعلان‌ها',
    description: 'انتخاب کنید که چگونه می‌خواهید از ما بشنوید.',
    action: 'مدیریت',
  },
  {
    id: 'appearance',
    icon: <Palette />,
    title: 'ظاهر',
    description: 'تم و چیدمان فضای کاری شما.',
    action: 'تغییر',
  },
  {
    id: 'security',
    icon: <Lock />,
    title: 'امنیت',
    description: 'احراز هویت دو مرحله‌ای و نشست‌ها.',
    action: 'بررسی',
  },
]

export default function Rtl() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileText />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>گزارش سه‌ماهه.pdf</ItemTitle>
          <ItemDescription>۲ روز پیش به‌روزرسانی شد · ۱.۴ مگابایت</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            باز کن
          </Button>
        </ItemActions>
      </Item>

      <ItemGroup>
        {SETTINGS.map((s) => (
          <Item key={s.id} variant="outline">
            <ItemMedia variant="icon">{s.icon}</ItemMedia>
            <ItemContent>
              <ItemTitle>{s.title}</ItemTitle>
              <ItemDescription>{s.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                {s.action}
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>

      <Item size="sm" variant="muted">
        <ItemContent>
          <ItemTitle>ردیف فشرده</ItemTitle>
          <ItemDescription>padding و gap با size کوچک‌تر می‌شوند.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
