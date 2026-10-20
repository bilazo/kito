import { Button } from '@bilazo/kito/components/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@bilazo/kito/components/card'
import { Heart } from 'lucide-react'

export default function InteractiveWithAction() {
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
        <CardDescription>Intermediate · 15 min</CardDescription>
        <CardAction className="z-10">
          {/*
            z-10 keeps the action above the stretched link.
            Click on the heart does not navigate; click anywhere else
            follows the link.
          */}
          <Button variant="ghost" size="icon-sm" aria-label="Add to favorites">
            <Heart />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Click the heart to favorite — clicks elsewhere open the lesson.
        </p>
      </CardContent>
    </Card>
  )
}
