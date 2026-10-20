import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: [
    'Card',
    'CardHeader',
    'CardTitle',
    'CardDescription',
    'CardAction',
    'CardContent',
    'CardFooter',
  ],

  summary:
    'A structural surface for grouping related content. A card is composed from seven parts — header, title, description, optional action, content, optional footer — and the whole surface is driven by a single `--card-spacing` CSS variable, so switching between the default and small size (or overriding the spacing on one card) is a single-variable change.',

  whenToUse: [
    'Group a focused unit of content — a profile, a project, a lesson, an invoice — with a title and optional actions.',
    'Display content alongside a stretched link: pass `interactive` and put an `<a>` with `after:absolute after:inset-0` in the title, so the whole card is clickable while an independent action (favorite, more) lives next to it.',
    'Present a compact panel with a title and description but no full form — a stat card, a summary, an empty-state placeholder.',
    'Use the small size (`size="sm"`) and tighter spacing to fit several cards in a dense grid or a mobile list.',
  ],

  whenNotToUse: [
    'For a form field with a label, description, and error message — use `Field`. A card wraps a whole form section, not a single control.',
    'For a list of rows that share one container (a table, a stack of settings rows) — use `Table` for tabular data, or a plain `div` with `divide-y` for row stacks. Every row becoming a card adds unnecessary visual weight.',
    'For an interactive element on its own (an action, a toggle) — use `Button`, `Switch`, or `Checkbox`. A card is a container, not an action.',
    'For navigation between pages — use your router `<Link>` or a `<Button>` rendered as a link. Card with a stretched link is for a card that already exists as a surface; if the whole UI is a set of links, use a list of links.',
    'For a modal or panel that should float above the page — use `Dialog`, `Sheet`, `Popover`, or `Drawer`.',
  ],

  props: [
    {
      name: 'size',
      type: "'sm' | 'md'",
      default: "'md'",
      description:
        'Controls the shared `--card-spacing` variable that sets the gap between sections and the inset of each section. `sm` uses `--spacing(4)` (16px); `md` uses `--spacing(6)` (24px). Override per card with an arbitrary property class, e.g. `[--card-spacing:--spacing(2)]`.',
    },
    {
      name: 'variant',
      type: "'filled' | 'outline'",
      default: "'filled'",
      description:
        'Surface treatment. `filled` paints the card with `bg-card` and rings it with `--border`. `outline` is transparent so the page shows through, still ringed. Both use a ring (not a border) so switching variants does not shift the content by 1px.',
    },
    {
      name: 'interactive',
      type: 'boolean',
      default: 'false',
      description:
        'Adds a hover and focus-within affordance — `:has(a:hover)` and `:has(button:hover)` tint the surface, `:has(a:focus-visible)` draws a focus ring. Use when the card contains a stretched link so the whole surface reads as clickable. Does NOT make the card itself focusable.',
    },
    {
      name: 'render',
      type: 'ReactElement',
      description:
        'Render the card root as a different element, e.g. `<article>`. Base UI merges the props and preserves `data-slot="card"`.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes. Merged with the variant classes via `cn()`.',
    },
  ],

  propsNote:
    'Card is a compound component. `Card` is the surface; `CardHeader` is a grid that places `CardTitle`, `CardDescription`, and an optional `CardAction` in the top-end corner automatically; `CardContent` is the main body; `CardFooter` sits at the bottom with a divider and a muted background. `CardTitle` renders as `<h3>` by default (a titled section for screen readers) — pass `render={<div />}` for non-heading titles such as numeric stats. Every subcomponent accepts `className` plus native HTML attributes; none of them add behaviour.',

  composition: [
    {
      title: 'Full card',
      description: 'Every part in its default position. Only the parts you need are required.',
      code: `import {\n  Card,\n  CardAction,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from '@bilazo/kito/components/card'\n\n<Card>\n  <CardHeader>\n    <CardTitle>Project</CardTitle>\n    <CardDescription>A short summary</CardDescription>\n    <CardAction>\n      <Button variant="ghost" size="icon-sm" aria-label="More">…</Button>\n    </CardAction>\n  </CardHeader>\n  <CardContent>…</CardContent>\n  <CardFooter>\n    <Button>Continue</Button>\n  </CardFooter>\n</Card>`,
    },
    {
      title: 'Stretched link',
      description:
        'Pass `interactive` and put a real `<a>` in the title with `after:absolute after:inset-0` — the anchor expands to cover the card. Use `buttonVariants()` for the link styling, not `<Button render={<a/>}>`.',
      code: `<Card interactive>\n  <CardHeader>\n    <CardTitle>\n      <a\n        href="/lessons/42"\n        className="text-primary underline-offset-4 after:absolute after:inset-0 hover:underline"\n      >\n        Lesson 42: Market visit\n      </a>\n    </CardTitle>\n    <CardDescription>Intermediate · 12 new words</CardDescription>\n  </CardHeader>\n</Card>`,
    },
    {
      title: 'Stretched link with an independent action',
      description:
        'A favorite button next to the stretched link. Give `CardAction` a `z-10` so clicks on the action do not navigate.',
      code: `<CardAction className="z-10">\n  <Button variant="ghost" size="icon-sm" aria-label="Add to favorites">\n    <Heart />\n  </Button>\n</CardAction>`,
    },
    {
      title: 'Edge-to-edge content',
      description:
        'Override `--card-spacing` to zero the padding, then add padding to each section that should stay inset. Or use negative margins: `-mx-(--card-spacing)` on `CardContent` for a full-bleed image or table.',
      code: `<Card className="[--card-spacing:0px]">\n  <img src="…" alt="" />\n  <CardContent className="px-6 py-4">…</CardContent>\n</Card>`,
    },
    {
      title: 'Non-heading title',
      description:
        'A stat card uses a numeric value instead of a heading — pass `render={<div/>}` so the number is not announced as an H3.',
      code: `<CardTitle render={<div />} className="text-3xl">\n  1,248\n</CardTitle>`,
    },
  ],
}
