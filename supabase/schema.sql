-- Quantum Insights Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  company_name TEXT,
  role TEXT CHECK (role IN ('client', 'admin', 'team_member')) DEFAULT 'client',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Organizations (Client Companies)
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  employee_count INTEGER,
  status TEXT CHECK (status IN ('pilot', 'active', 'paused', 'churned')) DEFAULT 'pilot',
  onboarding_completed BOOLEAN DEFAULT false,
  instantly_api_key TEXT,
  google_sheet_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Organization Members (Many-to-Many)
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('owner', 'admin', 'viewer')) DEFAULT 'viewer',
  invited_by UUID REFERENCES public.profiles(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- 4. Campaigns
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  instantly_campaign_id TEXT,
  name TEXT NOT NULL,
  status TEXT CHECK (status IN ('draft', 'active', 'paused', 'completed')) DEFAULT 'draft',
  target_industry TEXT,
  target_role TEXT,
  daily_limit INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Campaign Metrics (Time Series)
CREATE TABLE IF NOT EXISTS public.campaign_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  emails_sent INTEGER DEFAULT 0,
  emails_delivered INTEGER DEFAULT 0,
  emails_opened INTEGER DEFAULT 0,
  emails_replied INTEGER DEFAULT 0,
  emails_bounced INTEGER DEFAULT 0,
  spam_complaints INTEGER DEFAULT 0,
  deliverability_rate DECIMAL(5,2),
  open_rate DECIMAL(5,2),
  reply_rate DECIMAL(5,2),
  bounce_rate DECIMAL(5,2),
  complaint_rate DECIMAL(5,4),
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, date)
);

-- 6. Leads
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id),
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  title TEXT,
  company TEXT,
  company_domain TEXT,
  location TEXT,
  phone TEXT,
  linkedin_url TEXT,
  source TEXT CHECK (source IN ('cold_email', 'website_visitor', 'referral', 'linkedin', 'import')) DEFAULT 'cold_email',
  stage TEXT CHECK (stage IN ('new', 'contacted', 'engaged', 'qualified', 'meeting', 'closed_won', 'closed_lost')) DEFAULT 'new',
  score INTEGER DEFAULT 0,
  is_starred BOOLEAN DEFAULT false,
  last_activity TEXT,
  last_activity_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Chat Conversations
CREATE TABLE IF NOT EXISTS public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  subject TEXT,
  status TEXT CHECK (status IN ('open', 'pending', 'resolved', 'closed')) DEFAULT 'open',
  priority TEXT CHECK (priority IN ('low', 'normal', 'high', 'urgent')) DEFAULT 'normal',
  assigned_to UUID REFERENCES public.profiles(id),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Chat Messages
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  is_from_admin BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Weekly Reports
CREATE TABLE IF NOT EXISTS public.weekly_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  total_sent INTEGER,
  total_opened INTEGER,
  total_replied INTEGER,
  deliverability_rate DECIMAL(5,2),
  open_rate DECIMAL(5,2),
  reply_rate DECIMAL(5,2),
  highlights JSONB,
  recommendations JSONB,
  report_url TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, week_start)
);

-- ADMIN-ONLY TABLES

-- 10. Admin Notes (CRM)
CREATE TABLE IF NOT EXISTS public.admin_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  note_type TEXT CHECK (note_type IN ('general', 'call', 'email', 'meeting', 'task')) DEFAULT 'general',
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Deal Pipeline (Admin CRM)
CREATE TABLE IF NOT EXISTS public.deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value DECIMAL(12,2),
  stage TEXT CHECK (stage IN ('lead', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost')) DEFAULT 'lead',
  probability INTEGER DEFAULT 0,
  expected_close_date DATE,
  closed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Team Members (Admin)
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('admin', 'account_manager', 'support', 'viewer')) DEFAULT 'support',
  permissions JSONB DEFAULT '{}',
  hired_at DATE,
  is_active BOOLEAN DEFAULT true
);

-- 13. Subscriptions (Stripe Integration)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_type TEXT CHECK (plan_type IN ('pilot', 'starter', 'growth', 'enterprise')) DEFAULT 'pilot',
  status TEXT CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'paused')) DEFAULT 'trialing',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  monthly_fee DECIMAL(10,2),
  performance_fee_rate DECIMAL(5,4),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Invoices
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id),
  stripe_invoice_id TEXT,
  amount DECIMAL(10,2),
  status TEXT CHECK (status IN ('draft', 'open', 'paid', 'void', 'uncollectible')) DEFAULT 'draft',
  due_date DATE,
  paid_at TIMESTAMPTZ,
  invoice_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- =====================
