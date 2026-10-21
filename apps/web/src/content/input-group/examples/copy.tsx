import { Button } from '@bilazo/kito/components/button'
import { InputGroup, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

const INVITE = 'https://vatyar.com/invite/abc123'

export default function CopyLink() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(INVITE)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard not available */
    }
  }

  return (
    <div className="w-full max-w-md">
      <InputGroup>
        <InputGroupInput defaultValue={INVITE} readOnly dir="ltr" aria-label="Invite link" />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="me-1"
          aria-label={copied ? 'Copied' : 'Copy link'}
          onClick={handleCopy}
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </InputGroup>
    </div>
  )
}
