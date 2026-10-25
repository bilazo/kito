import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { cn } from 'cn'

import type * as React from 'react'

/* -------------------------------------------------------------------------- */
/* Accordion (root)                                                           */
/* -------------------------------------------------------------------------- */

export type AccordionProps = BaseAccordion.Root.Props

/**
 * A vertically stacked set of interactive headings that each reveal a
 * section of content.
 *
 * Compose with `AccordionItem`, `AccordionTrigger`, and `AccordionContent`:
 *
 * ```tsx
 * <Accordion defaultValue={['item-1']}>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * By default, only one item can be open at a time. Pass `multiple` to allow
 * any number of items open simultaneously.
 *
 * Base UI handles the ARIA wiring (`aria-expanded`, `aria-controls`),
 * keyboard navigation (Enter / Space to toggle, ArrowUp / ArrowDown to move
 * between triggers, Home / End to jump to the ends), and the open/close
 * animation via the `--accordion-panel-height` CSS variable.
 */
export function Accordion({ className, ...props }: AccordionProps) {
  return (
    <BaseAccordion.Root
      data-slot="accordion"
      className={cn('flex w-full flex-col', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* AccordionItem                                                              */
/* -------------------------------------------------------------------------- */

export type AccordionItemProps = Omit<BaseAccordion.Item.Props, 'className'> & {
  className?: string
}

/**
 * One collapsible section. Pairs an `AccordionTrigger` with an
 * `AccordionContent`; the pair shares this item's `value`, which is what the
 * root tracks.
 *
 * Pass `disabled` to make the item inert — its trigger remains visible but
 * cannot be clicked or hovered, and the trigger's text and chevron fade.
 */
export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={cn(
        // The `group/accordion-item` name is the primary hook for the
        // trigger's disabled styles — Base UI sets `data-disabled` on the
        // item when its `disabled` prop is true, and the trigger reads it
        // via `group-data-disabled/accordion-item:` selectors.
        'group/accordion-item border-border not-last:border-b',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* AccordionTrigger                                                           */
/* -------------------------------------------------------------------------- */

export type AccordionTriggerProps = Omit<BaseAccordion.Trigger.Props, 'className'> & {
  className?: string
}

/**
 * The clickable heading of an item. Renders inside an `<h3>` (Base UI's
 * `Header`) so the accordion's headings land in the document's outline.
 *
 * A chevron sits at the reading-end side and rotates 180° when the item is
 * open — a direction-agnostic transform, so no `rtl:` override is needed.
 *
 * When the parent `AccordionItem` is disabled, the trigger loses all
 * interactivity and fades: no hover underline, no focus ring, `opacity-50`.
 */
export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="flex">
      <BaseAccordion.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group/accordion-trigger',
          'gap-3 flex flex-1 items-start justify-between',
          'py-3 font-medium rounded-md text-start text-sm',
          'outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          'transition-colors duration-150 motion-reduce:transition-none',
          'hover:underline',

          // Disabled
          'group-data-disabled/accordion-item:pointer-events-none',
          'group-data-disabled/accordion-item:opacity-50',
          'group-data-disabled/accordion-item:hover:no-underline',
          'group-data-disabled/accordion-item:focus-visible:outline-0',
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          'data-disabled:hover:no-underline data-disabled:focus-visible:outline-0',
          'aria-disabled:pointer-events-none aria-disabled:opacity-50',
          'aria-disabled:hover:no-underline aria-disabled:focus-visible:outline-0',

          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className={cn(
            'size-4 pointer-events-none ms-auto shrink-0 text-muted-foreground',
            'transition-transform duration-200 motion-reduce:transition-none',
            'group-aria-expanded/accordion-trigger:rotate-180',
          )}
        />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}

/* -------------------------------------------------------------------------- */
/* AccordionContent                                                           */
/* -------------------------------------------------------------------------- */

export type AccordionContentProps = Omit<BaseAccordion.Panel.Props, 'className'> & {
  className?: string
}

/**
 * The collapsible panel for an item. `className` is applied to the inner
 * wrapper, not the animating panel — use it for content padding, background,
 * or typography overrides without breaking the height animation.
 *
 * The panel's height animates via the `animate-accordion-down` /
 * `animate-accordion-up` keyframes in `defaults.css`, driven by Base UI's
 * `--accordion-panel-height` variable. Reduced-motion users get the
 * open/close without the animation (`motion-reduce:animate-none`).
 */
export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  return (
    <BaseAccordion.Panel
      data-slot="accordion-content"
      className={cn(
        'overflow-hidden text-sm',
        'data-closed:animate-accordion-up data-open:animate-accordion-down',
        'motion-reduce:animate-none',
      )}
      {...props}
    >
      <div
        className={cn(
          'pt-0 pb-3 h-(--accordion-panel-height)',
          'data-ending-style:h-0 data-starting-style:h-0',
          className,
        )}
      >
        {children}
      </div>
    </BaseAccordion.Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
