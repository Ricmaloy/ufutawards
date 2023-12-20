import * as Dialog from '@radix-ui/react-dialog'

export type TitleProps = Dialog.DialogTitleProps

export function Title({ ...props }: TitleProps) {
  return <Dialog.Title {...props} />
}
