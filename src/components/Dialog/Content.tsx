'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { forwardRef } from 'react'

export type ContentProps = Dialog.DialogContentProps

export const Content = forwardRef<HTMLDivElement, Dialog.DialogContentProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Dialog.Portal>
        <Dialog.Content {...props} ref={forwardedRef}>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    )
  },
)

Content.displayName = 'Content'