-- RLS POLICIES
-- =====================

-- Profiles: Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'team_member')
    )
  );

-- Organizations: Members can view their org
CREATE POLICY "Members can view their organization" ON public.organizations
  FOR SELECT USING (
    id IN (
      SELECT organization_id FROM public.organization_members
      WHERE user_id = auth.uid()
    )
  );

-- Admins can view/edit all organizations
CREATE POLICY "Admins can manage all organizations" ON public.organizations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'team_member')
    )
  );

-- Campaigns: Members can view their org's campaigns
CREATE POLICY "Members can view campaigns" ON public.campaigns
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM public.organization_members
      WHERE user_id = auth.uid()
    )
  );

-- Admins can manage all campaigns
CREATE POLICY "Admins can manage all campaigns" ON public.campaigns
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'team_member')
    )
  );

-- Campaign Metrics: Same as campaigns
CREATE POLICY "Members can view campaign metrics" ON public.campaign_metrics
  FOR SELECT USING (
    campaign_id IN (
      SELECT c.id FROM public.campaigns c
      JOIN public.organization_members om ON c.organization_id = om.organization_id
      WHERE om.user_id = auth.uid()
    )
  );

-- Leads: Members can view their org's leads
CREATE POLICY "Members can view leads" ON public.leads
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM public.organization_members
      WHERE user_id = auth.uid()
    )
  );

-- Chat: Members can view/create their org's conversations
CREATE POLICY "Members can view conversations" ON public.chat_conversations
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM public.organization_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Members can create conversations" ON public.chat_conversations
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM public.organization_members
      WHERE user_id = auth.uid()
    )
  );

-- Chat Messages: Users can view messages in their conversations
CREATE POLICY "Users can view messages" ON public.chat_messages
  FOR SELECT USING (
    conversation_id IN (
      SELECT cc.id FROM public.chat_conversations cc
      JOIN public.organization_members om ON cc.organization_id = om.organization_id
      WHERE om.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages" ON public.chat_messages
  FOR INSERT WITH CHECK (
    conversation_id IN (
      SELECT cc.id FROM public.chat_conversations cc
      JOIN public.organization_members om ON cc.organization_id = om.organization_id
      WHERE om.user_id = auth.uid()
    )
  );

-- Admins can manage all chat
CREATE POLICY "Admins can manage all conversations" ON public.chat_conversations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'team_member')
    )
  );

CREATE POLICY "Admins can manage all messages" ON public.chat_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'team_member')
    )
  );

-- Weekly Reports: Members can view their org's reports
CREATE POLICY "Members can view reports" ON public.weekly_reports
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM public.organization_members
      WHERE user_id = auth.uid()
    )
  );

-- Admin-only tables: Only admins can access
CREATE POLICY "Admins only - notes" ON public.admin_notes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'team_member')
    )
  );

CREATE POLICY "Admins only - deals" ON public.deals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'team_member')
    )
  );

CREATE POLICY "Admins only - team" ON public.team_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins only - subscriptions" ON public.subscriptions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'team_member')
    )
  );

CREATE POLICY "Admins only - invoices" ON public.invoices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'team_member')
    )
  );

-- =====================
-- INDEXES
-- =====================

CREATE INDEX IF NOT EXISTS idx_org_members_user ON public.organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org ON public.organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_org ON public.campaigns(organization_id);
CREATE INDEX IF NOT EXISTS idx_campaign_metrics_campaign ON public.campaign_metrics(campaign_id, date);
CREATE INDEX IF NOT EXISTS idx_leads_org ON public.leads(organization_id);
CREATE INDEX IF NOT EXISTS idx_leads_campaign ON public.leads(campaign_id);
CREATE INDEX IF NOT EXISTS idx_leads_stage ON public.leads(stage);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_org ON public.chat_conversations(organization_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON public.chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_weekly_reports_org ON public.weekly_reports(organization_id);

-- =====================
-- FUNCTIONS & TRIGGERS
-- =====================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON public.chat_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =====================
-- REALTIME
-- =====================

-- Enable realtime for chat messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_conversations;

-- =====================
-- SEED DATA (Optional)
-- =====================

-- Insert admin user profile (you'll need to create this user in Auth first)
-- Then run: UPDATE public.profiles SET role = 'admin' WHERE email = 'your-email@example.com';
