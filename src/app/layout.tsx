import './globals.css'
import { Metadata } from 'next'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { authConfig } from '../config/server-config'
import { AuthProvider } from './auth/AuthProvider'
import { toUser } from './shared/user'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tokens = await getTokens(await cookies(), authConfig)
  const user = tokens ? toUser(tokens) : null

  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider user={user}>{children}</AuthProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Ufutawards 🏆',
  description:
    'Vote nos indicados para a maior premiação da Bateria Ufuteria !',
  icons: '/icon.svg',
  openGraph: {
    title: 'Ufutawards 🏆',
    description: 'A maior premiação da Você Sabe Company!',
    images: '/opengraph-image.png',
  },
}
