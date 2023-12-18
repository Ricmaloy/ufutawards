'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import * as Nominee from '@/components/Nominee'

export default function CategoryPage({ params }: { params: { slug: string } }) {
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
          <Nominee.Checkmark />
          <Nominee.Picture
            src={'https://github.com/ricmaloy.png'}
            alt="nominee"
          />
          <Nominee.Content chosen>
            <Nominee.Title>Ricardo Zamboni</Nominee.Title>
          </Nominee.Content>
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
