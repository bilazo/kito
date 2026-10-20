/**
 * Manual per-component metadata. Single source of truth for the docs page
 * (`<PropsTable>`, `<Guidelines>`) and the generated AI docs.
 */
export interface PropMeta {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export interface CodeExample {
  title: string
  description?: string
  code: string
}

export interface ComponentMeta {
  /**
   * Optional explicit exports list. Defaults to `[PascalCase(name)]`.
   * Set when the entry point exports more than the root component.
   */
  exports?: string[]

  /** Long-form description for the AI-facing doc. */
  summary: string

  /** Bullet list — when to reach for this component. */
  whenToUse: string[]

  /** Bullet list — when NOT to. */
  whenNotToUse: string[]

  /** Props table rows. Order is preserved. */
  props: PropMeta[]

  /** Optional note rendered below the props table. */
  propsNote?: string

  /** Composition recipes — used only by the AI doc generator. */
  composition: CodeExample[]
}

export function loadMeta(name: string): ComponentMeta | undefined {
  const modules = import.meta.glob<{ meta: ComponentMeta }>('../content/*/meta.ts', { eager: true })
  return modules[`../content/${name}/meta.ts`]?.meta
}
