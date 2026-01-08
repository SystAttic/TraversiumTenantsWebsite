'use client'

import { useState, useEffect } from 'react'
import { getPricing, type Pricing } from '@/lib/reportApi'

export default function PricingPage() {
  const [pricing, setPricing] = useState<Pricing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tenantId = sessionStorage.getItem('tenantName')
        if (!tenantId) {
          setError('No tenant ID found in session')
          setLoading(false)
          return
        }

        const data = await getPricing(tenantId)
        setPricing(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pricing information')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
        {error}
      </div>
    )
  }

  if (!pricing) {
    return (
      <div className="text-dark-textMuted">No data available</div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Pricing & Billing</h1>
      
      <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Current Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-dark-bg3 rounded-lg">
            <p className="text-sm text-dark-textMuted mb-1">Base Cost</p>
            <p className="text-2xl font-bold text-white">${pricing.baseCost.toFixed(2)}/month</p>
          </div>
          <div className="p-4 bg-dark-bg3 rounded-lg">
            <p className="text-sm text-dark-textMuted mb-1">Per User</p>
            <p className="text-2xl font-bold text-white">${pricing.costPerUser.toFixed(2)}/user</p>
          </div>
          <div className="p-4 bg-dark-bg3 rounded-lg">
            <p className="text-sm text-dark-textMuted mb-1">Per GB Storage</p>
            <p className="text-2xl font-bold text-white">${pricing.costPerGB.toFixed(2)}/GB</p>
          </div>
          <div className="p-4 bg-dark-bg3 rounded-lg">
            <p className="text-sm text-dark-textMuted mb-1">Per 1000 API Calls</p>
            <p className="text-2xl font-bold text-white">${pricing.costPer1000ApiCalls.toFixed(2)}/1k</p>
          </div>
        </div>
      </div>

      <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Current Monthly Cost</h2>
        <div className="p-6 bg-dark-bg3 rounded-lg">
          <p className="text-sm text-dark-textMuted mb-2">Total Monthly Cost</p>
          <p className="text-4xl font-bold text-accent-primary">${pricing.currentMonthlyCost.toFixed(2)}</p>
          <p className="text-sm text-dark-textMuted mt-2">
            Last updated: {new Date(pricing.lastUpdated).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Cost Breakdown</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-dark-bg3 rounded-lg">
            <span className="text-white">Base Cost</span>
            <span className="text-accent-primary font-bold">${pricing.costBreakdown.baseCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-dark-bg3 rounded-lg">
            <span className="text-white">
              User Cost ({pricing.costBreakdown.totalUsers.toLocaleString()} users × ${pricing.costPerUser.toFixed(2)})
            </span>
            <span className="text-accent-primary font-bold">${pricing.costBreakdown.userCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-dark-bg3 rounded-lg">
            <span className="text-white">
              Storage Cost ({pricing.costBreakdown.totalStorageGB.toFixed(2)} GB × ${pricing.costPerGB.toFixed(2)})
            </span>
            <span className="text-accent-primary font-bold">${pricing.costBreakdown.storageCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-dark-bg3 rounded-lg">
            <span className="text-white">
              API Cost ({pricing.costBreakdown.totalApiCalls.toLocaleString()} calls × ${pricing.costPer1000ApiCalls.toFixed(2)}/1k)
            </span>
            <span className="text-accent-primary font-bold">${pricing.costBreakdown.apiCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-dark-bg3 rounded-lg border-t-2 border-accent-primary pt-4 mt-4">
            <span className="text-white text-lg font-semibold">Total Monthly Cost</span>
            <span className="text-accent-primary font-bold text-xl">${pricing.currentMonthlyCost.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6 mt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Total Cost</h2>
        <div className="p-4 bg-dark-bg3 rounded-lg">
          <p className="text-sm text-dark-textMuted mb-2">All-time Total Cost</p>
          <p className="text-3xl font-bold text-white">${pricing.totalCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
