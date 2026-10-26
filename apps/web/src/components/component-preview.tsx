import { Button } from '@bilazo/kito/components/button'
import { DirectionProvider } from '@bilazo/kito/components/direction'
import { cn } from 'cn'
import { ArrowLeftRight, Code2, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

import { CodeBlock } from './code-block'

import type { ComponentType } from 'react'

const examples = import.meta.glob<{ default: ComponentType }>('../content/**/examples/*.tsx', {
  eager: true,
})
const raw = import.meta.glob<string>('../content/**/examples/*.tsx', {
  eager: true,
  query: '?raw',
  import: 'default',
})

type Direction = 'ltr' | 'rtl'

export interface ComponentPreviewProps {
  /** Example folder/file identifier, e.g. `button/basic`. */
  name: string
  /** Shiki language. Defaults to `tsx`. */
  lang?: string
}

/**
 * Renders a live example with an optional code panel.
 */
export function ComponentPreview({ name, lang = 'tsx' }: ComponentPreviewProps) {
  const [folder, file] = name.split('/')
  const key = `../content/${folder}/examples/${file}.tsx`
  const mod = examples[key]
  const code = raw[key]

  const [codeOpen, setCodeOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [direction, setDirection] = useState<Direction>(file === 'rtl' ? 'rtl' : 'ltr')

  if (!mod) {
    return (
      <div className="my-6 rounded-lg border border-destructive/40 p-4 text-sm text-destructive">
        Example "{name}" not found.
      </div>
    )
  }

  const Demo = mod.default
  const isRtl = direction === 'rtl'
  const showRtlToggle = file !== 'rtl'

  return (
    <div
      className="not-prose my-6 overflow-hidden rounded-xl border border-border"
      data-folder={folder}
      data-file={file}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-end gap-0.5 border-b border-border bg-muted/40 px-2 py-1.5">
        <Button
          variant={codeOpen ? 'soft' : 'ghost'}
          size="icon-sm"
          aria-label={codeOpen ? 'Hide code' : 'Show code'}
          aria-pressed={codeOpen}
          onClick={() => setCodeOpen((v) => !v)}
        >
          <Code2 />
        </Button>

        {showRtlToggle && (
          <Button
            variant={isRtl ? 'soft' : 'ghost'}
            size="icon-sm"
            aria-label={isRtl ? 'Switch to LTR' : 'Switch to RTL'}
            aria-pressed={isRtl}
            onClick={() => setDirection(isRtl ? 'ltr' : 'rtl')}
          >
            <ArrowLeftRight />
          </Button>
        )}

        {/* <Button
          variant={dark ? 'soft' : 'ghost'}
          size="icon-sm"
          aria-label={dark ? 'Light preview' : 'Dark preview'}
          aria-pressed={dark}
          className="[html.dark_&]:hidden"
          onClick={() => setDark((v) => !v)}
        >
          {dark ? <Sun /> : <Moon />}
        </Button> */}
      </div>

      {/* Preview */}
      <DirectionProvider direction={direction}>
        <div
          dir={direction}
          className={cn(
            'flex min-h-20 items-center justify-center bg-background p-8',
            'transition-colors duration-200 motion-reduce:transition-none',
            dark && 'dark',
          )}
        >
          <Demo />
        </div>
      </DirectionProvider>

      {/* Code (animated reveal) */}
      {code && (
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-out',
            'motion-reduce:transition-none',
          )}
          style={{ gridTemplateRows: codeOpen ? '1fr' : '0fr' }}
        >
          <div
            className={cn(
              'overflow-hidden transition-opacity duration-300',
              'motion-reduce:transition-none',
              codeOpen ? 'opacity-100' : 'opacity-0',
            )}
          >
            <CodeBlock code={code} lang={lang} />
          </div>
        </div>
      )}
    </div>
  )
}
