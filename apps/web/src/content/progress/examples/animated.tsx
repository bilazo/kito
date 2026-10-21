import { Progress, ProgressLabel, ProgressValue } from '@bilazo/kito/components/progress'
import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 4000
const TICK_MS = 50

export default function Animated() {
  const [value, setValue] = useState(0)
  const [running, setRunning] = useState(true)
  const startedAtRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return

    // Time-based, not tick-based: if the browser throttles the interval (or a
    // tab is backgrounded), progress still advances at the same wall-clock
    // rate instead of slowing down.
    startedAtRef.current ??= performance.now()

    const id = window.setInterval(() => {
      const elapsed = performance.now() - startedAtRef.current!
      const next = Math.min((elapsed / DURATION_MS) * 100, 100)
      setValue(next)
      if (next >= 100) {
        window.clearInterval(id)
        setRunning(false)
      }
    }, TICK_MS)

    return () => window.clearInterval(id)
  }, [running])

  function restart() {
    startedAtRef.current = null
    setValue(0)
    setRunning(true)
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress value={value}>
        <div className="flex items-center justify-between text-sm">
          <ProgressLabel>Uploading…</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>

      <button
        type="button"
        onClick={restart}
        disabled={running}
        className="self-start text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
      >
        {running ? 'Running…' : 'Run again'}
      </button>
    </div>
  )
}
