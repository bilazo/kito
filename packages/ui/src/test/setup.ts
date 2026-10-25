import '@testing-library/jest-dom/vitest'

/*
 * jsdom does not implement ResizeObserver. Components that measure their
 * own layout (ScrollArea, and Base UI's positioners) need it. This stub
 * fires no callbacks — the size is always reported as 0x0 — which is
 * enough for tests that do not assert on computed layout.
 */
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (globalThis.ResizeObserver === undefined) {
  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver
}

// jsdom does not implement Element.prototype.getAnimations. Base UI calls
// it from getFiniteAnimations() when checking finite transitions/animations
// (e.g. ScrollAreaViewport schedules this in a setTimeout). Without the
// polyfill, the error surfaces as an unhandled rejection and can leave
// subcomponents un-mounted.
if (!Element.prototype.getAnimations) {
  // oxlint-disable-next-line unicorn/consistent-function-scoping
  Element.prototype.getAnimations = function getAnimations() {
    return []
  }
}
