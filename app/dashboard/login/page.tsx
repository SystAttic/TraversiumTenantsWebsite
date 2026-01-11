'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    tenantName: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // TODO: Implement Firebase authentication
      // For now, we'll just store the tenant name and navigate
      // In production, you'd authenticate with Firebase using the tenant context
      
      // Store tenant info in sessionStorage
      sessionStorage.setItem('tenantName', formData.tenantName)
      sessionStorage.setItem('tenantEmail', formData.email)
      
      // Navigate to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="min-h-screen bg-dark-bg1">
      <Navigation />
      <div className="pt-20 pb-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-md mx-auto">
          <div className="bg-dark-bg2 rounded-lg border border-dark-border p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Tenant Dashboard</h1>
            <p className="text-dark-textMuted mb-8">Sign in to access your tenant dashboard</p>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="tenantName" className="block text-sm font-medium text-dark-textMuted mb-2">
                  Tenant Name *
                </label>
                <input
                  type="text"
                  id="tenantName"
                  name="tenantName"
                  required
                  value={formData.tenantName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-bg3 border border-dark-border rounded-md text-white placeholder-dark-textMuted focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  placeholder="Enter your tenant name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-textMuted mb-2">
                  Admin Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-bg3 border border-dark-border rounded-md text-white placeholder-dark-textMuted focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  placeholder="admin@company.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-dark-textMuted mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-bg3 border border-dark-border rounded-md text-white placeholder-dark-textMuted focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-accent-primary hover:bg-accent-primaryLight text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

