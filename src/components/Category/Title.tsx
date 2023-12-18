'use client'

import { ComponentProps } from 'react'

export type TitleProps = ComponentProps<'h1'>

export function Title({ ...props }: TitleProps) {
  return <h1 className="text-base font-bold text-white" {...props} />
}
