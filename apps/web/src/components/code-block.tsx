import { cn } from 'cn'
import { useEffect, useRef, useState } from 'react'

import { highlightCode } from '@/lib/shiki'

interface CodeBlockProps {
  code: string
  lang?: string
  collapsedHeight?: number
}

export function CodeBlock({ code, lang = 'tsx', collapsedHeight = 500 }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [overflowing, setOverflowing] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Highlight asynchronously; fall back to a plain <pre> until ready.
  useEffect(() => {
    let cancelled = false
    highlightCode(code.trim(), lang).then((result) => {
      if (!cancelled) setHtml(result)
    })
    return () => {
      cancelled = true
    }
  }, [code, lang])

  // Measure whether the rendered code exceeds the collapsed height.
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const measure = () => {
      setOverflowing(el.scrollHeight > collapsedHeight + 8)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [collapsedHeight])

  const isCollapsible = overflowing && !expanded

  return (
    <div className="not-prose relative">
      <div
        ref={contentRef}
        style={isCollapsible ? { maxHeight: collapsedHeight } : undefined}
        className={cn(
          'overflow-hidden text-sm',
          // Shiki output has its own <pre><code>; strip padding to avoid
          // double padding.
          '[&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-4',
          '[&_code]:bg-transparent! [&_code]:font-mono [&_code]:text-xs',
          'bg-muted',
          isCollapsible && 'overflow-y-hidden',
        )}
      >
        {html ? (
          // eslint-disable-next-line react/no-danger -- shiki output, safe
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="m-0 p-4 text-xs">
            <code>{code.trim()}</code>
          </pre>
        )}
      </div>

      {isCollapsible && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-muted to-transparent"
        />
      )}

      {overflowing && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            'text-xs font-medium text-muted-foreground hover:text-foreground',
            'absolute inset-x-0 bottom-0 flex w-full justify-center bg-muted/80 py-2',
            'backdrop-blur-sm transition-colors',
            expanded && 'static',
          )}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}
