// oxlint-disable no-promise-executor-return unicorn/consistent-function-scoping
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

/* -------------------------------------------------------------------------- */
/* ResizeObserver stub (existing)                                              */
/* -------------------------------------------------------------------------- */
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (globalThis.ResizeObserver === undefined) {
  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver
}

/* -------------------------------------------------------------------------- */
/* getAnimations stub (existing)                                               */
/* -------------------------------------------------------------------------- */
if (!Element.prototype.getAnimations) {
  Element.prototype.getAnimations = function getAnimations() {
    return []
  }
}

/* -------------------------------------------------------------------------- */
/* RAF → setTimeout(0)                                                         */
/*                                                                             */
/* jsdom's RAF fires on a real frame (~16ms). If a component schedules an     */
/* update via RAF (Base UI does this for measurement), the callback lands     */
/* after the test ends → React warns about `act()`.                            */
/*                                                                             */
/* By routing RAF through setTimeout(0), the callback is a macrotask that     */
/* `userEvent` and our `afterEach` flush can drain deterministically.         */
/* -------------------------------------------------------------------------- */
const originalRAF = globalThis.requestAnimationFrame
const originalCAF = globalThis.cancelAnimationFrame

globalThis.requestAnimationFrame = ((cb: FrameRequestCallback): number => {
  return setTimeout(() => cb(performance.now()), 0) as unknown as number
}) as typeof requestAnimationFrame

globalThis.cancelAnimationFrame = ((id: number): void => {
  clearTimeout(id as unknown as NodeJS.Timeout)
}) as typeof cancelAnimationFrame

/* -------------------------------------------------------------------------- */
/* afterEach: flush pending async work, then cleanup                          */
/*                                                                             */
/* Order matters: cleanup() unmounts, which triggers Base UI's own cleanup    */
/* effects (cancel RAF, disconnect RO). Doing the flush AFTER cleanup         */
/* ensures we drain anything that was scheduled during unmount.               */
/* -------------------------------------------------------------------------- */
afterEach(async () => {
  cleanup()
  // Let pending setTimeout(0)/RAF callbacks run and any resulting
  // state updates land inside React's act() context.
  await new Promise((resolve) => setTimeout(resolve, 0))
  await new Promise((resolve) => setTimeout(resolve, 0))
})

// Keep originals around in case some test needs real RAF.
export const realRAF = originalRAF
export const realCAF = originalCAF
