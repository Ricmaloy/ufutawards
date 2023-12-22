import { useState, createContext, useEffect, ReactNode } from 'react'
import {
  getRedirectResult,
  signInWithRedirect,
  signOut as LogOff,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, provider } from '../lib/firebase'
import { useRouter } from 'next/navigation'
import router from 'next/router'

type User = {
  id: string
  name: string
  avatar: string
  email: string
}

type AuthContextType = {
  user: User | undefined
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  console.log({ user })

  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return
      }

      await fetch('/api/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          const userData = {
            id: userCred.user.uid,
            name: userCred.user.displayName,
            avatar: userCred.user.photoURL,
            email: userCred.user.email,
          }
          setUser(userData as User)

          router.push('/')
        }
      })
    })

    return () => {
      getRedirectResult(auth)
    }
  }, [router])

  async function signIn() {
    signInWithRedirect(auth, provider)
  }

  async function signOut() {
    await LogOff(auth)

    const response = await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
    })

    if (response.status === 200) {
      router.push('/login')
    }
  }

  return (
    <AuthContext.Provider value={{ loading, signIn, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}
