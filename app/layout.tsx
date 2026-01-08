import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Traversium Tenant Management',
  description: 'Manage tenants and tenant admin accounts',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

