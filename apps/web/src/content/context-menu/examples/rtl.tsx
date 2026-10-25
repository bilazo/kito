import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubPopup,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'
import { Copy, Link, Mail, Pencil, Share2, Trash2 } from 'lucide-react'

export default function Rtl() {
  return (
    <div className="flex flex-col gap-6">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
          برای دیدن منو، اینجا راست‌کلیک کنید
        </ContextMenuTrigger>
        <ContextMenuPopup dir="rtl" className="w-48">
          <ContextMenuGroup>
            <ContextMenuGroupLabel>ویرایش</ContextMenuGroupLabel>
            <ContextMenuItem>
              <Pencil />
              تغییر نام
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <Copy />
              تکثیر
              <ContextMenuShortcut>⌘D</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>

          <ContextMenuSeparator />

          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Share2 />
              اشتراک‌گذاری
            </ContextMenuSubTrigger>
            <ContextMenuSubPopup dir="rtl" side="left">
              <ContextMenuItem>
                <Mail />
                ایمیل
              </ContextMenuItem>
              <ContextMenuItem>
                <Link />
                کپی لینک
              </ContextMenuItem>
            </ContextMenuSubPopup>
          </ContextMenuSub>

          <ContextMenuSeparator />

          <ContextMenuItem variant="destructive">
            <Trash2 />
            حذف
          </ContextMenuItem>
        </ContextMenuPopup>
      </ContextMenu>
    </div>
  )
}
