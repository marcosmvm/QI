export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          company_name: string | null
          role: 'client' | 'admin' | 'team_member'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          company_name?: string | null
          role?: 'client' | 'admin' | 'team_member'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          company_name?: string | null
          role?: 'client' | 'admin' | 'team_member'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          domain: string | null
          industry: string | null
          employee_count: number | null
          status: 'pilot' | 'active' | 'paused' | 'churned'
          onboarding_completed: boolean
          instantly_api_key: string | null
          google_sheet_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          domain?: string | null
          industry?: string | null
          employee_count?: number | null
          status?: 'pilot' | 'active' | 'paused' | 'churned'
          onboarding_completed?: boolean
          instantly_api_key?: string | null
          google_sheet_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          domain?: string | null
          industry?: string | null
          employee_count?: number | null
          status?: 'pilot' | 'active' | 'paused' | 'churned'
          onboarding_completed?: boolean
          instantly_api_key?: string | null
          google_sheet_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organization_members: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          role: 'owner' | 'admin' | 'viewer'
          invited_by: string | null
          joined_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'viewer'
          invited_by?: string | null
          joined_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'viewer'
          invited_by?: string | null
          joined_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          organization_id: string
          instantly_campaign_id: string | null
          name: string
          status: 'draft' | 'active' | 'paused' | 'completed'
          target_industry: string | null
          target_role: string | null
          daily_limit: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          instantly_campaign_id?: string | null
          name: string
          status?: 'draft' | 'active' | 'paused' | 'completed'
          target_industry?: string | null
          target_role?: string | null
          daily_limit?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          instantly_campaign_id?: string | null
          name?: string
          status?: 'draft' | 'active' | 'paused' | 'completed'
          target_industry?: string | null
          target_role?: string | null
          daily_limit?: number
          created_at?: string
          updated_at?: string
        }
      }
      campaign_metrics: {
        Row: {
          id: string
          campaign_id: string
          date: string
          emails_sent: number
          emails_delivered: number
          emails_opened: number
          emails_replied: number
          emails_bounced: number
          spam_complaints: number
          deliverability_rate: number | null
          open_rate: number | null
          reply_rate: number | null
          bounce_rate: number | null
          complaint_rate: number | null
          synced_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          date: string
          emails_sent?: number
          emails_delivered?: number
          emails_opened?: number
          emails_replied?: number
          emails_bounced?: number
          spam_complaints?: number
          deliverability_rate?: number | null
          open_rate?: number | null
          reply_rate?: number | null
          bounce_rate?: number | null
          complaint_rate?: number | null
          synced_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          date?: string
          emails_sent?: number
          emails_delivered?: number
          emails_opened?: number
          emails_replied?: number
          emails_bounced?: number
          spam_complaints?: number
          deliverability_rate?: number | null
          open_rate?: number | null
          reply_rate?: number | null
          bounce_rate?: number | null
          complaint_rate?: number | null
          synced_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          organization_id: string
          campaign_id: string | null
          email: string
          first_name: string | null
          last_name: string | null
          title: string | null
          company: string | null
          company_domain: string | null
          location: string | null
          phone: string | null
          linkedin_url: string | null
          source: 'cold_email' | 'website_visitor' | 'referral' | 'linkedin' | 'import'
          stage: 'new' | 'contacted' | 'engaged' | 'qualified' | 'meeting' | 'closed_won' | 'closed_lost'
          score: number
          is_starred: boolean
          last_activity: string | null
          last_activity_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          campaign_id?: string | null
          email: string
          first_name?: string | null
          last_name?: string | null
          title?: string | null
          company?: string | null
          company_domain?: string | null
          location?: string | null
          phone?: string | null
          linkedin_url?: string | null
          source?: 'cold_email' | 'website_visitor' | 'referral' | 'linkedin' | 'import'
          stage?: 'new' | 'contacted' | 'engaged' | 'qualified' | 'meeting' | 'closed_won' | 'closed_lost'
          score?: number
          is_starred?: boolean
          last_activity?: string | null
          last_activity_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          campaign_id?: string | null
          email?: string
          first_name?: string | null
          last_name?: string | null
          title?: string | null
          company?: string | null
          company_domain?: string | null
          location?: string | null
          phone?: string | null
          linkedin_url?: string | null
          source?: 'cold_email' | 'website_visitor' | 'referral' | 'linkedin' | 'import'
          stage?: 'new' | 'contacted' | 'engaged' | 'qualified' | 'meeting' | 'closed_won' | 'closed_lost'
          score?: number
          is_starred?: boolean
          last_activity?: string | null
          last_activity_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_conversations: {
        Row: {
          id: string
          organization_id: string
          subject: string | null
          status: 'open' | 'pending' | 'resolved' | 'closed'
          priority: 'low' | 'normal' | 'high' | 'urgent'
          assigned_to: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          subject?: string | null
          status?: 'open' | 'pending' | 'resolved' | 'closed'
          priority?: 'low' | 'normal' | 'high' | 'urgent'
          assigned_to?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          subject?: string | null
          status?: 'open' | 'pending' | 'resolved' | 'closed'
          priority?: 'low' | 'normal' | 'high' | 'urgent'
          assigned_to?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string | null
          content: string
          is_from_admin: boolean
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id?: string | null
          content: string
          is_from_admin?: boolean
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string | null
          content?: string
          is_from_admin?: boolean
          read_at?: string | null
          created_at?: string
        }
      }
      weekly_reports: {
        Row: {
          id: string
          organization_id: string
          week_start: string
          week_end: string
          total_sent: number | null
          total_opened: number | null
          total_replied: number | null
          deliverability_rate: number | null
          open_rate: number | null
          reply_rate: number | null
          highlights: Json | null
          recommendations: Json | null
          report_url: string | null
          generated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          week_start: string
          week_end: string
          total_sent?: number | null
          total_opened?: number | null
          total_replied?: number | null
          deliverability_rate?: number | null
          open_rate?: number | null
          reply_rate?: number | null
          highlights?: Json | null
          recommendations?: Json | null
          report_url?: string | null
          generated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          week_start?: string
          week_end?: string
          total_sent?: number | null
          total_opened?: number | null
          total_replied?: number | null
          deliverability_rate?: number | null
          open_rate?: number | null
          reply_rate?: number | null
          highlights?: Json | null
          recommendations?: Json | null
          report_url?: string | null
          generated_at?: string
        }
      }
      admin_notes: {
        Row: {
          id: string
          organization_id: string
          author_id: string | null
          content: string
          note_type: 'general' | 'call' | 'email' | 'meeting' | 'task'
          is_pinned: boolean
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          author_id?: string | null
          content: string
          note_type?: 'general' | 'call' | 'email' | 'meeting' | 'task'
          is_pinned?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          author_id?: string | null
          content?: string
          note_type?: 'general' | 'call' | 'email' | 'meeting' | 'task'
          is_pinned?: boolean
          created_at?: string
        }
      }
      deals: {
        Row: {
          id: string
          organization_id: string
          name: string
          value: number | null
          stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
          probability: number
          expected_close_date: string | null
          closed_at: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          value?: number | null
          stage?: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
          probability?: number
          expected_close_date?: string | null
          closed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          value?: number | null
          stage?: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
          probability?: number
          expected_close_date?: string | null
          closed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'account_manager' | 'support' | 'viewer'
          permissions: Json
          hired_at: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          role?: 'admin' | 'account_manager' | 'support' | 'viewer'
          permissions?: Json
          hired_at?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin' | 'account_manager' | 'support' | 'viewer'
          permissions?: Json
          hired_at?: string | null
          is_active?: boolean
        }
      }
      subscriptions: {
        Row: {
          id: string
          organization_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          plan_type: 'pilot' | 'starter' | 'growth' | 'enterprise'
          status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'paused'
          current_period_start: string | null
          current_period_end: string | null
          monthly_fee: number | null
          performance_fee_rate: number | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan_type?: 'pilot' | 'starter' | 'growth' | 'enterprise'
          status?: 'trialing' | 'active' | 'past_due' | 'canceled' | 'paused'
          current_period_start?: string | null
          current_period_end?: string | null
          monthly_fee?: number | null
          performance_fee_rate?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan_type?: 'pilot' | 'starter' | 'growth' | 'enterprise'
          status?: 'trialing' | 'active' | 'past_due' | 'canceled' | 'paused'
          current_period_start?: string | null
          current_period_end?: string | null
          monthly_fee?: number | null
          performance_fee_rate?: number | null
          created_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          organization_id: string
          subscription_id: string | null
          stripe_invoice_id: string | null
          amount: number | null
          status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible'
          due_date: string | null
          paid_at: string | null
          invoice_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          subscription_id?: string | null
          stripe_invoice_id?: string | null
          amount?: number | null
          status?: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible'
          due_date?: string | null
          paid_at?: string | null
          invoice_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          subscription_id?: string | null
          stripe_invoice_id?: string | null
          amount?: number | null
          status?: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible'
          due_date?: string | null
          paid_at?: string | null
          invoice_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for easier use
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Organization = Database['public']['Tables']['organizations']['Row']
export type OrganizationMember = Database['public']['Tables']['organization_members']['Row']
export type Campaign = Database['public']['Tables']['campaigns']['Row']
export type CampaignMetrics = Database['public']['Tables']['campaign_metrics']['Row']
export type Lead = Database['public']['Tables']['leads']['Row']
export type ChatConversation = Database['public']['Tables']['chat_conversations']['Row']
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row']
export type WeeklyReport = Database['public']['Tables']['weekly_reports']['Row']
export type AdminNote = Database['public']['Tables']['admin_notes']['Row']
export type Deal = Database['public']['Tables']['deals']['Row']
export type TeamMember = Database['public']['Tables']['team_members']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type Invoice = Database['public']['Tables']['invoices']['Row']
