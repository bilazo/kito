import { Kbd, KbdGroup } from '@bilazo/kito/components/kbd'

export default function Rtl() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border p-4 text-sm">
      <p className="flex items-center gap-2">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <span className="text-muted-foreground">پالت فرمان را باز کن</span>
      </p>
      <p className="flex items-center gap-2">
        برای ذخیره، <Kbd>Ctrl</Kbd> <Kbd>S</Kbd> را بزنید.
      </p>
      <p className="flex items-center gap-2">
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
        <span className="text-muted-foreground">تغییر پروژه</span>
      </p>
    </div>
  )
}
