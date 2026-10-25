// oxlint-disable jsx-a11y/anchor-is-valid
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@bilazo/kito/components/navigation-menu'
import { CircleAlertIcon, CircleCheckIcon, CircleDashedIcon } from 'lucide-react'

export default function Rtl() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-border p-4">
        <NavigationMenu dir="rtl" align="end">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>محصولات</NavigationMenuTrigger>
              <NavigationMenuContent dir="rtl">
                <div className="grid w-64 gap-1">
                  <NavigationMenuLink href="/analytics">
                    <div className="flex flex-col">
                      <span className="font-medium">تحلیل‌ها</span>
                      <span className="text-xs text-muted-foreground">داشبورد ترافیک و تبدیل.</span>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/reports">
                    <div className="flex flex-col">
                      <span className="font-medium">گزارش‌ها</span>
                      <span className="text-xs text-muted-foreground">خروجی‌های زمان‌بندی‌شده.</span>
                    </div>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>با آیکون</NavigationMenuTrigger>
              <NavigationMenuContent dir="rtl">
                <ul className="grid w-50">
                  <li>
                    <NavigationMenuLink
                      render={
                        <a href="#" className="flex-row items-center gap-2">
                          <CircleAlertIcon />
                          بک لاگ
                        </a>
                      }
                    />
                    <NavigationMenuLink
                      render={
                        <a href="#" className="flex-row items-center gap-2">
                          <CircleDashedIcon />
                          لیست کارها
                        </a>
                      }
                    />
                    <NavigationMenuLink
                      render={
                        <a href="#" className="flex-row items-center gap-2">
                          <CircleCheckIcon />
                          انجام شده
                        </a>
                      }
                    />
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <a href="/pricing" className={navigationMenuTriggerStyle()}>
                قیمت‌گذاری
              </a>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <a href="/docs" className={navigationMenuTriggerStyle()}>
                مستندات
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <p className="text-xs text-muted-foreground">
        پنل از لبه‌ی راست trigger (start در RTL) باز می‌شود — بدون هیچ کد اضافه‌ای.
      </p>
    </div>
  )
}
