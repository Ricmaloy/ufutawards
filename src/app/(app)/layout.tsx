import { Header } from '@/components/ui/Header'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen flex flex-col items-center py-4 bg-neutral-100 scrollbar-thin">
      <Header />
      <div className="max-w-[992px] w-full px-8">{children}</div>
    </div>
  )
}
