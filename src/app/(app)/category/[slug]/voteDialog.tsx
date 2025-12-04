'use client'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { startTransition, useState } from 'react'
import { vote } from '../../actions/vote'

export type voteProps = {
  uid: string
  categoryId: string
  categoryTitle: string
  categorySlug: string
  voteTitle: string
  voteId: string
}

export function VoteDialog({
  uid,
  categoryId,
  categorySlug,
  categoryTitle,
  voteId,
  voteTitle,
}: voteProps) {
  const [finishedLoading, setFinishLoading] = useState(false)
  const [isVoting, setIsVoting] = useState(false)

  function handleVote() {
    setFinishLoading(true)
  }

  return (
    <DialogContent
      onInteractOutside={isVoting ? (e) => e.preventDefault() : undefined}
      className="flex flex-col items-center text-neutral-950 p-0 gap-0 bg-neutral-100 border border-neutral-200 overflow-hidden"
    >
      <DialogClose />
      <div className="flex flex-col gap-4 my-6">
        <DialogDescription className="text-neutral-600 text-sm text-center font-normal tracking-wider">
          {finishedLoading ? 'Você votou em' : 'Confirmar voto em'}
        </DialogDescription>
        <DialogTitle className="text-neutral-950 text-center text-xl font-bold">
          {voteTitle}
        </DialogTitle>
        <div className="text-neutral-600 text-sm text-center">
          <span>para categoria de</span>
          <p>{categoryTitle}</p>
        </div>
      </div>
      <Separator className="bg-neutral-200" />
      <div className="w-full h-14 flex">
        {finishedLoading ? (
          <DialogClose asChild>
            <Button className="h-full flex-1 rounded-none">Fechar</Button>
          </DialogClose>
        ) : (
          <>
            <DialogClose asChild>
              <Button
                variant="destructive"
                className="h-full flex-1 rounded-none"
                disabled={isVoting}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              className="h-full flex-1 rounded-none bg-neutral-100 text-neutral-950 hover:bg-neutral-200"
              disabled={isVoting}
              onClick={async () => {
                startTransition(() => {
                  setIsVoting(true)
                  vote({
                    uid,
                    categoryId,
                    categorySlug,
                    categoryTitle,
                    voteId,
                    voteTitle,
                  })

                  handleVote()
                  setIsVoting(false)
                })
              }}
            >
              {isVoting ? 'Votando...' : 'Confirmar'}
            </Button>
          </>
        )}
      </div>
    </DialogContent>
  )
}
