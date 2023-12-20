import * as Dialog from '@radix-ui/react-dialog'

export type DescriptionProps = Dialog.DialogDescriptionProps

export function Description({ ...props }: DescriptionProps) {
  return <Dialog.Description {...props} />
}
