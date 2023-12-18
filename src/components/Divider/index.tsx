import * as Separator from '@radix-ui/react-separator'

type DividerProps = Separator.SeparatorProps

export function Divider({ className, ...props }: DividerProps) {
  return (
    <Separator.Root
      decorative
      orientation="horizontal"
      className={`h-px w-full bg-dark-100 ` + className}
      {...props}
    />
  )
}
