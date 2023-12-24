import type { Metadata } from 'next'
import { Epilogue } from 'next/font/google'

import './globals.css'
import { ContextTree } from '@/components/ContextTree'

const epilogue = Epilogue({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ufutaward',
  description: 'Os prêmios de melhores do ano da Bateria Ufuteria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <ContextTree>
        <body
          className={epilogue.className + ' flex justify-center bg-dark-900'}
        >
          <div>{children}</div>
        </body>
      </ContextTree>
    </html>
  )
}
