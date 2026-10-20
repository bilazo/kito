import { Button } from '@bilazo/kito/components/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@bilazo/kito/components/card'
import { MoreHorizontal, TrendingUp } from 'lucide-react'

export default function Rtl() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>پروژه‌ی جدید</CardTitle>
          <CardDescription>خلاصه‌ای از وضعیت فعلی پروژه</CardDescription>
          <CardAction>
            <Button variant="ghost" size="icon-sm" aria-label="گزینه‌های بیشتر">
              <MoreHorizontal />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            کارت‌ها یک واحد محتوایی متمرکز را در خود نگه می‌دارند: عنوان، توضیحات، بدنه و اکشن‌های
            پاورقی.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">ادامه</Button>
          <Button size="sm" variant="ghost">
            انصراف
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>کلمات آموخته‌شده</CardDescription>
          <CardTitle render={<div />} className="text-3xl">
            ۱٬۲۴۸
          </CardTitle>
          <CardAction>
            <div className="rounded-lg bg-primary-soft p-2 text-primary-soft-foreground">
              <TrendingUp className="size-5" />
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">۱۲٪ بیشتر از هفته‌ی گذشته</p>
        </CardContent>
      </Card>
    </div>
  )
}
