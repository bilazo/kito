import { buttonVariants } from '@bilazo/kito/components/button'
import { Label } from '@bilazo/kito/components/label'

export default function WithLink() {
  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-4">
      <Label htmlFor="demo-password">Password</Label>
      {/*
        A plain <a> styled as a link. Using buttonVariants({ variant: 'link' })
        keeps the visual identical to Button's link variant while remaining a
        real anchor — no JS needed.
      */}
      <a href="/forgot-password" className={buttonVariants({ variant: 'link', size: 'sm' })}>
        Forgot password?
      </a>
    </div>
  )
}
