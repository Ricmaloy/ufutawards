'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import * as Nominee from '@/components/Nominee'
import * as ConfirmDialog from '@/components/Dialog'
import { Divider } from '@/components/Divider'
import { withAuth } from '@/hooks/useRoute'

const CategoryPage = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <Link
        href={'/'}
        className="mt-4 flex items-center gap-1 text-sm text-white"
      >
        <ChevronLeft />
        voltar
      </Link>
      <span className="mt-20 block text-center text-xl font-bold text-white">
        Categoria
      </span>
      <h1 className="mt-2 text-center text-5xl font-bold text-white">
        Melhor {params.slug}
      </h1>

      <p className="mt-10 text-sm text-white">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. Lorem Ipsum has been the
        industry standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type specimen
        book.
      </p>

      <div className="mt-8 grid grid-cols-nominees gap-3">
        <Nominee.Root>
          <Nominee.Picture
            src={'https://github.com/ricmaloy.png'}
            alt="nominee"
          />
          <Nominee.Checkmark />

          <ConfirmDialog.Root>
            <ConfirmDialog.Trigger asChild>
              <Nominee.Content chosen>
                <Nominee.Title>Ricardo Zamboni</Nominee.Title>
              </Nominee.Content>
            </ConfirmDialog.Trigger>
            <ConfirmDialog.Portal>
              <ConfirmDialog.Overlay className="fixed inset-0 z-[3] bg-dark-900 opacity-70" />
              <ConfirmDialog.Content className="fixed left-1/2 top-1/2 z-[4] flex -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded bg-dark-400 shadow">
                <>
                  <div className="flex flex-col items-center gap-5 p-10">
                    <ConfirmDialog.Title className="text-sm text-white">
                      Confirmar voto em
                    </ConfirmDialog.Title>
                    <ConfirmDialog.Description className="text-xl font-bold text-white">
                      Ricardo Zamboni
                    </ConfirmDialog.Description>
                    <ConfirmDialog.Description className="text-center text-sm text-white">
                      para categoria de
                      <br /> Melhor caixa
                    </ConfirmDialog.Description>
                  </div>
                  <div className="w-full">
                    <Divider />
                    <div className="flex">
                      <ConfirmDialog.Close asChild>
                        <button className="flex flex-1 justify-center px-8 py-5 text-xs text-white">
                          Cancelar
                        </button>
                      </ConfirmDialog.Close>
                      <Divider orientation="vertical" className="h-auto w-px" />
                      <ConfirmDialog.Close asChild>
                        <button className="flex flex-1 justify-center bg-green-700 px-8 py-5 text-xs text-white">
                          Votar
                        </button>
                      </ConfirmDialog.Close>
                    </div>
                  </div>
                </>
              </ConfirmDialog.Content>
            </ConfirmDialog.Portal>
          </ConfirmDialog.Root>
        </Nominee.Root>

        <Nominee.Root>
          <Nominee.Picture
            src={'https://github.com/brunos3d.png'}
            alt="nominee"
            mask
          />

          <Nominee.Content>
            <Nominee.Title>Bruno Silva</Nominee.Title>
          </Nominee.Content>
        </Nominee.Root>

        <Nominee.Root>
          <Nominee.Picture
            src={'https://github.com/EliasGcf.png'}
            alt="nominee"
            mask
          />
          <Nominee.Content>
            <Nominee.Title>Elias Gabriel</Nominee.Title>
          </Nominee.Content>
        </Nominee.Root>

        <Nominee.Root>
          <Nominee.Picture
            src={'https://github.com/washingtonsoares.png'}
            alt="nominee"
            mask
          />
          <Nominee.Content>
            <Nominee.Title>Washington Soares</Nominee.Title>
          </Nominee.Content>
        </Nominee.Root>

        <Nominee.Root>
          <Nominee.Picture
            src={'https://github.com/lauragrassig.png'}
            alt="nominee"
            mask
          />
          <Nominee.Content>
            <Nominee.Title>Laura Grassi</Nominee.Title>
          </Nominee.Content>
        </Nominee.Root>
      </div>
    </>
  )
}

const Category = withAuth(CategoryPage)

export default Category
