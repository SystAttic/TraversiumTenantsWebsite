'use client'

import { useState } from 'react'
import { Tenant } from '@/app/page'
import CreateAdminUserForm from './CreateAdminUserForm'

interface TenantListProps {
  tenants: Tenant[]
  onRefresh: () => void
}

export default function TenantList({ tenants, onRefresh }: TenantListProps) {
  const [showAdminForm, setShowAdminForm] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleAdminCreated = () => {
    setShowAdminForm(null)
    onRefresh()
  }

  if (tenants.length === 0) {
    return (
      <div className="bg-dark-bg2 rounded-lg border border-dark-border p-12 text-center">
        <p className="text-dark-textMuted text-lg">No tenants found. Create your first tenant to get started.</p>
      </div>
    )
  }

  return (
    <div className="bg-dark-bg2 rounded-lg border border-dark-border overflow-hidden">
      <div className="px-6 py-4 border-b border-dark-border flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">All Tenants</h2>
        <button
          onClick={onRefresh}
          className="text-accent-primary hover:text-accent-primaryLight text-sm font-medium transition-colors"
        >
          Refresh
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-dark-border">
          <thead className="bg-dark-bg3">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-textMuted uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-textMuted uppercase tracking-wider">
                Domain
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-textMuted uppercase tracking-wider">
                Admin Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-textMuted uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-textMuted uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-textMuted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark-bg2 divide-y divide-dark-border">
            {tenants.map((tenant) => (
              <>
                <tr key={tenant.id} className="hover:bg-dark-bg3 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{tenant.name}</div>
                    {tenant.description && (
                      <div className="text-sm text-dark-textMuted">{tenant.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      <a
                        href={`https://${tenant.domain}.traversium.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-primary hover:text-accent-primaryLight transition-colors"
                      >
                        {tenant.domain}.traversium.com
                      </a>
                    </div>
                    <div className="text-xs text-dark-textMuted">ID: {tenant.tenantId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{tenant.adminEmail || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{formatDate(tenant.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        tenant.isActive
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {tenant.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {tenant.adminEmail ? (
                      <span className="text-sm text-dark-textMuted">Admin exists</span>
                    ) : (
                      <button
                        onClick={() => setShowAdminForm(showAdminForm === tenant.tenantId ? null : tenant.tenantId)}
                        className="text-sm text-accent-primary hover:text-accent-primaryLight font-medium transition-colors"
                      >
                        Create Admin
                      </button>
                    )}
                  </td>
                </tr>
                {showAdminForm === tenant.tenantId && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4">
                      <CreateAdminUserForm
                        tenantId={tenant.tenantId}
                        tenantName={tenant.name}
                        onSuccess={handleAdminCreated}
                        onCancel={() => setShowAdminForm(null)}
                      />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

