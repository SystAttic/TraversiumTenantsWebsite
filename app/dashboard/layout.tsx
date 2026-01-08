'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import DashboardSidebar from '@/components/DashboardSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [tenantName, setTenantName] = useState<string>('')

  useEffect(() => {
    // Check if user is logged in
    const storedTenantName = sessionStorage.getItem('tenantName')
    
    if (pathname === '/dashboard') {
      // If accessing /dashboard directly, check session
      if (!storedTenantName) {
        // No session, redirect to login
        router.push('/dashboard/login')
      } else {
        // Has session, stay on home page
        setTenantName(storedTenantName)
      }
    } else if (pathname === '/dashboard/login') {
      // If on login page and already logged in, redirect to home
      if (storedTenantName) {
        router.push('/dashboard')
      }
    } else {
      // Other dashboard pages - require authentication
      if (!storedTenantName) {
        router.push('/dashboard/login')
      } else {
        setTenantName(storedTenantName)
      }
    }
  }, [router, pathname])

  const handleLogout = () => {
    sessionStorage.removeItem('tenantName')
    sessionStorage.removeItem('tenantEmail')
    router.push('/dashboard/login')
  }

  // Don't show sidebar on login page
  if (pathname === '/dashboard/login') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-dark-bg1">
      <DashboardSidebar tenantName={tenantName} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

