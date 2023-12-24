'use client'

import { useState, createContext, useEffect, ReactNode } from 'react'
import { auth, firebase } from '../services/firebase'

type User = {
  id: string
  name: string
  avatar: string
  email: string
}

type AuthContextType = {
  user: User | undefined
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isNewUser, setIsNewUser] = useState<boolean | undefined>()

  console.log(user)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true)

      if (user) {
        const { displayName, photoURL, uid, email } = user

        if (!displayName || !photoURL || !email) {
          throw new Error('Missing information from Google Account!')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          email,
        })
      }

      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [loading])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if (result.user && result.additionalUserInfo) {
      const { displayName, photoURL, uid, email } = result.user
      const { isNewUser } = result.additionalUserInfo

      if (!displayName || !photoURL || !email) {
        throw new Error('Missing information from Google Account!')
      }

      setIsNewUser(isNewUser)
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email,
      })
    }
  }

  async function signOut() {
    setUser(undefined)
    auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
