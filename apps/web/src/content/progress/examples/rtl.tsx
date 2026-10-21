import { Progress, ProgressLabel, ProgressValue } from '@bilazo/kito/components/progress'

export default function Rtl() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress value={57} locale="fa-IR" variant="primary">
        <div className="flex items-center justify-between text-sm">
          <ProgressLabel>پیشرفت هفتگی</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>

      <Progress value={42} locale="fa-IR" variant="highlight" size="lg">
        <div className="flex items-center justify-between text-sm">
          <ProgressLabel>روند این ماه</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">اندازه‌ها</p>
        <Progress value={30} locale="fa-IR" size="sm" aria-label="کوچک" />
        <Progress value={60} locale="fa-IR" size="md" aria-label="متوسط" />
        <Progress value={90} locale="fa-IR" size="lg" aria-label="بزرگ" />
      </div>

      <Progress value={null} locale="fa-IR" variant="highlight">
        <ProgressLabel>در حال بارگذاری…</ProgressLabel>
      </Progress>
    </div>
  )
}
