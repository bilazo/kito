import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@bilazo/kito/components/accordion'

export default function Disabled() {
  return (
    <Accordion className="max-w-lg rounded-lg border *:px-4">
      <AccordionItem value="a">
        <AccordionTrigger>Enabled</AccordionTrigger>
        <AccordionContent>This section can be opened.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b" disabled>
        <AccordionTrigger>Disabled</AccordionTrigger>
        <AccordionContent>This section cannot be opened.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Also enabled</AccordionTrigger>
        <AccordionContent>This section can also be opened.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
