import * as Dialog from '@radix-ui/react-dialog'

export type TriggerProps = Dialog.DialogTriggerProps

export function Trigger({ ...props }: TriggerProps) {
  return <Dialog.Trigger {...props} />
}
