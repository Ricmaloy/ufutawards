'use client'

import { ComponentProps } from 'react'
import { AuthContextProvider } from '@/contexts/AuthContext'

type ContextTreeProps = ComponentProps<'div'>

export function ContextTree({ children }: ContextTreeProps) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
