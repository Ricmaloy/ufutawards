import * as Separator from '@radix-ui/react-separator'

type DividerProps = Separator.SeparatorProps

export function Divider({ className, ...props }: DividerProps) {
  return (
    <Separator.Root
      decorative
      orientation="horizontal"
      className={`bg-dark-100 h-px w-full ` + className}
      {...props}
    />
  )
}
