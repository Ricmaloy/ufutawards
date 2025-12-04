'use client'

import type { ReactNode } from 'react'
import CountUp from 'react-countup'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'

type CountUpCardProps = {
  count: number
  title: string
  description: string
  children: ReactNode
}

export function CountUpCard({
  count,
  title,
  description,
  children,
}: CountUpCardProps) {
  return (
    <Card className="bg-neutral-100 border border-neutral-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-neutral-950">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <CountUp
          start={0}
          end={count}
          duration={5}
          className="text-neutral-600 text-4xl font-bold"
        />
        {children}
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 font-medium leading-none text-neutral-600 text-xs">
          {description}
        </div>
      </CardFooter>
    </Card>
  )
}
