/**
 * Instantly.ai API Integration
 * Documentation: https://developer.instantly.ai/
 */

const INSTANTLY_API_URL = 'https://api.instantly.ai/api/v1'

export interface InstantlyCampaign {
  id: string
  name: string
  status: number // 0 = draft, 1 = active, 2 = paused, 3 = completed
  created_at: string
  updated_at: string
}

export interface InstantlyAnalytics {
  campaign_id: string
  campaign_name: string
  total_leads: number
  contacted: number
  emails_sent: number
  emails_read: number
  emails_replied: number
  emails_bounced: number
  new_leads: number
  interested_leads: number
  not_interested_leads: number
  wrong_person_leads: number
  completed: number
}

export interface InstantlyLead {
  email: string
  first_name?: string
  last_name?: string
  company_name?: string
  personalization?: string
  phone?: string
  website?: string
  custom_variables?: Record<string, string>
}

class InstantlyApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'InstantlyApiError'
  }
}

async function instantlyFetch<T>(
  endpoint: string,
  apiKey: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${INSTANTLY_API_URL}${endpoint}`
  const separator = endpoint.includes('?') ? '&' : '?'
  const urlWithKey = `${url}${separator}api_key=${apiKey}`

  const response = await fetch(urlWithKey, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new InstantlyApiError(response.status, errorText)
  }

  return response.json()
}

/**
 * Fetch all campaigns for an account
 */
export async function fetchCampaigns(apiKey: string): Promise<InstantlyCampaign[]> {
  return instantlyFetch<InstantlyCampaign[]>('/campaign/list', apiKey)
}

/**
 * Fetch campaign details
 */
export async function fetchCampaign(
  apiKey: string,
  campaignId: string
): Promise<InstantlyCampaign> {
  return instantlyFetch<InstantlyCampaign>(
    `/campaign/get?campaign_id=${campaignId}`,
    apiKey
  )
}

/**
 * Fetch analytics for a specific campaign
 */
export async function fetchCampaignAnalytics(
  apiKey: string,
  campaignId: string
): Promise<InstantlyAnalytics> {
  return instantlyFetch<InstantlyAnalytics>(
    `/analytics/campaign/summary?campaign_id=${campaignId}`,
    apiKey
  )
}

/**
 * Fetch analytics for all campaigns (account level)
 */
export async function fetchAccountAnalytics(
  apiKey: string
): Promise<InstantlyAnalytics[]> {
  return instantlyFetch<InstantlyAnalytics[]>('/analytics/campaign/summary', apiKey)
}

/**
 * Pause a campaign
 */
export async function pauseCampaign(
  apiKey: string,
  campaignId: string
): Promise<{ status: string }> {
  return instantlyFetch<{ status: string }>(
    '/campaign/pause',
    apiKey,
    {
      method: 'POST',
      body: JSON.stringify({ campaign_id: campaignId }),
    }
  )
}

/**
 * Resume (activate) a campaign
 */
export async function resumeCampaign(
  apiKey: string,
  campaignId: string
): Promise<{ status: string }> {
  return instantlyFetch<{ status: string }>(
    '/campaign/activate',
    apiKey,
    {
      method: 'POST',
      body: JSON.stringify({ campaign_id: campaignId }),
    }
  )
}

/**
 * Add leads to a campaign
 */
export async function addLeadsToCampaign(
  apiKey: string,
  campaignId: string,
  leads: InstantlyLead[]
): Promise<{ leads_uploaded: number }> {
  return instantlyFetch<{ leads_uploaded: number }>(
    '/lead/add',
    apiKey,
    {
      method: 'POST',
      body: JSON.stringify({
        campaign_id: campaignId,
        skip_if_in_workspace: true,
        leads: leads,
      }),
    }
  )
}

/**
 * Get lead status from a campaign
 */
export async function getLeadStatus(
  apiKey: string,
  campaignId: string,
  email: string
): Promise<{ status: string; lead: InstantlyLead | null }> {
  return instantlyFetch<{ status: string; lead: InstantlyLead | null }>(
    `/lead/get?campaign_id=${campaignId}&email=${encodeURIComponent(email)}`,
    apiKey
  )
}

/**
 * Convert Instantly status code to readable status
 */
export function getStatusLabel(status: number): 'draft' | 'active' | 'paused' | 'completed' {
  switch (status) {
    case 0:
      return 'draft'
    case 1:
      return 'active'
    case 2:
      return 'paused'
    case 3:
      return 'completed'
    default:
      return 'draft'
  }
}

/**
 * Calculate metrics from analytics data
 */
export function calculateMetrics(analytics: InstantlyAnalytics) {
  const sent = analytics.emails_sent || 0
  const opened = analytics.emails_read || 0
  const replied = analytics.emails_replied || 0
  const bounced = analytics.emails_bounced || 0

  return {
    sent,
    opened,
    replied,
    bounced,
    delivered: sent - bounced,
    openRate: sent > 0 ? ((opened / sent) * 100).toFixed(1) : '0',
    replyRate: sent > 0 ? ((replied / sent) * 100).toFixed(1) : '0',
    bounceRate: sent > 0 ? ((bounced / sent) * 100).toFixed(1) : '0',
    deliverabilityRate: sent > 0 ? (((sent - bounced) / sent) * 100).toFixed(1) : '0',
  }
}

/**
 * Get metric status based on thresholds
 */
export function getMetricStatus(
  metric: 'deliverability' | 'openRate' | 'replyRate' | 'bounceRate' | 'complaintRate',
  value: number
): 'success' | 'warning' | 'critical' {
  const thresholds = {
    deliverability: { target: 90, warning: 85 },
    openRate: { target: 30, warning: 15 },
    replyRate: { target: 3, warning: 1 },
    bounceRate: { target: 2, warning: 5 }, // Inverted - lower is better
    complaintRate: { target: 0.05, warning: 0.1 }, // Inverted - lower is better
  }

  const threshold = thresholds[metric]

  if (metric === 'bounceRate' || metric === 'complaintRate') {
    // For these metrics, lower is better
    if (value <= threshold.target) return 'success'
    if (value <= threshold.warning) return 'warning'
    return 'critical'
  }

  // For other metrics, higher is better
  if (value >= threshold.target) return 'success'
  if (value >= threshold.warning) return 'warning'
  return 'critical'
}
