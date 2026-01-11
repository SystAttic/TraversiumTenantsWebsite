import { NextRequest, NextResponse } from 'next/server'

const REPORT_API_BASE_URL = process.env.NEXT_PUBLIC_REPORT_API_BASE_URL || process.env.REPORT_API_BASE_URL || 'http://localhost:8084'

export async function GET(
  request: NextRequest,
  { params }: { params: { tenantId: string } }
) {
  try {
    const { tenantId } = params
    const searchParams = request.nextUrl.searchParams
    const days = searchParams.get('days') || '30'

    const response = await fetch(
      `${REPORT_API_BASE_URL}/rest/v1/reports/tenant/${tenantId}?days=${days}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-Id': tenantId,
        },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch tenant report', status: response.status },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching tenant report:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tenant report. The API server may be unavailable.' },
      { status: 503 }
    )
  }
}
