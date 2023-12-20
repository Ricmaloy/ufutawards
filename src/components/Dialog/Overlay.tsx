import * as Dialog from '@radix-ui/react-dialog'

export type OverlayProps = Dialog.DialogOverlayProps

export function Overlay({ ...props }: OverlayProps) {
  return <Dialog.Overlay {...props} />
}
