import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@bilazo/kito/components/accordion'

export default function Basic() {
  return (
    <Accordion defaultValue={['item-1']} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern — the trigger exposes{' '}
          <code className="font-mono">aria-expanded</code>, and the panel is wired to it via{' '}
          <code className="font-mono">aria-controls</code>.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses the same semantic tokens as the rest of Kito — border, focus ring, muted
          foreground — so it drops into any layout.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. The panel height animates via the theme's keyframes, and users with{' '}
          <code className="font-mono">prefers-reduced-motion</code> get the open/close without the
          animation.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
