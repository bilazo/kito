import { Checkbox } from '@bilazo/kito/components/checkbox'
import { Label } from '@bilazo/kito/components/label'
import { useState } from 'react'

const OPTIONS = ['Email', 'SMS', 'Push'] as const

export default function Group() {
  const [selected, setSelected] = useState<string[]>(['Email'])
  const allChecked = selected.length === OPTIONS.length
  const anyChecked = selected.length > 0

  function toggle(option: string) {
    setSelected((current) =>
      current.includes(option) ? current.filter((x) => x !== option) : [...current, option],
    )
  }

  function toggleAll() {
    setSelected(allChecked ? [] : [...OPTIONS])
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <Checkbox
          id="all"
          checked={allChecked}
          indeterminate={!allChecked && anyChecked}
          onCheckedChange={toggleAll}
        />
        <Label htmlFor="all" className="font-semibold">
          All channels
        </Label>
      </div>
      {OPTIONS.map((option) => (
        <div key={option} className="flex items-center gap-2 ps-1">
          <Checkbox
            id={`opt-${option}`}
            checked={selected.includes(option)}
            onCheckedChange={() => toggle(option)}
          />
          <Label htmlFor={`opt-${option}`}>{option}</Label>
        </div>
      ))}
    </div>
  )
}
