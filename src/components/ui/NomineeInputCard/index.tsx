import { X } from 'lucide-react'
import { Separator } from '../separator'

export type NomineeInputCardProps = {
  id: string
  name: string
  imageUrl: string
  onRemoveNominee: (id: string) => void
}

export function NomineeInputCard({
  id,
  name,
  imageUrl,
  onRemoveNominee,
}: NomineeInputCardProps) {
  return (
    <div className="group relative w-[156px] h-[250px] bg-neutral-100 border border-neutral-200 rounded-md flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full p-4">
        <X
          className="size-4 text-white cursor-pointer"
          onClick={() => onRemoveNominee(id)}
        />
      </div>

      <img
        src={imageUrl}
        alt="Pré-visualização"
        width={256}
        height={244}
        className="h-full overflow-hidden object-cover"
      />
      <Separator orientation="horizontal" className="bg-neutral-200 h-px w-full" />
      <div className="flex flex-col w-full">
        <p className="text-neutral-950 py-2 px-2 text-center text-sm leading-5 truncate overflow-hidden whitespace-nowrap">
          {name}
        </p>
      </div>
    </div>
  )
}
