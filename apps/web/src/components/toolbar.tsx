import { Button } from '@bilazo/kito/components/button'
import { Moon, Settings, Sun } from 'lucide-react'

import { usePreferences } from '@/lib/preferences'

interface ToolbarProps {
  onOpenSettings: () => void
}

/**
 * The docs chrome at the top of the content area. Sticky, blurred on
 * scroll. Holds the app title, a quick light/dark toggle, and a button that
 * opens the token settings sheet.
 */
export function Toolbar({ onOpenSettings }: ToolbarProps) {
  const { prefs, set } = usePreferences()

  const isDark =
    prefs.theme === 'dark' ||
    (prefs.theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  function toggleTheme() {
    set('theme', isDark ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">Kito</span>
          <span className="text-xs text-muted-foreground">Design System</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggleTheme}
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Open token settings"
            onClick={onOpenSettings}
          >
            <Settings />
          </Button>
        </div>
      </div>
    </header>
  )
}
