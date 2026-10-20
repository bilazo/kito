import { Button } from '@bilazo/kito/components/button'
import { Label } from '@bilazo/kito/components/label'
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
} from '@bilazo/kito/components/sheet'
import { Slider } from '@bilazo/kito/components/slider'
import { cn } from 'cn'
import { Check } from 'lucide-react'

import { usePreferences } from '@/lib/preferences'
import { PRESETS } from '@/lib/presets'

interface SettingsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const { prefs, setPrefs, set, reset } = usePreferences()

  const activePresetId = PRESETS.find(
    (p) =>
      p.values.radius === prefs.radius &&
      p.values.brandHue === prefs.brandHue &&
      p.values.controlScale === prefs.controlScale,
  )?.id

  const density = densityFromScale(prefs.controlScale)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetPopup side="end" className="w-104 max-w-[90vw]">
        <SheetHeader>
          <SheetTitle>Design tokens</SheetTitle>
          <SheetDescription>
            Adjust the library's token values to preview different brand states. Changes apply
            everywhere and are saved to this browser.
          </SheetDescription>
        </SheetHeader>

        <SheetBody className="flex flex-col gap-8 p-6">
          {/* ── Presets ──────────────────────────────────────────────── */}
          <section className="space-y-3">
            <SectionHeader title="Presets" hint="One-click starting points" />
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((preset) => (
                <PresetButton
                  key={preset.id}
                  preset={preset}
                  active={activePresetId === preset.id}
                  onClick={() => setPrefs({ ...prefs, ...preset.values })}
                />
              ))}
            </div>
          </section>

          {/* ── Density ──────────────────────────────────────────────── */}
          <section className="space-y-3">
            <SectionHeader title="Density" hint="Size of interactive controls" />
            <Select
              items={Object.entries(DENSITIES).map(([id, d]) => ({
                value: id,
                label: d.label,
              }))}
              value={density === 'custom' ? undefined : density}
              onValueChange={(v) => {
                if (v === null) return
                set('controlScale', DENSITIES[v as Density].scale)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Custom (${prefs.controlScale.toFixed(2)}×)`} />
              </SelectTrigger>
              <SelectPopup>
                {Object.entries(DENSITIES).map(([id, d]) => (
                  <SelectItem key={id} value={id}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
            {density === 'custom' && (
              <p className="text-xs text-muted-foreground">
                Currently a custom scale — the fine slider below overrides the density preset.
              </p>
            )}
          </section>

          {/* ── Fine-tune ────────────────────────────────────────────── */}
          <section className="space-y-5">
            <SectionHeader title="Fine-tune" hint="Precise control over each token" />

            <TokenSlider
              label="Radius"
              value={prefs.radius}
              min={0}
              max={1.5}
              step={0.025}
              format={(v) => `${v.toFixed(3)}rem`}
              onChange={(v) => set('radius', v)}
            />

            <TokenSlider
              label="Brand hue"
              value={prefs.brandHue}
              min={0}
              max={360}
              step={1}
              format={(v) => `${Math.round(v)}°`}
              onChange={(v) => set('brandHue', v)}
            />

            <TokenSlider
              label="Control scale"
              value={prefs.controlScale}
              min={0.85}
              max={1.25}
              step={0.05}
              format={(v) => `${v.toFixed(2)}×`}
              onChange={(v) => set('controlScale', v)}
            />
          </section>
        </SheetBody>

        <SheetFooter>
          <Button variant="ghost" onClick={reset}>
            Reset to defaults
          </Button>
          <SheetClose render={<Button />}>Done</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}

/* -------------------------------------------------------------------------- */
/* SectionHeader                                                              */
/* -------------------------------------------------------------------------- */

function SectionHeader({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <h3 className="text-sm font-semibold">{title}</h3>
      <span className="text-xs text-muted-foreground">{hint}</span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* PresetButton                                                               */
/* -------------------------------------------------------------------------- */

function PresetButton({
  preset,
  active,
  onClick,
}: {
  preset: (typeof PRESETS)[number]
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex flex-col items-start gap-2 rounded-lg border p-3 text-start transition-colors',
        active
          ? 'border-primary bg-primary-soft/40'
          : 'border-border hover:border-input hover:bg-accent/50',
      )}
    >
      {/* Color swatch showing the preset's hue */}
      <span
        aria-hidden
        className="size-6 rounded-md"
        style={{
          background: `oklch(0.66 0.18 ${preset.values.brandHue})`,
        }}
      />

      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{preset.name}</span>
        <span className="text-xs leading-snug text-muted-foreground">{preset.description}</span>
      </div>

      {active && (
        <span className="absolute inset-e-2 top-2 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" aria-hidden />
        </span>
      )}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* TokenSlider                                                                */
/* -------------------------------------------------------------------------- */

interface TokenSliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (value: number) => string
  onChange: (value: number) => void
}

function TokenSlider({ label, value, min, max, step, format, onChange }: TokenSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="font-mono text-xs text-muted-foreground">{format(value)}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => {
          const next = Array.isArray(v) ? v[0] : v
          onChange(next)
        }}
        aria-label={label}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Density                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Control density — a multiplier over `--control-scale` that changes the
 * height of every interactive control at once.
 *
 * The values are deliberately conservative: below 0.85 the tap targets in
 * `Button`'s icon sizes start to feel cramped, and above 1.25 a form row
 * looks like a landing page CTA.
 */
type Density = 'compact' | 'comfortable' | 'spacious'

const DENSITIES: Record<Density, { label: string; scale: number }> = {
  compact: { label: 'Compact', scale: 0.9 },
  comfortable: { label: 'Comfortable', scale: 1 },
  spacious: { label: 'Spacious', scale: 1.15 },
}

/**
 * Reverse-map a raw `controlScale` number back to the density label it
 * represents. Used to keep the density Select in sync when the user drags
 * the fine-grained scale slider by hand.
 */
function densityFromScale(scale: number): Density | 'custom' {
  for (const [key, def] of Object.entries(DENSITIES) as [Density, { scale: number }][]) {
    if (Math.abs(def.scale - scale) < 0.005) return key
  }
  return 'custom'
}
