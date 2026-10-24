import { AspectRatio } from '@bilazo/kito/components/aspect-ratio'

export default function WithImage() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-lg">
      <AspectRatio ratio={16 / 9}>
        {/*
          `object-cover` fills the frame and crops overflow; `object-contain`
          letterboxes instead. Either way the frame ratio stays fixed.
        */}
        <img
          src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=450&fit=crop"
          alt="A cat"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  )
}
