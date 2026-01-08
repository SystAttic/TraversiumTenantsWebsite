'use client'

import { useState } from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

interface CreateAdminUserFormProps {
  tenantId: string
  tenantName: string
  onSuccess: () => void
  onCancel: () => void
}

export default function CreateAdminUserForm({ tenantId, tenantName, onSuccess, onCancel }: CreateAdminUserFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/rest/v1/tenants/${tenantId}/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create admin user')
      }

      const result = await response.json()
      console.log('Admin user created:', result)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
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
    <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
      <h2 className="text-2xl font-bold mb-2 text-white">Create Admin User</h2>
      <p className="text-sm text-dark-textMuted mb-6">for {tenantName}</p>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark-textMuted mb-1">
            Admin Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-dark-bg3 border border-dark-border rounded-md text-white placeholder-dark-textMuted focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="admin@company.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-dark-textMuted mb-1">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            className="w-full px-3 py-2 bg-dark-bg3 border border-dark-border rounded-md text-white placeholder-dark-textMuted focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="Minimum 6 characters"
          />
        </div>

        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-dark-textMuted mb-1">
            Display Name *
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            required
            value={formData.displayName}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-dark-bg3 border border-dark-border rounded-md text-white placeholder-dark-textMuted focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="John Doe"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-dark-border rounded-md text-dark-textMuted hover:text-white hover:border-dark-textMuted transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-accent-primary hover:bg-accent-primaryLight text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating...' : 'Create Admin User'}
          </button>
        </div>
      </form>
    </div>
  )
}

