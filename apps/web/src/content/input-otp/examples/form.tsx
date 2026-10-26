import { Button } from '@bilazo/kito/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@bilazo/kito/components/card'
import { Field, FieldDescription, FieldLabel } from '@bilazo/kito/components/field'
import { InputOTP, InputOTPGroup, InputOTPSeparator } from '@bilazo/kito/components/input-otp'
import { RefreshCw } from 'lucide-react'

export default function Form() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{' '}
          <span className="font-medium">you@example.com</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field name="otp">
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">Verification code</FieldLabel>
            <Button variant="outline" size="sm">
              <RefreshCw />
              Resend code
            </Button>
          </div>
          <InputOTP id="otp-verification" length={6} required size="lg">
            <InputOTPGroup count={3} size="lg" />
            <InputOTPSeparator className="mx-2" />
            <InputOTPGroup count={3} size="lg" />
          </InputOTP>
          <FieldDescription>
            <a href="/" className="underline underline-offset-4">
              I no longer have access to this email address.
            </a>
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" className="w-full">
            Verify
          </Button>
          <div className="text-sm text-muted-foreground">
            Having trouble signing in?{' '}
            <a href="/" className="underline underline-offset-4 hover:text-primary">
              Contact support
            </a>
          </div>
        </Field>
      </CardFooter>
    </Card>
  )
}
