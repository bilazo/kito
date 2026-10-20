/**
 * Types whose content is always Latin (emails, URLs, numbers…) → forced LTR
 * inside an RTL page.
 */
const LTR_TYPES = new Set(['email', 'url', 'tel', 'password', 'number'])

/**
 * Text direction default for text-entry controls:
 *
 * - email / url / tel / password / number → `ltr`
 * - everything else → `auto` (follows what the user types: Persian stays
 *   RTL, Latin flips to LTR; empty inherits from the page).
 *
 * Pass an explicit `dir` on the component to override.
 */
export function defaultDir(type?: string | undefined) {
  return type && LTR_TYPES.has(type) ? 'ltr' : 'auto'
}
