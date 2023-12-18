'use client'

import { ComponentProps } from 'react'

// export type CounterProps = ComponentProps<'span'>
export type CounterProps = {
  indicates: number
} & ComponentProps<'span'>

export function Counter({ indicates, ...props }: CounterProps) {
  return (
    <span className="text-xs text-white" {...props}>
      {indicates} indicados
    </span>
  )
}
