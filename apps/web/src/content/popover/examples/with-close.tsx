import { Button } from '@bilazo/kito/components/button'
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export default function WithClose() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>What is this?</PopoverTrigger>
      <PopoverPopup className="w-96">
        <div className="flex items-start justify-between gap-4">
          <PopoverHeader>
            <PopoverTitle>Real-time sync</PopoverTitle>
            <PopoverDescription>
              Changes propagate instantly across every open session.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverClose render={<Button variant="ghost" size="icon-sm" aria-label="Dismiss" />}>
            <XIcon />
          </PopoverClose>
        </div>
        <p className="text-sm text-muted-foreground">
          Sync uses WebSocket for active sessions and falls back to polling when the network is
          unstable.
        </p>
      </PopoverPopup>
    </Popover>
  )
}
