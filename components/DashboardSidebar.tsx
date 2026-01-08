'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DashboardSidebarProps {
  tenantName: string
  onLogout: () => void
}

export default function DashboardSidebar({ tenantName, onLogout }: DashboardSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: '🏠' },
    { href: '/dashboard/pricing', label: 'Pricing', icon: '💰' },
    { href: '/dashboard/users', label: 'Users', icon: '👥' },
    { href: '/dashboard/trips', label: 'Trips', icon: '✈️' },
    { href: '/dashboard/media', label: 'Media', icon: '📸' },
    { href: '/dashboard/social', label: 'Social', icon: '💬' },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname?.startsWith(href)
  }

  return (
    <div className="h-screen w-64 bg-dark-bg2 border-r border-dark-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-dark-border">
        <h2 className="text-xl font-bold text-white mb-1">Tenant Dashboard</h2>
        <p className="text-sm text-dark-textMuted truncate">{tenantName}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                    : 'text-dark-textMuted hover:text-white hover:bg-dark-bg3'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-dark-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <span className="text-lg">🚪</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

