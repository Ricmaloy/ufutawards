import { ComponentProps } from 'react'
import { useCarrousel } from './Root'

export type DisplayProps = ComponentProps<'div'>

export function Display({ id, ...props }: DisplayProps) {
  const { activeItem } = useCarrousel()

  return (
    <div
      className={`m-auto flex w-full max-w-[325px] flex-1 flex-col justify-center gap-4 ${
        activeItem !== Number(id) && 'hidden'
      }`}
      {...props}
    />
  )
}
