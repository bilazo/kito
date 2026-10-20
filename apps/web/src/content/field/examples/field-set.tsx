import { Field, FieldLabel, FieldLegend, FieldSet } from '@bilazo/kito/components/field'

const options = [
  { value: 'starter', label: 'Starter' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
]

export default function FieldSetExample() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Plan</FieldLegend>
      {/* TODO: replace with <RadioGroup /> once available */}
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <Field key={option.value} orientation="horizontal">
            <input
              type="radio"
              id={`plan-${option.value}`}
              name="plan"
              value={option.value}
              className="size-4 shrink-0"
            />
            <FieldLabel htmlFor={`plan-${option.value}`}>{option.label}</FieldLabel>
          </Field>
        ))}
      </div>
    </FieldSet>
  )
}
