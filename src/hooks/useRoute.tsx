'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from './useAuth'
import { Loading } from '@/components/Loading'

export function withAuth(Component: React.ComponentType<any>) {
  const Wrapper = (props: any) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login')
      }
    }, [router, loading, user])

    if (loading || !user) {
      return <Loading />
    }

    return <Component {...props} />
  }

  return Wrapper
}

export function withPublic(Component: React.ComponentType<any>) {
  const Wrapper = (props: any) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (user) {
        router.push('/')
      }
    }, [router, user])

    if (loading) {
      return <Loading />
    }

    return <Component {...props} />
  }

  return Wrapper
}
