import { Button } from '@bilazo/kito/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@bilazo/kito/components/card'

export default function Basic() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>A quick summary of your current project</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Cards hold a focused unit of content: a title, an optional description, body, and footer
          actions.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Continue</Button>
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}
