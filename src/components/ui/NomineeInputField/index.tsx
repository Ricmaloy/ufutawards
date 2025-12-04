'use client'

import { useState } from 'react'
import { Forward, Upload } from 'lucide-react'
import { Input } from '../input'
import { Separator } from '../separator'

type NomineeInputFieldProps = {
  onAddNominee: (name: string, file: File) => void
}

export function NomineeInputField({ onAddNominee }: NomineeInputFieldProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [nomineeName, setNomineeName] = useState<string>('')

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl)
      }

      setImageFile(file) // Store the File object
      const blobUrl = URL.createObjectURL(file)
      setImageUrl(blobUrl) // Keep blob URL only for preview
    }
  }

  const handleAddClick = () => {
    if (nomineeName.trim() && imageFile) {
      onAddNominee(nomineeName, imageFile) // Pass the File object
      // Clear the fields after adding
      setNomineeName('')
      setImageFile(null)
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
      setImageUrl(null)
    }
  }

  return (
    <div className="bg-neutral-100 border border-neutral-200 rounded-md">
      <div className="flex items-center">
        <label className="w-[60px] h-[60px] flex items-center justify-center overflow-hidden cursor-pointer">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Pré-visualização"
              className="object-cover w-[60px] h-[60px] rounded-l-md"
            />
          ) : (
            <Upload className="size-4 text-neutral-950" />
          )}
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <Separator
          orientation="vertical"
          className="h-[60px] w-px bg-neutral-200"
        />

        <Input
          type="text"
          placeholder="Nome do indicado"
          className="flex-1 ml-2 px-2 py-1 text-neutral-950 bg-transparent outline-none text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={nomineeName}
          onChange={(e) => setNomineeName(e.target.value)}
        />

        <Separator
          orientation="vertical"
          className="h-[60px] w-px bg-neutral-200"
        />

        <button
          type="button"
          className="px-4 h-[60px] flex items-center justify-center bg-neutral-100  hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAddClick}
          disabled={!nomineeName.trim() || !imageFile}
        >
          <Forward className="size-4 text-neutral-800" />
        </button>
      </div>
    </div>
  )
}
