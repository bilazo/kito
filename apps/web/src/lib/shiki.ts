import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import bash from 'shiki/langs/bash.mjs'
import css from 'shiki/langs/css.mjs'
import json from 'shiki/langs/json.mjs'
import jsx from 'shiki/langs/jsx.mjs'
import ts from 'shiki/langs/ts.mjs'
import tsx from 'shiki/langs/tsx.mjs'
import darkTheme from 'shiki/themes/github-dark.mjs'
import lightTheme from 'shiki/themes/github-light.mjs'
import getWasm from 'shiki/wasm'

import type { HighlighterCore } from 'shiki/core'

let highlighterPromise: Promise<HighlighterCore> | null = null

/**
 * Lazily create the highlighter. Only the languages used across the docs are
 * bundled; adding a new language means adding its import here.
 */
function getHighlighter(): Promise<HighlighterCore> {
  highlighterPromise ??= createHighlighterCore({
    themes: [lightTheme, darkTheme],
    langs: [bash, css, json, jsx, ts, tsx],
    engine: createOnigurumaEngine(getWasm),
  })
  return highlighterPromise
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  })
}
