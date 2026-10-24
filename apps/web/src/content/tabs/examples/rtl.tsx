import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'
import { Bell, CreditCard, User } from 'lucide-react'

export default function Rtl() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">پیش‌فرض</p>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTab value="overview">نمای کلی</TabsTab>
            <TabsTab value="projects">پروژه‌ها</TabsTab>
            <TabsTab value="account">حساب کاربری</TabsTab>
            <TabsIndicator />
          </TabsList>
          <TabsPanel value="overview" className="pt-4">
            <p className="text-sm text-muted-foreground">آمار فضای کاری و فعالیت‌های اخیر.</p>
          </TabsPanel>
          <TabsPanel value="projects" className="pt-4">
            <p className="text-sm text-muted-foreground">نقاط عطف و مهلت‌های پروژه‌های فعال.</p>
          </TabsPanel>
          <TabsPanel value="account" className="pt-4">
            <p className="text-sm text-muted-foreground">پروفایل، رمز عبور، و تنظیمات اعلان.</p>
          </TabsPanel>
        </Tabs>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">خط‌دار افقی</p>
        <Tabs defaultValue="overview">
          <TabsList variant="line">
            <TabsTab variant="line" value="overview">
              نمای کلی
            </TabsTab>
            <TabsTab variant="line" value="projects">
              پروژه‌ها
            </TabsTab>
            <TabsTab variant="line" value="account">
              حساب کاربری
            </TabsTab>
            <TabsIndicator />
          </TabsList>
          <TabsPanel value="overview" className="pt-4">
            <p className="text-sm text-muted-foreground">محتوای نمای کلی.</p>
          </TabsPanel>
        </Tabs>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">با آیکون‌ها</p>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTab value="account">
              <User />
              حساب
            </TabsTab>
            <TabsTab value="notifications">
              <Bell />
              اعلان‌ها
            </TabsTab>
            <TabsTab value="billing">
              <CreditCard />
              پرداخت
            </TabsTab>
            <TabsIndicator />
          </TabsList>
          <TabsPanel value="account" className="pt-4">
            <p className="text-sm text-muted-foreground">تنظیمات پروفایل.</p>
          </TabsPanel>
        </Tabs>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">عمودی</p>
        <Tabs defaultValue="general" orientation="vertical" className="flex gap-6">
          <TabsList orientation="vertical" className="w-40">
            <TabsTab orientation="vertical" value="general">
              عمومی
            </TabsTab>
            <TabsTab orientation="vertical" value="security">
              امنیت
            </TabsTab>
            <TabsTab orientation="vertical" value="billing">
              پرداخت
            </TabsTab>
            <TabsIndicator />
          </TabsList>
          <div className="flex-1">
            <TabsPanel value="general">
              <p className="text-sm text-muted-foreground">نام نمایشی، منطقه زمانی، زبان.</p>
            </TabsPanel>
            <TabsPanel value="security">
              <p className="text-sm text-muted-foreground">رمز عبور، احراز هویت دو مرحله‌ای.</p>
            </TabsPanel>
            <TabsPanel value="billing">
              <p className="text-sm text-muted-foreground">روش‌های پرداخت و فاکتورها.</p>
            </TabsPanel>
          </div>
        </Tabs>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">خط‌دار عمودی</p>
        <Tabs defaultValue="general" orientation="vertical" className="flex gap-6">
          <TabsList variant="line" orientation="vertical" className="w-40">
            <TabsTab variant="line" orientation="vertical" value="general">
              عمومی
            </TabsTab>
            <TabsTab variant="line" orientation="vertical" value="security">
              امنیت
            </TabsTab>
            <TabsIndicator />
          </TabsList>
          <div className="flex-1">
            <TabsPanel value="general">
              <p className="text-sm text-muted-foreground">محتوای عمومی.</p>
            </TabsPanel>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
