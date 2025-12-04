'use client'

import { DialogTrigger } from '@/components/ui/dialog'
import { NomineeCard } from '@/components/ui/NomineeCard'
import { VoteDialog } from './voteDialog'
import { useState } from 'react'

export type nomineesProps = {
  userId: string
  category: {
    id: string
    slug: string
    title: string
  }
  nominees: {
    id: string
    imageUrl: string
    name: string
  }[]
  hasUserVoted: boolean
  voteId?: string
}

export function Nominees({
  nominees,
  hasUserVoted,
  voteId,
  category,
  userId,
}: nomineesProps) {
  const [nomineeName, setNomineeName] = useState('')
  const [nomineeId, setNomineeId] = useState('')

  function handleSelectNominee({ id, name }: { id: string; name: string }) {
    setNomineeName(name)
    setNomineeId(id)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {nominees.map((nominee) => {
          return (
            <DialogTrigger key={nominee.id} disabled={hasUserVoted}>
              <NomineeCard
                imageUrl={nominee.imageUrl}
                name={nominee.name}
                hasCategoryVoted={hasUserVoted}
                isNomineeVoted={voteId === nominee.id}
                onSelectNominee={() =>
                  handleSelectNominee({ id: nominee.id, name: nominee.name })
                }
              />
            </DialogTrigger>
          )
        })}
      </div>

      <VoteDialog
        uid={userId}
        categoryId={category.id}
        categorySlug={category.slug}
        categoryTitle={category.title}
        voteTitle={nomineeName}
        voteId={nomineeId}
      />
    </>
  )
}
