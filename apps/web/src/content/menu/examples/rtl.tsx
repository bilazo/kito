import { Button } from '@bilazo/kito/components/button'
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuLinkItem,
  MenuPopup,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from '@bilazo/kito/components/menu'
import { BookOpen, Copy, Download, HelpCircle, Mail, Share2, Trash2, User } from 'lucide-react'

export default function Rtl() {
  return (
    <div className="flex flex-wrap gap-2">
      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>عملیات</MenuTrigger>
        <MenuPopup dir="rtl" side="right" className="w-56">
          <MenuItem>
            <User />
            پروفایل
            <MenuShortcut>⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem>
            <Copy />
            تکثیر
          </MenuItem>
          <MenuSeparator />
          <MenuItem variant="destructive">
            <Trash2 />
            حذف
          </MenuItem>
        </MenuPopup>
      </Menu>

      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>اشتراک‌گذاری</MenuTrigger>
        <MenuPopup dir="rtl" className="w-56">
          <MenuItem>
            <Download />
            دانلود
          </MenuItem>
          <MenuSub>
            <MenuSubTrigger>
              <Share2 />
              اشتراک‌گذاری
            </MenuSubTrigger>
            {/*
              Side is physical — pass "left" so the submenu opens on the
              physical left in RTL. The chevron on MenuSubTrigger flips via
              `rtl:-scale-x-100` to match.
            */}
            <MenuSubPopup dir="rtl" side="left">
              <MenuItem>
                <Mail />
                ایمیل
              </MenuItem>
              <MenuItem>
                <Copy />
                کپی لینک
              </MenuItem>
            </MenuSubPopup>
          </MenuSub>
          <MenuSeparator />
          <MenuItem>خروجی…</MenuItem>
        </MenuPopup>
      </Menu>

      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>راهنما</MenuTrigger>
        <MenuPopup dir="rtl" side="left" className="w-56">
          <MenuGroup>
            <MenuGroupLabel>منابع</MenuGroupLabel>
            <MenuLinkItem href="/docs">
              <BookOpen />
              مستندات
            </MenuLinkItem>
            <MenuLinkItem href="/support">
              <HelpCircle />
              پشتیبانی
            </MenuLinkItem>
          </MenuGroup>
        </MenuPopup>
      </Menu>
    </div>
  )
}
