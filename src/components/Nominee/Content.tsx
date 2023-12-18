import { ComponentProps } from 'react'
import { Divider } from '../Divider'

export type ContentProps = ComponentProps<'div'> & {
  open?: boolean
  chosen?: boolean
}

export function Content({
  open = false,
  chosen = false,
  children,
  ...props
}: ContentProps) {
  return (
    <>
      <Divider className="bg-[#6C6C6C]" />
      <div
        className="flex h-[91px] flex-col items-center gap-3 rounded-b bg-dark-400 p-5"
        {...props}
      >
        <span className="text-[10px] text-white">
          {open && 'Clique para votar em'}
          {chosen && 'Você votou em'}
        </span>
        {children}
      </div>
    </>
  )
}
