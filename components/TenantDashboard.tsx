'use client'

import { TenantReport, MetricPoint } from '@/app/admin/page'
import { useEffect, useRef } from 'react'

interface TenantDashboardProps {
  report: TenantReport
}

export default function TenantDashboard({ report }: TenantDashboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || report.metrics.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const chartWidth = width - 2 * padding
    const chartHeight = height - 2 * padding

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw axes
    ctx.strokeStyle = '#2A2E33'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw cost line
    if (report.metrics.length > 0) {
      const maxCost = Math.max(...report.metrics.map(m => m.cost), report.monthlyCost)
      const minCost = Math.min(...report.metrics.map(m => m.cost), 0)

      ctx.strokeStyle = '#F06565'
      ctx.lineWidth = 2
      ctx.beginPath()

      report.metrics.forEach((metric, index) => {
        const x = padding + (index / (report.metrics.length - 1)) * chartWidth
        const y = height - padding - ((metric.cost - minCost) / (maxCost - minCost || 1)) * chartHeight
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()
    }
  }, [report])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
          <h3 className="text-sm font-medium text-dark-textMuted mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-white">{formatNumber(report.totalUsers)}</p>
          <p className="text-sm text-dark-textMuted mt-1">
            {formatNumber(report.activeUsers)} active (last 30 days)
          </p>
        </div>

        <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
          <h3 className="text-sm font-medium text-dark-textMuted mb-2">Total Trips</h3>
          <p className="text-3xl font-bold text-white">{formatNumber(report.totalTrips)}</p>
        </div>

        <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
          <h3 className="text-sm font-medium text-dark-textMuted mb-2">Storage Used</h3>
          <p className="text-3xl font-bold text-white">
            {report.totalStorageGB.toFixed(2)} GB
          </p>
        </div>

        <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
          <h3 className="text-sm font-medium text-dark-textMuted mb-2">Monthly Cost</h3>
          <p className="text-3xl font-bold text-accent-primary">{formatCurrency(report.monthlyCost)}</p>
          <p className="text-sm text-dark-textMuted mt-1">
            Total: {formatCurrency(report.totalCost)}
          </p>
        </div>
      </div>

      {/* Cost Chart */}
      <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Cost Over Time</h2>
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full h-auto border border-dark-border rounded"
        />
        {report.metrics.length === 0 && (
          <p className="text-center text-dark-textMuted py-8">No historical data available</p>
        )}
      </div>

      {/* Additional Metrics */}
      <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Additional Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-dark-textMuted">Total API Calls</h3>
            <p className="text-2xl font-semibold text-white">{formatNumber(report.totalApiCalls)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-dark-textMuted">Last Updated</h3>
            <p className="text-lg text-white">
              {new Date(report.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Table */}
      {report.metrics.length > 0 && (
        <div className="bg-dark-bg2 rounded-lg border border-dark-border p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Historical Metrics</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-dark-border">
              <thead className="bg-dark-bg3">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-textMuted uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-textMuted uppercase">Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-textMuted uppercase">Trips</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-textMuted uppercase">Storage (GB)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-textMuted uppercase">Cost</th>
                </tr>
              </thead>
              <tbody className="bg-dark-bg2 divide-y divide-dark-border">
                {report.metrics.map((metric, index) => (
                  <tr key={index} className="hover:bg-dark-bg3 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(metric.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatNumber(metric.users)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatNumber(metric.trips)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {metric.storageGB.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-accent-primary">
                      {formatCurrency(metric.cost)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

