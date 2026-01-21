import { createClient } from "@/lib/supabase/server";
import { SupportInbox } from "./SupportInbox";

export const dynamic = "force-dynamic";

interface Conversation {
  id: string;
  subject: string | null;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  assigned_to: string | null;
  organizations: {
    id: string;
    name: string;
    status: string;
  };
  profiles: {
    id: string;
    full_name: string;
  } | null;
  chat_messages: {
    id: string;
    content: string;
    is_from_admin: boolean;
    created_at: string;
    read_at: string | null;
    sender_id: string | null;
    profiles: {
      full_name: string;
    } | null;
  }[];
}

interface TeamMember {
  id: string;
  full_name: string;
  role: string;
}

async function getConversations(): Promise<Conversation[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("chat_conversations")
    .select(`
      id,
      subject,
      status,
      priority,
      created_at,
      updated_at,
      assigned_to,
      organizations (
        id,
        name,
        status
      ),
      profiles:assigned_to (
        id,
        full_name
      ),
      chat_messages (
        id,
        content,
        is_from_admin,
        created_at,
        read_at,
        sender_id,
        profiles:sender_id (
          full_name
        )
      )
    `)
    .order("updated_at", { ascending: false });

  return (data || []) as Conversation[];
}

async function getTeamMembers(): Promise<TeamMember[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .in("role", ["admin", "team_member"]);

  return (data || []) as TeamMember[];
}

export default async function SupportPage() {
  const [conversations, teamMembers] = await Promise.all([
    getConversations(),
    getTeamMembers(),
  ]);

  // Transform data
  const transformedConversations = conversations.map((conv) => ({
    id: conv.id,
    subject: conv.subject || "No subject",
    status: conv.status as "open" | "pending" | "resolved" | "closed",
    priority: conv.priority as "low" | "normal" | "high" | "urgent",
    createdAt: conv.created_at,
    updatedAt: conv.updated_at,
    assignedTo: conv.assigned_to,
    assignedName: conv.profiles?.full_name || null,
    clientId: conv.organizations.id,
    clientName: conv.organizations.name,
    clientStatus: conv.organizations.status,
    unreadCount: conv.chat_messages.filter(
      (m) => !m.is_from_admin && !m.read_at
    ).length,
    lastMessage:
      conv.chat_messages.length > 0
        ? {
            content: conv.chat_messages[conv.chat_messages.length - 1].content,
            isFromAdmin:
              conv.chat_messages[conv.chat_messages.length - 1].is_from_admin,
            createdAt:
              conv.chat_messages[conv.chat_messages.length - 1].created_at,
          }
        : null,
    messages: conv.chat_messages.map((m) => ({
      id: m.id,
      content: m.content,
      isFromAdmin: m.is_from_admin,
      createdAt: m.created_at,
      senderName: m.profiles?.full_name || "Unknown",
    })),
  }));

  return (
    <SupportInbox
      conversations={transformedConversations}
      teamMembers={teamMembers}
    />
  );
}
