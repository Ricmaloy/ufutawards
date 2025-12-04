'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { NomineeInputField } from '@/components/ui/NomineeInputField'
import { NomineeInputCard } from '@/components/ui/NomineeInputCard'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { uploadNomineeImage } from '@/lib/upload-image'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { getFirebaseApp } from '@/app/auth/firebase'
import { Switch } from '@/components/ui/switch'

const db = getFirestore(getFirebaseApp())

type NomineeProps = {
  id: string
  name: string
  imageUrl: string
  file?: File
}

export default function CreateCategory() {
  const router = useRouter()

  const [nominees, setNominees] = useState<NomineeProps[]>([])
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryDescription, setCategoryDescription] = useState<string>('')
  const [categorySynopsis, setCategorySynopsis] = useState<string>('')
  const [categorySide, setCategorySide] = useState<string>('A')
  const [isUploading, setIsUploading] = useState(false)

  const handleAddNominee = (name: string, file: File) => {
    if (!name.trim() || !file) {
      return
    }

    const newNominee: NomineeProps = {
      id: `${Date.now()}-${Math.random().toString(36)}`,
      name: name.trim(),
      imageUrl: URL.createObjectURL(file),
      file,
    }

    setNominees((prevNominees) => [...prevNominees, newNominee])
  }

  const handleRemoveNominee = (id: string) => {
    setNominees((prevNominees) => {
      const nomineeToRemove = prevNominees.find((n) => n.id === id)

      if (nomineeToRemove?.imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(nomineeToRemove.imageUrl)
      }
      return prevNominees.filter((nominee) => nominee.id !== id)
    })
  }

  const handleSwitchChange = (isChecked: boolean) => {
    setCategorySide(isChecked ? 'B' : 'A')
  }

  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nominees.length === 0) {
      return
    }

    setIsUploading(true)

    try {
      const uploadedNominees = await Promise.all(
        nominees.map(async (nominee) => {
          if (nominee.file) {
            const downloadURL = await uploadNomineeImage(
              nominee.file,
              nominee.name,
            )
            return {
              id: nominee.id,
              name: nominee.name,
              imageUrl: downloadURL,
            }
          }
          return {
            id: nominee.id,
            name: nominee.name,
            imageUrl: nominee.imageUrl,
          }
        }),
      )

      const category = {
        title: categoryName,
        side: categorySide,
        slug: categoryName.toLowerCase().replace(/ /g, '-'),
        description: categoryDescription,
        synopsis: categorySynopsis,
        nominees: uploadedNominees,
      }

      console.log('✅ Category created successfully:', category)

      // Now save to Firestore
      await addDoc(collection(db, 'categories'), category)

      router.push('/')
    } catch (error) {
      console.error('❌ Error uploading images:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <Link href={'/'} className="size-12 my-4">
        <Button className="size-12 text-neutral-950 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200">
          <ArrowLeft />
        </Button>
      </Link>
      <form onSubmit={handleCreateCategory}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-neutral-950 font-bold text-xl leading-5">
              Nova categoria
            </FieldLegend>
            <FieldDescription className="text-neutral-700 text-sm leading-5 mt-2">
              Crie uma nova categoria para seus votos.
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel
                  className="text-neutral-950 font-bold text-sm leading-5"
                  htmlFor="name"
                >
                  Nome da categoria
                </FieldLabel>
                <Input
                  placeholder="Repique de ouro..."
                  className="text-neutral-950 shadow-xs outline-none bg-neutral-100 border-neutral-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  disabled={isUploading}
                />
              </Field>
              <Field>
                <FieldLabel
                  className="text-neutral-950 font-bold text-sm leading-5"
                  htmlFor="name"
                >
                  Descrição da categoria
                </FieldLabel>
                <Input
                  placeholder="A categoria de melhor repique de ouro.."
                  className="text-neutral-950 shadow-xs outline-none bg-neutral-100 border-neutral-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  disabled={isUploading}
                />
              </Field>
              <Field>
                <FieldLabel
                  className="text-neutral-950 font-bold text-sm leading-5"
                  htmlFor="description"
                >
                  Sinopse da categoria
                </FieldLabel>
                <Textarea
                  placeholder="Esta categoria celebra a tradição única e irreverente da nossa bateria..."
                  className="resize-none text-neutral-950 shadow-xs outline-none bg-neutral-100 border-neutral-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                  maxLength={255}
                  rows={6}
                  value={categorySynopsis}
                  onChange={(e) => setCategorySynopsis(e.target.value)}
                  disabled={isUploading}
                />
              </Field>
              <Field>
                <FieldLabel
                  className="text-neutral-950 font-bold text-sm leading-5"
                  htmlFor="side"
                >
                  Lado da categoria
                </FieldLabel>
                <div className="flex items-center gap-2">
                  <Switch
                    className="w-[52px]"
                    onCheckedChange={handleSwitchChange}
                  />
                  <FieldLabel
                    htmlFor="side"
                    className="text-neutral-700 text-sm leading-5"
                  >
                    Lado {categorySide}
                  </FieldLabel>
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend className="text-neutral-950 font-bold text-xl leading-5">
              Indicados
            </FieldLegend>
            <FieldDescription className="text-neutral-700 text-sm leading-5 mt-2">
              Adicione os indicados para esta categoria.
            </FieldDescription>

            <FieldGroup>
              <Field>
                <NomineeInputField onAddNominee={handleAddNominee} />
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="flex flex-wrap gap-4">
            {nominees.map((nominee) => (
              <NomineeInputCard
                key={nominee.id}
                id={nominee.id}
                name={nominee.name}
                imageUrl={nominee.imageUrl}
                onRemoveNominee={handleRemoveNominee}
              />
            ))}
          </div>
        </FieldGroup>

        <Button
          type="submit"
          disabled={isUploading}
          className="w-full mt-6 text-neutral-950 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 transition-colors"
        >
          {isUploading ? 'Criando categoria...' : 'Criar categoria'}
        </Button>
      </form>
    </div>
  )
}
