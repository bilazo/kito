import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from '@bilazo/kito/components/field'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

const options = [
  {
    value: 'starter',
    label: 'Starter',
    description: 'For hobby projects and experiments.',
  },
  {
    value: 'pro',
    label: 'Pro',
    description: 'For professional developers and small teams.',
  },
  {
    value: 'team',
    label: 'Team',
    description: 'Shared workspaces and role-based access.',
  },
]

export default function InField() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Plan</FieldLegend>
      <RadioGroup defaultValue="pro" aria-label="Plan">
        {options.map((option) => (
          <Field key={option.value} orientation="horizontal">
            <Radio value={option.value} id={`plan-${option.value}`} />
            <FieldContent>
              <FieldLabel htmlFor={`plan-${option.value}`}>{option.label}</FieldLabel>
              <FieldDescription>{option.description}</FieldDescription>
            </FieldContent>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
