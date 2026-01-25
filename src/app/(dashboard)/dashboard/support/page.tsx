import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { MessageSquare, Plus } from "lucide-react";
import Link from "next/link";
import { SupportPageWrapper } from "./SupportPageWrapper";

export const dynamic = 'force-dynamic';

interface Membership {
  organization_id: string;
}

async function getUserData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user's organization
  const { data: membership } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", user.id)
    .single();

  const typedMembership = membership as Membership | null;

  return {
    userId: user.id,
    organizationId: typedMembership?.organization_id,
  };
}

interface Conversation {
  id: string;
  subject: string | null;
  status: string;
  updated_at: string;
}

interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string | null;
  content: string;
  is_from_admin: boolean;
  created_at: string;
  sender: {
    id: string;
    full_name: string | null;
  } | null;
}

async function getConversations(organizationId: string): Promise<Conversation[]> {
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from("chat_conversations")
    .select("*")
    .eq("organization_id", organizationId)
    .order("updated_at", { ascending: false });

  return (data || []) as Conversation[];
}

async function getMessages(conversationId: string): Promise<ChatMessage[]> {
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from("chat_messages")
    .select(`
      *,
      sender:profiles(*)
    `)
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  return (data || []) as ChatMessage[];
}

async function createConversation(organizationId: string, userId: string) {
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("chat_conversations")
    .insert({
      organization_id: organizationId,
      subject: "New conversation",
      status: "open",
      created_by: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export default async function SupportPage({
  searchParams,
}: {
  searchParams: Promise<{ conversation?: string }>;
}) {
  const params = await searchParams;
  const { userId, organizationId } = await getUserData();

  if (!organizationId) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-slate-500 dark:text-slate-400 mx-auto mb-4" />
          <h1 className="text-xl font-sora font-bold text-slate-900 dark:text-white mb-2">Support Unavailable</h1>
          <p className="text-slate-500 dark:text-slate-400">Please complete your onboarding first.</p>
        </div>
      </div>
    );
  }

  const conversations = await getConversations(organizationId);
  let activeConversationId = params.conversation;

  // If no conversation selected, use the first one or create new
  if (!activeConversationId && conversations.length === 0) {
    // Create a new conversation for this organization
    const newConv = await createConversation(organizationId, userId);
    activeConversationId = newConv.id;
  } else if (!activeConversationId && conversations.length > 0) {
    activeConversationId = conversations[0].id;
  }

  const messages = activeConversationId ? await getMessages(activeConversationId) : [];

  return (
    <SupportPageWrapper>
      <div className="h-screen flex flex-col">
        {/* Page Header */}
        <div className="p-4 border-b border-border-default dark:border-graphite/50 bg-light-bg-secondary dark:bg-midnight-blue/50 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
            <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
            <span>/</span>
            <span className="text-emerald-pro-600">Support</span>
          </div>
          <h1 className="text-xl font-sora font-bold text-slate-900 dark:text-white">Support</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Get help from our team</p>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Conversations Sidebar */}
          <div className="w-80 border-r border-border-default dark:border-graphite/50 flex flex-col bg-light-bg-secondary dark:bg-midnight-blue/30">
            <div className="p-4 border-b border-border-default dark:border-graphite/50 bg-light-bg-secondary dark:bg-midnight-blue/50">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-sora font-semibold text-slate-900 dark:text-white">Conversations</h2>
                <form
                  action={async () => {
                    "use server";
                    const supabase = await createClient();
                    const { data: { user } } = await supabase.auth.getUser();
                    if (!user) return;

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const { data: membership } = await (supabase as any)
                      .from("organization_members")
                      .select("organization_id")
                      .eq("user_id", user.id)
                      .single();

                    if (!membership) return;

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const { data: newConv } = await (supabase as any)
                      .from("chat_conversations")
                      .insert({
                        organization_id: membership.organization_id,
                        subject: "New conversation",
                        status: "open",
                        created_by: user.id,
                      })
                      .select()
                      .single();

                    if (newConv) {
                      redirect(`/dashboard/support?conversation=${newConv.id}`);
                    }
                  }}
                >
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30 text-emerald-pro-600 hover:bg-emerald-pro-600/20 transition-colors"
                    title="New conversation"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">No conversations yet</p>
                </div>
              ) : (
                <div className="divide-y divide-graphite/30">
                  {conversations.map((conv) => (
                    <Link
                      key={conv.id}
                      href={`/dashboard/support?conversation=${conv.id}`}
                      className={`block p-4 hover:bg-light-bg-secondary dark:bg-midnight-blue/30 transition-colors ${
                        conv.id === activeConversationId ? "bg-light-bg-secondary dark:bg-midnight-blue/50 border-l-2 border-emerald-pro-600" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          conv.status === "open"
                            ? "bg-emerald-pro-600/10 border border-emerald-pro-600/30"
                            : "bg-emerald-pro-400/10 border border-emerald-pro-400/30"
                        }`}>
                          <MessageSquare className={`h-4 w-4 ${
                            conv.status === "open" ? "text-emerald-pro-600" : "text-emerald-pro-400"
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {conv.subject || "Conversation"}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {new Date(conv.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                          conv.status === "open"
                            ? "bg-emerald-pro-600/10 text-emerald-pro-600"
                            : conv.status === "resolved"
                            ? "bg-emerald-pro-400/10 text-emerald-pro-400"
                            : "bg-steel/10 text-slate-500 dark:text-slate-400"
                        }`}>
                          {conv.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white dark:bg-deep-space/50">
            {activeConversationId ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border-default dark:border-graphite/50 bg-light-bg-secondary dark:bg-midnight-blue/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-pro-500/20 border border-emerald-pro-500/30 flex items-center justify-center">
                      <span className="text-sm font-medium text-emerald-pro-500">QI</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">XGrowthOS Support</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">We typically reply within a few hours</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-hidden">
                  <ChatMessages
                    conversationId={activeConversationId}
                    currentUserId={userId}
                    initialMessages={messages}
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-slate-500 dark:text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">Select a conversation to continue</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SupportPageWrapper>
  );
}
