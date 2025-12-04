'use client'

import { useState } from 'react'
import { UserCredential } from 'firebase/auth'
import { useLoadingCallback } from 'react-loading-hook'
import { Trophy, LogIn } from 'lucide-react'
import Banner from '@/assets/banner.png'
import { loginWithCredential } from '@/api'
import { LoadingIcon } from '@/components/ui/icons'
import { getFirebaseAuth } from '../auth/firebase'
import { useRedirectAfterLogin } from '../shared/useRedirectAfterLogin'
import { useRedirectParam } from '../shared/useRedirectParam'
import { getGoogleProvider, loginWithProvider } from './firebase'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
export function LoginPage() {
  const [hasLogged, setHasLogged] = useState(false)
  const redirect = useRedirectParam()
  const redirectAfterLogin = useRedirectAfterLogin()

  async function handleLogin(credential: UserCredential) {
    await loginWithCredential(credential)
    redirectAfterLogin()
  }

  const [handleLoginWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {
      setHasLogged(false)

      const auth = getFirebaseAuth()
      await handleLogin(await loginWithProvider(auth, getGoogleProvider(auth)))

      setHasLogged(true)
    })

  return (
    <Card className="md:w-[1020px] md:h-[600px] max-w-full flex border border-neutral-400 rounded overflow-hidden">
      <div className="hidden md:flex flex-1 flex-col justify-between bg-neutral-300 object-cover">
        <Image
          src={Banner}
          alt="Banner image"
          className="self-center h-full object-cover"
        />
      </div>

      <div className="flex-1 flex justify-center items-center p-4 bg-neutral-100">
        {!hasLogged && (
          <div className="md:w-80 flex flex-col gap-2">
            <>
              <CardTitle className="text-neutral-900 text-2xl">
                Entrar
              </CardTitle>
              <CardDescription className="text-neutral-900 text-sm">
                Para votar nos melhores do ano entre com sua conta Google abaixo
                !
              </CardDescription>
              <CardContent className="p-0 mt-7 flex flex-col gap-3">
                <Button
                  // loading={isGoogleLoading}
                  className="w-full bg-neutral-100 border border-neutral-300 text-neutral-100 text-neutral-900 hover:bg-neutral-200"
                  disabled={isGoogleLoading}
                  onClick={handleLoginWithGoogle}
                >
                  <LogIn />
                  Entrar com Google
                </Button>
                {googleError && <span>{googleError}</span>}
              </CardContent>
            </>
          </div>
        )}
        {hasLogged && (
          <div className="flex items-center gap-4 mb-6">
            <span>
              Içando ancoras...
            </span>
            <LoadingIcon />
          </div>
        )}
      </div>
    </Card>
  )
}
