'use client'

import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Divider } from '../Divider'

export function Header() {
  const { signOut, loading, user } = useAuth()

  if (!user) {
    return
  }

  return (
    <>
      {!loading && (
        <>
          <header className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-ocean-700">
                <Image
                  src={user?.avatar}
                  width={48}
                  height={48}
                  alt="Profile picture"
                  className="rounded-full"
                />
              </div>
              <span className="text-sm text-white">{user.name}</span>
            </div>

            <button
              onClick={signOut}
              className="flex h-9 w-9 cursor-pointer items-center justify-center"
            >
              <LogOut className="h-4 w-4 text-white" />
            </button>
          </header>
          <Divider />
        </>
      )}
    </>
  )
}
