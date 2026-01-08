'use client'

import { useState, useEffect } from 'react'
import { getMediaMetrics, type MediaMetrics } from '@/lib/reportApi'

export default function MediaPage() {
  const [metrics, setMetrics] = useState<MediaMetrics | null>(null)
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

        const data = await getMediaMetrics(tenantId, 30)
        setMetrics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load media metrics')
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

  if (!metrics) {
    return (
      <div className="text-dark-textMuted">No data available</div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Media</h1>
      
      <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Media Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-dark-bg3 rounded-lg">
            <p className="text-sm text-dark-textMuted mb-1">Total Media Files</p>
            <p className="text-3xl font-bold text-accent-primary">{metrics.totalMedia.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-dark-bg3 rounded-lg">
            <p className="text-sm text-dark-textMuted mb-1">Media This Month</p>
            <p className="text-3xl font-bold text-accent-primary">{metrics.mediaThisMonth.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-dark-bg3 rounded-lg">
            <p className="text-sm text-dark-textMuted mb-1">Total Storage</p>
            <p className="text-3xl font-bold text-accent-primary">{metrics.totalStorageGB.toFixed(2)} GB</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-dark-bg3 rounded-lg">
            <span className="text-white">Total Media Files</span>
            <span className="text-accent-primary font-bold">{metrics.totalMedia.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-dark-bg3 rounded-lg">
            <span className="text-white">Media This Month</span>
            <span className="text-accent-primary font-bold">{metrics.mediaThisMonth.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-dark-bg3 rounded-lg">
            <span className="text-white">Media in Period (30 days)</span>
            <span className="text-accent-primary font-bold">{metrics.mediaInPeriod.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-dark-bg3 rounded-lg">
            <span className="text-white">Total Storage</span>
            <span className="text-accent-primary font-bold">{metrics.totalStorageGB.toFixed(2)} GB</span>
          </div>
        </div>
      </div>

      {metrics.metrics && metrics.metrics.length > 0 && (
        <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Media Growth Over Time</h2>
          <p className="text-dark-textMuted text-sm mb-4">
            Last updated: {new Date(metrics.lastUpdated).toLocaleString()}
          </p>
          <div className="space-y-2">
            {metrics.metrics.slice(-10).map((point, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-dark-bg3 rounded-lg">
                <span className="text-white text-sm">
                  {new Date(point.date).toLocaleDateString()}
                </span>
                <div className="flex gap-4">
                  <span className="text-dark-textMuted text-sm">
                    Total: <span className="text-white font-semibold">{point.totalMedia.toLocaleString()}</span>
                  </span>
                  <span className="text-dark-textMuted text-sm">
                    New: <span className="text-green-400 font-semibold">+{point.newMedia.toLocaleString()}</span>
                  </span>
                  <span className="text-dark-textMuted text-sm">
                    Storage: <span className="text-white font-semibold">{point.storageGB.toFixed(2)} GB</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
