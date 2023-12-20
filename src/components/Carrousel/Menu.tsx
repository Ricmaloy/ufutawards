import { ComponentProps } from 'react'

export type MenuProps = ComponentProps<'div'>

export function Menu({ ...props }: MenuProps) {
  return <div className="flex items-center justify-center gap-3" {...props} />
}
