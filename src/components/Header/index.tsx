'use client'

import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { Divider } from '../Divider'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { signOut } = useAuth()
  return (
    <>
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-ocean-700">
            <Image
              src={'https://github.com/ricmaloy.png'}
              width={48}
              height={48}
              alt="Profile picture"
              className="rounded-full"
            />
          </div>
          <span className="text-sm text-white">Ricardo Zamboni</span>
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
  )
}
