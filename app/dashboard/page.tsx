'use client'

import { useState, useEffect } from 'react'
import { getTenantReport } from '@/lib/reportApi'

export default function DashboardHome() {
  const [report, setReport] = useState<any>(null)
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

        const data = await getTenantReport(tenantId, 30)
        setReport(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
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

  if (!report) {
    return (
      <div className="text-dark-textMuted">No data available</div>
    )
  }

  // Calculate this month's new users and trips from metrics
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const thisMonthMetrics = report.metrics?.filter((m: any) => {
    const metricDate = new Date(m.date)
    return metricDate >= startOfMonth
  }) || []

  const newUsersThisMonth = thisMonthMetrics.length > 0 
    ? thisMonthMetrics[thisMonthMetrics.length - 1]?.users - (thisMonthMetrics[0]?.users || 0)
    : 0

  const tripsThisMonth = thisMonthMetrics.length > 0
    ? thisMonthMetrics[thisMonthMetrics.length - 1]?.trips - (thisMonthMetrics[0]?.trips || 0)
    : 0

  const mediaThisMonth = report.metrics?.length > 0
    ? report.metrics[report.metrics.length - 1]?.storageGB - (report.metrics[0]?.storageGB || 0)
    : 0

  const statCards = [
    {
      title: 'Active Users',
      value: report.activeUsers || 0,
      change: `+${newUsersThisMonth} this month`,
      icon: '👥',
      color: 'text-blue-400',
    },
    {
      title: 'Total Trips',
      value: report.totalTrips || 0,
      change: `+${tripsThisMonth} this month`,
      icon: '✈️',
      color: 'text-green-400',
    },
    {
      title: 'Storage',
      value: `${(report.totalStorageGB || 0).toFixed(2)} GB`,
      change: `+${mediaThisMonth.toFixed(2)} GB this month`,
      icon: '📸',
      color: 'text-purple-400',
    },
    {
      title: 'Monthly Cost',
      value: `$${(report.monthlyCost || 0).toFixed(2)}`,
      change: 'Current billing period',
      icon: '💰',
      color: 'text-yellow-400',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-dark-bg2 rounded-lg border border-dark-border p-6 hover:border-accent-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{card.icon}</span>
              <span className={`text-2xl font-bold ${card.color}`}>{card.value}</span>
            </div>
            <h3 className="text-sm font-medium text-dark-textMuted mb-1">{card.title}</h3>
            <p className="text-xs text-dark-textMuted">{card.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-bg3 rounded-lg">
            <p className="text-sm text-dark-textMuted mb-1">Total Users</p>
            <p className="text-2xl font-bold text-white">{report.totalUsers || 0}</p>
          </div>
          <div className="p-4 bg-dark-bg3 rounded-lg">
            <p className="text-sm text-dark-textMuted mb-1">Total API Calls</p>
            <p className="text-2xl font-bold text-white">{report.totalApiCalls?.toLocaleString() || 0}</p>
          </div>
          <div className="p-4 bg-dark-bg3 rounded-lg">
            <p className="text-sm text-dark-textMuted mb-1">Total Cost</p>
            <p className="text-2xl font-bold text-white">${(report.totalCost || 0).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
