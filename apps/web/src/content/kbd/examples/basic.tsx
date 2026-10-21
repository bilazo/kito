import { Kbd } from '@bilazo/kito/components/kbd'

export default function Basic() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <p className="flex items-center gap-2">
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette.
      </p>
      <p className="flex items-center gap-2">
        Save with <Kbd>Ctrl</Kbd> <Kbd>S</Kbd>.
      </p>
    </div>
  )
}
