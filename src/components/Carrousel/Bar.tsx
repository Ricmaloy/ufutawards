import { ComponentProps } from 'react'
import { useCarrousel } from './Root'

export type BarProps = ComponentProps<'div'>

export function Bar({ id, ...props }: BarProps) {
  const { activeItem } = useCarrousel()

  return (
    <div
      className={
        activeItem === Number(id)
          ? `h-1 w-10 rounded bg-ocean-700 transition`
          : `h-1 w-3 rounded bg-slate-400 transition`
      }
      {...props}
    />
  )
}
