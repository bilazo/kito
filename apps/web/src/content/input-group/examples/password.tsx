import { Button } from '@bilazo/kito/components/button'
import { InputGroup, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function Password() {
  const [visible, setVisible] = useState(false)

  return (
    <div className="w-full max-w-md">
      <InputGroup>
        <InputGroupInput
          type={visible ? 'text' : 'password'}
          placeholder="Password"
          autoComplete="current-password"
          aria-label="Password"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="me-1"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOff /> : <Eye />}
        </Button>
      </InputGroup>
    </div>
  )
}
