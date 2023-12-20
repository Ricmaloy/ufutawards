import * as Dialog from '@radix-ui/react-dialog'

export type CloseProps = Dialog.DialogCloseProps

export function Close({ ...props }: CloseProps) {
  return <Dialog.Close {...props} />
}
