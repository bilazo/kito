import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import type { ReactNode } from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'

export interface Preferences {
  theme: ThemePreference
  /** Corner radius in rem. */
  radius: number
  /** Hue channel (0–360) for the brand color scale. */
  brandHue: number
  /** Multiplier for every --control-* height. */
  controlScale: number
}

const DEFAULTS: Preferences = {
  theme: 'system',
  radius: 0.625,
  brandHue: 149.2,
  controlScale: 1,
}

const STORAGE_KEY = 'kito-docs-preferences'

function load(): Preferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Preferences>) }
  } catch {
    return DEFAULTS
  }
}

function save(prefs: Preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    /* localStorage can be disabled — ignore. */
  }
}

/**
 * Push every preference value to the document root as an inline style, so
 * it overrides the values from `defaults.css` without a rebuild.
 *
 * The library tokens we touch:
 * - `--radius`           — corner roundness
 * - `--brand-hue`        — hue channel of the brand scale
 * - `--control-scale`    — multiplier for --control-sm/md/lg
 *
 * The library must declare each of these in `:root` (with a sane default)
 * for the override to have something to replace.
 */
function apply(prefs: Preferences) {
  const root = document.documentElement

  // Theme — toggles the `.dark` class.
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = prefs.theme === 'dark' || (prefs.theme === 'system' && prefersDark)
  root.classList.toggle('dark', isDark)

  // Token overrides.
  root.style.setProperty('--radius', `${prefs.radius}rem`)
  root.style.setProperty('--brand-hue', String(prefs.brandHue))
  root.style.setProperty('--control-scale', String(prefs.controlScale))
}

interface PreferencesContextValue {
  prefs: Preferences
  setPrefs: (next: Preferences) => void
  set: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void
  reset: () => void
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefsState, setPrefsState] = useState<Preferences>(() => load())

  // Apply on every change.
  useEffect(() => {
    apply(prefsState)
    save(prefsState)
  }, [prefsState])

  // When following the system theme, listen for OS changes.
  useEffect(() => {
    if (prefsState.theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => apply(prefsState)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [prefsState])

  const setPrefs = useCallback((next: Preferences) => setPrefsState(next), [])

  const set = useCallback(<K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPrefsState((p) => ({ ...p, [key]: value }))
  }, [])

  const reset = useCallback(() => setPrefsState(DEFAULTS), [])

  const value = useMemo(
    () => ({ prefs: prefsState, setPrefs, set, reset }),
    [prefsState, setPrefs, set, reset],
  )

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

// oxlint-disable-next-line react-refresh/only-export-components
export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) {
    throw new Error('usePreferences must be used within PreferencesProvider')
  }
  return ctx
}
