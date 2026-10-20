import { Button } from '@bilazo/kito/components/button'
import { Card, CardContent } from '@bilazo/kito/components/card'
import { Share2, Users } from 'lucide-react'

export default function ContentOnly() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-secondary p-2 text-secondary-foreground">
            <Users className="size-4" />
          </div>
          <div>
            <p className="text-sm font-medium">3 active members</p>
            <p className="text-xs text-muted-foreground">in this project</p>
          </div>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="Share">
          <Share2 />
        </Button>
      </CardContent>
    </Card>
  )
}
