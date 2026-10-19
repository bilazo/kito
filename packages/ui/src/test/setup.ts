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
