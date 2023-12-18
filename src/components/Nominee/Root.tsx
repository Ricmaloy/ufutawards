'use client'

import { ComponentProps } from 'react'

export type RootProps = ComponentProps<'div'>

export function Root({ ...props }: RootProps) {
  return <div className="relative rounded-md shadow" {...props} />
}
