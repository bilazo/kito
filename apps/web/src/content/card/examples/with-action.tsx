import { Button } from '@bilazo/kito/components/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@bilazo/kito/components/card'
import { MoreHorizontal } from 'lucide-react'

export default function WithAction() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Account settings</CardTitle>
        <CardDescription>Manage your personal info and security</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="More options">
            <MoreHorizontal />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Update your email, password, and active devices from here.
        </p>
      </CardContent>
    </Card>
  )
}
