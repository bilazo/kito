import { Kbd, KbdGroup } from '@bilazo/kito/components/kbd'

export default function Group() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <p className="flex items-center gap-2">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <span className="text-muted-foreground">Open command palette</span>
      </p>
      <p className="flex items-center gap-2">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
        <span className="text-muted-foreground">Open project switcher</span>
      </p>
      <p className="flex items-center gap-2">
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>Alt</Kbd>
          <Kbd>Del</Kbd>
        </KbdGroup>
        <span className="text-muted-foreground">System interrupt</span>
      </p>
    </div>
  )
}
