'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import TenantList from '@/components/TenantList'
import CreateTenantForm from '@/components/CreateTenantForm'

export interface Tenant {
  id: number
  tenantId: string
  name: string
  description: string | null
  domain: string
  createdAt: string
  adminEmail: string | null
  isActive: boolean
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

export default function Home() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTenants = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/rest/v1/tenants`)
      if (!response.ok) {
        throw new Error('Failed to fetch tenants')
      }
      const data = await response.json()
      setTenants(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTenants()
  }, [])

  const handleTenantCreated = () => {
    setShowCreateForm(false)
    fetchTenants()
  }

  return (
    <main className="min-h-screen bg-dark-bg1">
      <Navigation />
      <div className="pt-20 pb-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Tenant Management</h1>
              <p className="text-dark-textMuted">Create and manage tenants for the Traversium platform</p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-6 py-2.5 bg-accent-primary hover:bg-accent-primaryLight rounded-lg text-white font-medium transition-colors"
            >
              {showCreateForm ? 'Cancel' : 'Create New Tenant'}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {showCreateForm && (
            <div className="mb-8">
              <CreateTenantForm
                onSuccess={handleTenantCreated}
                onCancel={() => setShowCreateForm(false)}
              />
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
              <p className="mt-4 text-dark-textMuted">Loading tenants...</p>
            </div>
          ) : (
            <TenantList tenants={tenants} onRefresh={fetchTenants} />
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

