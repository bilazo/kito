import { Button } from '@bilazo/kito/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@bilazo/kito/components/card'
import { Trash2 } from 'lucide-react'

export default function WithFooter() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Delete lesson</CardTitle>
        <CardDescription>This action cannot be undone</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Deleting this lesson removes all of its progress and saved vocabulary.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" size="sm">
          <Trash2 />
          Delete
        </Button>
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}
