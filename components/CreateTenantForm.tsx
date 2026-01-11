'use client'

import { useState } from 'react'

interface CreateTenantFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export default function CreateTenantForm({ onSuccess, onCancel }: CreateTenantFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to create tenant' }))
        throw new Error(errorData.error || errorData.message || 'Failed to create tenant')
      }

      const tenant = await response.json()
      console.log('Tenant created:', tenant)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Create New Tenant</h2>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dark-textMuted mb-1">
            Tenant Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={4}
            maxLength={20}
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-dark-bg3 border border-dark-border rounded-md text-white placeholder-dark-textMuted focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="e.g., company-name"
          />
          <p className="mt-1 text-sm text-dark-textMuted">
            4-20 characters, lowercase letters, numbers, and hyphens only. Firebase will generate the tenant ID.
          </p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-dark-textMuted mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 bg-dark-bg3 border border-dark-border rounded-md text-white placeholder-dark-textMuted focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="Optional description of the tenant"
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
            {loading ? 'Creating...' : 'Create Tenant'}
          </button>
        </div>
      </form>
    </div>
  )
}

