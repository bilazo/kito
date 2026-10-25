import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@bilazo/kito/components/accordion'

export default function Multiple() {
  return (
    <Accordion multiple defaultValue={['item-1', 'item-2']} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Account</AccordionTrigger>
        <AccordionContent>Name, email, and profile photo.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Notifications</AccordionTrigger>
        <AccordionContent>Email, push, and in-app preferences.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Privacy</AccordionTrigger>
        <AccordionContent>Who can see your activity and profile.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
