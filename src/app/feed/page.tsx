'use client'

import { Divider } from '@/components/Divider'

import * as Category from '@/components/Category'
import { AwardIcon } from '@/images/Award'
import { Progress } from '@/components/Progress'

export default function Home() {
  return (
    <>
      <Progress />

      <Divider />

      <h1 className="mt-10 text-xl font-bold text-white">Categorias</h1>
      <span className="mb-8 text-sm text-white">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </span>

      <div className="mt-8 grid grid-cols-display gap-3">
        <Category.Root href={'/category/caixa'}>
          <AwardIcon />
          <Category.Checkmark />
          <Category.Title>Melhor caixa</Category.Title>
          <Category.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Category.Description>
          <Category.Counter indicates={9} />
        </Category.Root>

        <Category.Root href={'/category/repique'}>
          <AwardIcon />
          <Category.Checkmark />
          <Category.Title>Melhor repique</Category.Title>
          <Category.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Category.Description>
          <Category.Counter indicates={9} />
        </Category.Root>

        <Category.Root href={'/category/tamborim'}>
          <AwardIcon />
          <Category.Checkmark />
          <Category.Title>Melhor tamborim</Category.Title>
          <Category.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Category.Description>
          <Category.Counter indicates={9} />
        </Category.Root>

        <Category.Root href={'/category/chocalho'}>
          <AwardIcon />
          <Category.Title>Melhor chocalho</Category.Title>
          <Category.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Category.Description>
          <Category.Counter indicates={9} />
        </Category.Root>

        <Category.Root href={'/category/marcacao'}>
          <AwardIcon />
          <Category.Title>Melhor marcação</Category.Title>
          <Category.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Category.Description>
          <Category.Counter indicates={9} />
        </Category.Root>
      </div>

      <h1 className="mt-10 text-xl font-bold text-white">Lado B</h1>
      <span className="mb-8 text-sm text-white">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </span>

      <div className="mt-8 grid grid-cols-display gap-3">
        <Category.Root href={'/category/fantasia'}>
          <AwardIcon />
          <Category.Checkmark />
          <Category.Title>Melhor fantasia</Category.Title>
          <Category.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Category.Description>
          <Category.Counter indicates={9} />
        </Category.Root>

        <Category.Root href={'/category/bocaverde'}>
          <AwardIcon />
          <Category.Checkmark />
          <Category.Title>Boquinha verde</Category.Title>
          <Category.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Category.Description>
          <Category.Counter indicates={9} />
        </Category.Root>

        <Category.Root href={'/category/fumanterevelacao'}>
          <AwardIcon />
          <Category.Title>Fumante revelação</Category.Title>
          <Category.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Category.Description>
          <Category.Counter indicates={9} />
        </Category.Root>

        <Category.Root href={'/category/bongaydorme'}>
          <AwardIcon />
          <Category.Title>Bonga y dorme</Category.Title>
          <Category.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Category.Description>
          <Category.Counter indicates={9} />
        </Category.Root>
      </div>
    </>
  )
}
