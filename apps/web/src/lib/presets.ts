/**
 * Curated token presets. Each one defines a full set of overrides that can
 * be applied with a single click.
 *
 * Everything a preset touches is a `var()` in `defaults.css` — see
 * `packages/ui/src/styles/defaults.css`.
 */
export interface TokenPreset {
  id: string
  name: string
  /** Short human-readable summary shown next to the name. */
  description: string
  /** The token values to apply. */
  values: {
    radius: number
    brandHue: number
    controlScale: number
  }
}

export const PRESETS: TokenPreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Kito brand green, balanced roundness.',
    values: { radius: 0.625, brandHue: 149.2, controlScale: 1 },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blue, medium corners.',
    values: { radius: 0.5, brandHue: 235, controlScale: 1 },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange, taller controls.',
    values: { radius: 0.75, brandHue: 35, controlScale: 1.1 },
  },
  {
    id: 'berry',
    name: 'Berry',
    description: 'Pink-purple, rounded and compact.',
    values: { radius: 0.9, brandHue: 330, controlScale: 0.95 },
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Neutral gray, square corners.',
    values: { radius: 0.15, brandHue: 250, controlScale: 1 },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Deep green, larger controls.',
    values: { radius: 0.375, brandHue: 130, controlScale: 1.15 },
  },
]
