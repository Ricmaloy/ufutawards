import { ChevronLeft, ChevronRight, LucideProps } from 'lucide-react'
import { useCarrousel } from './Root'

export type ChevronProps = LucideProps & {
  side: 'left' | 'right'
}

export function Chevron({ side, ...props }: ChevronProps) {
  const { carrouselClickChange } = useCarrousel()

  return (
    <>
      {side === 'left' ? (
        <ChevronLeft
          className="cursor-pointer text-gray-400"
          {...props}
          onClick={carrouselClickChange}
        />
      ) : (
        <ChevronRight
          className="cursor-pointer text-gray-400"
          {...props}
          onClick={carrouselClickChange}
        />
      )}
    </>
  )
}
