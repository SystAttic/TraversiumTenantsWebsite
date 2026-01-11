export interface TenantReport {
  tenantId: string
  totalUsers: number
  activeUsers: number
  totalTrips: number
  totalStorageGB: number
  totalApiCalls: number
  monthlyCost: number
  totalCost: number
  lastUpdated: string
  metrics: MetricPoint[]
}

export interface MetricPoint {
  date: string
  users: number
  trips: number
  storageGB: number
  cost: number
}

export interface UserMetrics {
  tenantId: string
  totalUsers: number
  activeUsers: number
  newUsersThisMonth: number
  newUsersInPeriod: number
  lastUpdated: string
  metrics: UserMetricPoint[]
}

export interface UserMetricPoint {
  date: string
  totalUsers: number
  activeUsers: number
  newUsers: number
}

export interface TripMetrics {
  tenantId: string
  totalTrips: number
  tripsThisMonth: number
  tripsInPeriod: number
  lastUpdated: string
  metrics: TripMetricPoint[]
}

export interface TripMetricPoint {
  date: string
  totalTrips: number
  newTrips: number
}

export interface MediaMetrics {
  tenantId: string
  totalMedia: number
  mediaThisMonth: number
  mediaInPeriod: number
  totalStorageGB: number
  lastUpdated: string
  metrics: MediaMetricPoint[]
}

export interface MediaMetricPoint {
  date: string
  totalMedia: number
  newMedia: number
  storageGB: number
}

export interface SocialMetrics {
  tenantId: string
  totalLikes: number
  totalComments: number
  totalInteractions: number
  interactionsThisMonth: number
  interactionsInPeriod: number
  lastUpdated: string
  metrics: SocialMetricPoint[]
}

export interface SocialMetricPoint {
  date: string
  likes: number
  comments: number
  totalInteractions: number
}

export interface Pricing {
  tenantId: string
  baseCost: number
  costPerUser: number
  costPerGB: number
  costPer1000ApiCalls: number
  currentMonthlyCost: number
  totalCost: number
  costBreakdown: CostBreakdown
  lastUpdated: string
}

export interface CostBreakdown {
  baseCost: number
  userCost: number
  storageCost: number
  apiCost: number
  totalUsers: number
  totalStorageGB: number
  totalApiCalls: number
}

export async function getTenantReport(tenantId: string, days: number = 30): Promise<TenantReport> {
  const response = await fetch(`/api/reports/tenant/${tenantId}?days=${days}`)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to fetch tenant report' }))
    throw new Error(errorData.error || `Failed to fetch tenant report: ${response.statusText}`)
  }
  
  return response.json()
}

export async function getUserMetrics(tenantId: string, days: number = 30): Promise<UserMetrics> {
  const response = await fetch(`/api/reports/tenant/${tenantId}/users?days=${days}`)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to fetch user metrics' }))
    throw new Error(errorData.error || `Failed to fetch user metrics: ${response.statusText}`)
  }
  
  return response.json()
}

export async function getTripMetrics(tenantId: string, days: number = 30): Promise<TripMetrics> {
  const response = await fetch(`/api/reports/tenant/${tenantId}/trips?days=${days}`)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to fetch trip metrics' }))
    throw new Error(errorData.error || `Failed to fetch trip metrics: ${response.statusText}`)
  }
  
  return response.json()
}

export async function getMediaMetrics(tenantId: string, days: number = 30): Promise<MediaMetrics> {
  const response = await fetch(`/api/reports/tenant/${tenantId}/media?days=${days}`)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to fetch media metrics' }))
    throw new Error(errorData.error || `Failed to fetch media metrics: ${response.statusText}`)
  }
  
  return response.json()
}

export async function getSocialMetrics(tenantId: string, days: number = 30): Promise<SocialMetrics> {
  const response = await fetch(`/api/reports/tenant/${tenantId}/social?days=${days}`)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to fetch social metrics' }))
    throw new Error(errorData.error || `Failed to fetch social metrics: ${response.statusText}`)
  }
  
  return response.json()
}

export async function getPricing(tenantId: string): Promise<Pricing> {
  const response = await fetch(`/api/reports/tenant/${tenantId}/pricing`)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to fetch pricing' }))
    throw new Error(errorData.error || `Failed to fetch pricing: ${response.statusText}`)
  }
  
  return response.json()
}

