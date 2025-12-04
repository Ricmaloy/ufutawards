export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-neutral-100">
      {children}
    </div>
  )
}
