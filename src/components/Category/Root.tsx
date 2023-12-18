'use client'

import { ComponentProps } from 'react'

export type RootProps = ComponentProps<'div'>

export function Root({ ...props }: RootProps) {
  return (
    <div
      className="relative flex flex-col rounded border border-dark-100 bg-dark-400 p-6 shadow-sm"
      {...props}
    />
  )
}
