'use client'

import { ComponentProps } from 'react'

export type DescriptionProps = ComponentProps<'p'>

export function Description({ ...props }: DescriptionProps) {
  return <p className="mb-3 mt-1 text-xs text-white" {...props} />
}
