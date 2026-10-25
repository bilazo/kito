import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@bilazo/kito/components/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@bilazo/kito/components/card'

const FAQ = [
  {
    q: 'How do I reset my password?',
    a: 'Click "Forgot password" on the sign-in page and follow the email link.',
  },
  {
    q: 'Where can I find my invoices?',
    a: 'Open Settings → Billing → Invoices. The last 24 months are available.',
  },
  {
    q: 'Can I export my data?',
    a: 'Yes — go to Settings → Data → Export. You will receive an email when it is ready.',
  },
]

export default function CardExample() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Frequently asked questions</CardTitle>
        <CardDescription>Short answers to common questions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion>
          {FAQ.map((item, i) => (
            <AccordionItem key={item.q} value={`q-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
