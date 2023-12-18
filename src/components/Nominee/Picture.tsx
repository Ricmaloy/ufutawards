import Image, { ImageProps } from 'next/image'

export type PictureProps = ImageProps & {
  mask?: boolean
}

export function Picture({ mask = false, alt, ...props }: PictureProps) {
  return (
    <div className="relative h-[244px] max-w-[301px] overflow-hidden rounded-t">
      <Image {...props} alt={alt} fill objectFit="cover" />
      {mask && (
        <div className="absolute bottom-0 left-0 right-0 h-full bg-dark-300 opacity-70" />
      )}
    </div>
  )
}
