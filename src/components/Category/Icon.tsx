import { ComponentProps, ElementType } from 'react'

export interface IconProps extends ComponentProps<'div'> {
  icon: ElementType
}

export function Icon({ icon: Icon, ...props }: IconProps) {
  return <Icon {...props} className="" />
}
