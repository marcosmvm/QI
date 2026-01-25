import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
})

export interface PlanConfig {
  name: string
  priceId: string
  setupFee: number
  monthlyFee: number
  features: string[]
}

export const PLANS: Record<string, PlanConfig> = {
  pilot: {
    name: 'Pilot',
    priceId: '', // Configure in Stripe dashboard
    setupFee: 2000,
    monthlyFee: 1500,
    features: [
      '30-day pilot program',
      'Full AI engine access',
      'Dedicated onboarding',
      'Weekly performance calls',
      '10 guaranteed meetings',
    ],
  },
  starter: {
    name: 'Starter',
    priceId: '', // Configure in Stripe dashboard
    setupFee: 8000,
    monthlyFee: 3000,
    features: [
      'Unlimited campaigns',
      'All 11 AI engines',
      'Priority support',
      'Monthly strategy calls',
      'Custom reporting',
    ],
  },
  growth: {
    name: 'Growth',
    priceId: '', // Configure in Stripe dashboard
    setupFee: 0,
    monthlyFee: 5000,
    features: [
      'Everything in Starter',
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      'White-glove service',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    priceId: '', // Configure in Stripe dashboard
    setupFee: 0,
    monthlyFee: 0, // Custom pricing
    features: [
      'Everything in Growth',
      'Custom AI training',
      'Multiple workspaces',
      'SLA guarantees',
      'Dedicated infrastructure',
    ],
  },
}

/**
 * Create a Stripe customer for an organization
 */
export async function createCustomer(
  email: string,
  name: string,
  metadata: { organizationId: string }
): Promise<Stripe.Customer> {
  return stripe.customers.create({
    email,
    name,
    metadata,
  })
}

/**
 * Create a checkout session for a new subscription
 */
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  metadata: Record<string, string> = {}
): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  })
}

/**
 * Create a customer portal session
 */
export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

/**
 * Get a customer's subscriptions
 */
export async function getSubscriptions(
  customerId: string
): Promise<Stripe.Subscription[]> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
  })
  return subscriptions.data
}

/**
 * Get a customer's invoices
 */
export async function getInvoices(
  customerId: string,
  limit = 10
): Promise<Stripe.Invoice[]> {
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit,
  })
  return invoices.data
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string,
  immediately = false
): Promise<Stripe.Subscription> {
  if (immediately) {
    return stripe.subscriptions.cancel(subscriptionId)
  }
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })
}

/**
 * Format amount from cents to dollars
 */
export function formatAmount(amountInCents: number): string {
  return (amountInCents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

/**
 * Get subscription status display info
 */
export function getSubscriptionStatusInfo(status: Stripe.Subscription.Status): {
  label: string
  color: 'success' | 'warning' | 'error' | 'default'
} {
  switch (status) {
    case 'active':
      return { label: 'Active', color: 'success' }
    case 'trialing':
      return { label: 'Trial', color: 'default' }
    case 'past_due':
      return { label: 'Past Due', color: 'warning' }
    case 'canceled':
      return { label: 'Canceled', color: 'error' }
    case 'incomplete':
      return { label: 'Incomplete', color: 'warning' }
    case 'incomplete_expired':
      return { label: 'Expired', color: 'error' }
    case 'unpaid':
      return { label: 'Unpaid', color: 'error' }
    case 'paused':
      return { label: 'Paused', color: 'warning' }
    default:
      return { label: status, color: 'default' }
  }
}
