/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { Card } from '../card'
import { Separator } from '../separator'
import { Check } from 'lucide-react'

export type NomineeCardProps = {
  name: string
  imageUrl: string
  hasCategoryVoted?: boolean
  isNomineeVoted?: boolean
  onSelectNominee?: () => void
}

export function NomineeCard({
  name,
  imageUrl,
  hasCategoryVoted = false,
  isNomineeVoted = false,
  onSelectNominee,
}: NomineeCardProps) {
  return (
    <Card
      className={`relative h-80 flex flex-col bg-neutral-100 border border-neutral-200 ${hasCategoryVoted && !isNomineeVoted && 'opacity-20'}`}
      onClick={onSelectNominee}
    >
      {isNomineeVoted && (
        <div className="size-10 flex justify-center items-center rounded-full -top-4 -right-3 absolute bg-blue-700">
          <Check className="text-white" />
        </div>
      )}
      <div className="overflow-hidden rounded-t h-[100%]">
        <Image
          unoptimized
          className="bg-cover h-full object-cover"
          alt={'Nominee photo'}
          width={256}
          height={257}
          src={imageUrl}
        />
      </div>
      <Separator className="bg-neutral-200" />
      <div className="flex flex-col justify-center items-center gap-3 my-4">
        {!hasCategoryVoted && (
          <span className="text-xs text-neutral-600">Clique para votar em</span>
        )}
        {isNomineeVoted && (
          <span className="text-xs text-neutral-600">Você votou em</span>
        )}
        <p className="text-lg text-neutral-950 font-bold tracking-wider">
          {name}
        </p>
      </div>
    </Card>
  )
}
