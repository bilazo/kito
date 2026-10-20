import { DirectionProvider as BaseDirectionProvider } from '@base-ui/react/direction-provider'

import type * as React from 'react'

/**
 * Re-export of Base UI's `useDirection` hook.
 *
 * Reads the current direction from the nearest `DirectionProvider` (or the
 * closest `dir` attribute on an ancestor element). Use it inside any
 * component that must flip its layout or behavior based on text direction.
 */
export { useDirection } from '@base-ui/react/direction-provider'

export interface DirectionProviderProps {
  /**
   * The text direction applied to the subtree.
   *
   * - `ltr` — left-to-right (English, most Latin-script languages)
   * - `rtl` — right-to-left (Arabic, Hebrew, Persian)
   */
  direction: 'ltr' | 'rtl'

  /** The content to render inside the provider. */
  children: React.ReactNode
}

/**
 * Sets the text direction (`ltr` or `rtl`) for a subtree.
 *
 * Most apps set `<html dir="rtl">` once and forget it — every component
 * picks the direction up from the DOM. `DirectionProvider` is for scoping
 * RTL to a **portion** of the page: a preview pane, an embedded chat in an
 * RTL host, a docs site showing mixed directions.
 *
 * Base UI components (Slider, Menu, Popover, Select, …) read the direction
 * from this provider when present, and fall back to the closest `dir`
 * attribute on an ancestor otherwise.
 */
export function DirectionProvider({ direction, children }: DirectionProviderProps) {
  return <BaseDirectionProvider direction={direction}>{children}</BaseDirectionProvider>
}
