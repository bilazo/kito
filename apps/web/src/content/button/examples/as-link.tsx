import { buttonVariants } from '@bilazo/kito/components/button'

export default function AsLink() {
  return (
    <a
      href="https://example.com"
      target="_blank"
      rel="noreferrer"
      className={buttonVariants({ variant: 'primary' })}
    >
      Open in new tab
    </a>
  )
}
