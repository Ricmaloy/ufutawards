import * as Dialog from '@radix-ui/react-dialog'

export type PortalProps = Dialog.DialogPortalProps

export function Portal({ ...props }: PortalProps) {
  return <Dialog.Portal {...props} />
}
