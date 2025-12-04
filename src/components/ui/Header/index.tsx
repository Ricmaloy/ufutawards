'use client'

import { useState } from 'react'
import { ChartNoAxesCombined, LogOut, PencilLine } from 'lucide-react'
import { useLoadingCallback } from 'react-loading-hook'
import { signOut } from 'firebase/auth'
import { logout } from '@/api'
import { useAuth } from '@/app/auth/AuthContext'
import { getFirebaseAuth } from '@/app/auth/firebase'
import { Avatar, AvatarFallback, AvatarImage } from '../avatar'
import { Button } from '../button'
import { Separator } from '../separator'
import { useRouter } from 'next/navigation'

const adminEmails = ['ricardozamboni021@gmail.com']

export function Header() {
  const { user } = useAuth()
  const router = useRouter()

  const [hasLoggedOut, setHasLoggedOut] = useState(false)
  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth()
    await signOut(auth)
    await logout()

    router.refresh()

    setHasLoggedOut(true)
  })

  if (!user || !user.photoURL) {
    return null
  }

  function navigateToCreateCategory() {
    router.push('/create-category')
  }

  function navigateToResults() {
    router.push('/results')
  }

  return (
    <>
      <div className="max-w-[992px] w-full flex justify-between px-8">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-blue-700">
            <AvatarImage src={user.photoURL} />
            <AvatarFallback>{`${user.displayName?.split(' ')[0][0]}${user.displayName?.split(' ')[1][0]}`}</AvatarFallback>
          </Avatar>
          <span className="text-neutral-900 text-sm">{user.displayName}</span>
        </div>

        <div className="flex items-center gap-3">
          {adminEmails.includes(user.email ?? '') && (
            <Button
              onClick={navigateToCreateCategory}
              className="size-10 bg-neutral-100 border border-neutral-200 hover:bg-neutral-100"
            >
              <PencilLine className="size-4 text-neutral-900" />
            </Button>
          )}

          {adminEmails.includes(user.email ?? '') && (
            <Button
              onClick={navigateToResults}
              className="size-10 bg-neutral-100 border border-neutral-200 hover:bg-neutral-100"
            >
              <ChartNoAxesCombined className="size-4 text-neutral-900" />
            </Button>
          )}

          <Button
            disabled={isLogoutLoading || hasLoggedOut}
            onClick={handleLogout}
            className="size-10 bg-neutral-100 border border-neutral-200 hover:bg-neutral-100"
          >
            <LogOut className="size-4 text-neutral-900" />
          </Button>
        </div>
      </div>
      <Separator className="bg-neutral-200 mt-4" />
    </>
  )
}
