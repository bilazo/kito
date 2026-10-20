import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@bilazo/kito/components/card'
import { Star, TrendingUp } from 'lucide-react'

export default function Stat() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardDescription>Words learned</CardDescription>
        <CardTitle render={<div />} className="text-3xl">
          1,248
        </CardTitle>
        <CardAction>
          <div className="rounded-lg bg-primary-soft p-2 text-primary-soft-foreground">
            <TrendingUp className="size-5" />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5" />
          12% more than last week
        </p>
      </CardContent>
    </Card>
  )
}
