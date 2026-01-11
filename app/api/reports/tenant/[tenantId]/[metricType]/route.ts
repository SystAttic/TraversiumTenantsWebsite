import { NextRequest, NextResponse } from 'next/server'

const REPORT_API_BASE_URL = process.env.NEXT_PUBLIC_REPORT_API_BASE_URL || process.env.REPORT_API_BASE_URL || 'http://localhost:8084'

export async function GET(
  request: NextRequest,
  { params }: { params: { tenantId: string; metricType: string } }
) {
  try {
    const { tenantId, metricType } = params
    const searchParams = request.nextUrl.searchParams
    const days = searchParams.get('days') || '30'

    // Validate metricType
    const validTypes = ['users', 'trips', 'media', 'social', 'pricing']
    if (!validTypes.includes(metricType)) {
      return NextResponse.json(
        { error: `Invalid metric type: ${metricType}` },
        { status: 400 }
      )
    }

    const url = metricType === 'pricing'
      ? `${REPORT_API_BASE_URL}/rest/v1/reports/tenant/${tenantId}/pricing`
      : `${REPORT_API_BASE_URL}/rest/v1/reports/tenant/${tenantId}/${metricType}?days=${days}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-Id': tenantId,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch ${metricType} metrics`, status: response.status },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error fetching ${params.metricType} metrics:`, error)
    return NextResponse.json(
      { error: `Failed to fetch ${params.metricType} metrics. The API server may be unavailable.` },
      { status: 503 }
    )
  }
}
