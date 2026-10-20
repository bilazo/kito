import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@bilazo/kito/components/card'
import { BookOpen, Clock } from 'lucide-react'

export default function InteractiveLink() {
  return (
    <Card interactive className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <a
            href="/lessons/42"
            className="text-primary underline-offset-4 after:absolute after:inset-0 hover:underline"
          >
            Lesson 42: Market visit
          </a>
        </CardTitle>
        <CardDescription>Intermediate · 12 new words</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />8 min
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="size-3.5" />
            Vocabulary
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
