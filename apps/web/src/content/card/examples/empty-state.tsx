import { Button } from '@bilazo/kito/components/button'
import { Card, CardContent } from '@bilazo/kito/components/card'
import { BookOpen, Plus } from 'lucide-react'

export default function EmptyState() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="rounded-full bg-muted p-3 text-muted-foreground">
          <BookOpen className="size-6" />
        </div>
        <div>
          <p className="font-semibold">No lessons yet</p>
          <p className="text-sm text-muted-foreground">Start by adding your first lesson</p>
        </div>
        <Button size="sm">
          <Plus />
          Add lesson
        </Button>
      </CardContent>
    </Card>
  )
}
