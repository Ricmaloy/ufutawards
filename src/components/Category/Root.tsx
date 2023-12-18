'use client'

import Link from 'next/link'
import { ComponentProps } from 'react'

export type RootProps = ComponentProps<'div'> & {
  href: string
}

export function Root({ href, ...props }: RootProps) {
  return (
    <Link href={href}>
      <div
        className="relative flex flex-col rounded border border-dark-100 bg-dark-400 p-6 shadow-sm"
        {...props}
      />
    </Link>
  )
}
