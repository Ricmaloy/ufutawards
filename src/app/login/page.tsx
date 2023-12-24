'use client'

import { Divider } from '@/components/Divider'
import { GoogleIcon } from '@/images/Google'

import * as Carrousel from '@/components/Carrousel'
import GroupAward from '@/images/GroupAward'
import Achievement from '@/images/Achievement'
import { withPublic } from '@/hooks/useRoute'
import { useAuth } from '@/hooks/useAuth'

const LoginPage = () => {
  const { signInWithGoogle } = useAuth()

  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="flex h-full max-h-[573px] w-full max-w-[928px]">
        <div className="flex w-full max-w-[360px] flex-col justify-between bg-dark-400 px-11 py-8">
          <h1 className="text-center text-3xl font-bold text-white">
            Ufutawards
          </h1>

          <div className="flex flex-col">
            <h3 className="mb-2 text-2xl font-bold text-white">Login</h3>
            <p className="text-sm text-gray-400">
              Para votar nos melhores do ano entre com sua conta Google abaixo!
            </p>
            <button
              onClick={signInWithGoogle}
              className="my-8 flex items-center justify-center gap-3 rounded bg-ocean-700 py-4 text-center text-sm font-bold text-white"
            >
              <GoogleIcon />
              Entrar com Google
            </button>
            <Divider />
            <span className="text-[10px] text-gray-400">versão 0.0.2</span>
          </div>
        </div>

        <Carrousel.Root>
          <Carrousel.Display id="1">
            <GroupAward />
            <p className="text-center text-white">
              Vote nos seus preferidos para a maior premiação de Baterias
              Universitárias
            </p>
          </Carrousel.Display>

          <Carrousel.Display id="2">
            <Achievement />
            <p className="text-center text-white">
              Se consagre como um dos melhores de uma categoria no ano !
            </p>
          </Carrousel.Display>

          <Carrousel.Menu>
            <Carrousel.Chevron side="left" />

            <Carrousel.Bar id="1" />
            <Carrousel.Bar id="2" />

            <Carrousel.Chevron side="right" />
          </Carrousel.Menu>
        </Carrousel.Root>
        {/* <div className="flex w-full max-w-[552px] flex-col bg-dark-200 py-11">
          <div className="flex flex-1 flex-col">
            <p>
              Vote nos seus preferidos para a maior premiação de Baterias
              Universitárias
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <ChevronLeft
              className="cursor-pointer text-gray-400"
              onClick={carrouselClickChange}
            />

            <div className="flex items-center gap-1">
              <div className={bar()} />
              <div className="h-1 w-10 rounded bg-ocean-700" />
            </div>

            <ChevronRight
              className="cursor-pointer text-gray-400"
              onClick={carrouselClickChange}
            />
          </div>
        </div> */}
      </div>
    </div>
  )
}

const Login = withPublic(LoginPage)

export default Login
