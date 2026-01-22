"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Inbox,
  MessageSquare,
  AlertCircle,
  Clock,
  CheckCircle,
  User,
  Building2,
  Send,
  ChevronDown,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

interface Message {
  id: string;
  content: string;
  isFromAdmin: boolean;
  createdAt: string;
  senderName: string;
}

interface Conversation {
  id: string;
  subject: string;
  status: "open" | "pending" | "resolved" | "closed";
  priority: "low" | "normal" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  assignedTo: string | null;
  assignedName: string | null;
  clientId: string;
  clientName: string;
  clientStatus: string;
  unreadCount: number;
  lastMessage: {
    content: string;
    isFromAdmin: boolean;
    createdAt: string;
  } | null;
  messages: Message[];
}

interface TeamMember {
  id: string;
  full_name: string;
  role: string;
}

interface SupportInboxProps {
  conversations: Conversation[];
  teamMembers: TeamMember[];
}

export function SupportInbox({ conversations, teamMembers }: SupportInboxProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    conversations[0]?.id || null
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyContent, setReplyContent] = useState("");

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !conv.subject.toLowerCase().includes(query) &&
        !conv.clientName.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    if (statusFilter !== "all" && conv.status !== statusFilter) return false;
    if (priorityFilter !== "all" && conv.priority !== priorityFilter)
      return false;
    return true;
  });

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  // Stats
  const stats = {
    open: conversations.filter((c) => c.status === "open").length,
    pending: conversations.filter((c) => c.status === "pending").length,
    urgent: conversations.filter((c) => c.priority === "urgent").length,
    unread: conversations.reduce((sum, c) => sum + c.unreadCount, 0),
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <motion.div variants={itemVariants} className="px-8 py-6 border-b border-graphite/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-sora font-bold text-white">
              Support Inbox
            </h1>
            <p className="text-steel mt-1">
              Manage client support conversations
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <QuickStat
              label="Open"
              value={stats.open}
              color="electric-cyan"
              icon={Inbox}
            />
            <QuickStat
              label="Pending"
              value={stats.pending}
              color="energy-orange"
              icon={Clock}
            />
            <QuickStat
              label="Urgent"
              value={stats.urgent}
              color="red"
              icon={AlertCircle}
            />
          </div>
        </div>
      </motion.div>

      {/* 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversation List */}
        <div className="w-80 border-r border-graphite/50 flex flex-col">
          {/* Search & Filters */}
          <div className="p-4 border-b border-graphite/50 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 rounded-lg border border-graphite bg-deep-space pl-9 pr-3 text-sm text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 h-8 px-2 rounded-lg border border-graphite bg-deep-space text-xs text-white focus:border-electric-cyan/50 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="flex-1 h-8 px-2 rounded-lg border border-graphite bg-deep-space text-xs text-white focus:border-electric-cyan/50 focus:outline-none"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <Inbox className="h-8 w-8 text-steel mx-auto mb-2" />
                <p className="text-sm text-steel">No conversations</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedId(conv.id)}
                  className={cn(
                    "w-full p-4 text-left border-b border-graphite/30 transition-colors",
                    selectedId === conv.id
                      ? "bg-electric-cyan/10"
                      : "hover:bg-midnight-blue/30"
                  )}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm font-medium text-white truncate flex-1">
                      {conv.subject}
                    </span>
                    {conv.unreadCount > 0 && (
                      <span className="ml-2 h-5 min-w-[20px] px-1.5 rounded-full bg-electric-cyan text-deep-space text-xs font-medium flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-steel mb-2">{conv.clientName}</p>

                  {conv.lastMessage && (
                    <p className="text-xs text-silver line-clamp-2 mb-2">
                      {conv.lastMessage.isFromAdmin && (
                        <span className="text-electric-cyan">You: </span>
                      )}
                      {conv.lastMessage.content}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={conv.status} size="sm" />
                      {conv.priority === "urgent" && (
                        <PriorityBadge priority={conv.priority} size="sm" />
                      )}
                    </div>
                    <span className="text-xs text-steel">
                      {formatDistanceToNow(new Date(conv.updatedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Conversation View */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <div className="px-6 py-4 border-b border-graphite/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {selectedConversation.subject}
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                      <Link
                        href={`/admin/clients/${selectedConversation.clientId}`}
                        className="text-sm text-electric-cyan hover:underline"
                      >
                        {selectedConversation.clientName}
                      </Link>
                      <span className="text-steel">·</span>
                      <span className="text-sm text-steel">
                        {formatDistanceToNow(
                          new Date(selectedConversation.createdAt),
                          { addSuffix: true }
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedConversation.status} />
                    <PriorityBadge priority={selectedConversation.priority} />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-steel">Status:</span>
                    <select className="h-7 px-2 rounded border border-graphite bg-deep-space text-xs text-white">
                      <option value="open">Open</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-steel">Priority:</span>
                    <select className="h-7 px-2 rounded border border-graphite bg-deep-space text-xs text-white">
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-steel">Assign to:</span>
                    <select className="h-7 px-2 rounded border border-graphite bg-deep-space text-xs text-white">
                      <option value="">Unassigned</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "max-w-[80%]",
                      message.isFromAdmin ? "ml-auto" : "mr-auto"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-xl p-4",
                        message.isFromAdmin
                          ? "bg-electric-cyan/10 border border-electric-cyan/30"
                          : "glass-premium"
                      )}
                    >
                      <p className="text-sm text-silver whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-2 mt-1.5",
                        message.isFromAdmin ? "justify-end" : "justify-start"
                      )}
                    >
                      <span className="text-xs text-steel">
                        {message.senderName}
                      </span>
                      <span className="text-xs text-steel">·</span>
                      <span className="text-xs text-steel">
                        {formatDistanceToNow(new Date(message.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Composer */}
              <div className="p-4 border-t border-graphite/50">
                <div className="flex gap-3">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Type your reply..."
                    rows={3}
                    className="flex-1 rounded-lg border border-graphite bg-deep-space p-3 text-sm text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none resize-none"
                  />
                  <button
                    disabled={!replyContent.trim()}
                    className="self-end px-4 py-2 bg-electric-cyan text-deep-space font-medium rounded-lg hover:bg-electric-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-steel mx-auto mb-4" />
                <p className="text-steel">Select a conversation</p>
              </div>
            </div>
          )}
        </div>

        {/* Client Info Sidebar */}
        {selectedConversation && (
          <div className="w-72 border-l border-graphite/50 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-white mb-4">
              Client Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-quantum-violet/20 border border-quantum-violet/30 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-quantum-violet" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {selectedConversation.clientName}
                  </p>
                  <p className="text-xs text-steel capitalize">
                    {selectedConversation.clientStatus}
                  </p>
                </div>
              </div>

              <Link
                href={`/admin/clients/${selectedConversation.clientId}`}
                className="block w-full px-3 py-2 text-sm text-center text-electric-cyan border border-electric-cyan/30 rounded-lg hover:bg-electric-cyan/10 transition-colors"
              >
                View Client Profile
              </Link>

              <div className="pt-4 border-t border-graphite/50">
                <h4 className="text-xs font-medium text-steel uppercase tracking-wider mb-3">
                  Conversation Stats
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-steel">Messages</span>
                    <span className="text-xs text-white">
                      {selectedConversation.messages.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-steel">Created</span>
                    <span className="text-xs text-white">
                      {new Date(
                        selectedConversation.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-steel">Assigned to</span>
                    <span className="text-xs text-white">
                      {selectedConversation.assignedName || "Unassigned"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function QuickStat({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: typeof Inbox;
}) {
  const colors: Record<string, string> = {
    "electric-cyan": "text-electric-cyan",
    "energy-orange": "text-energy-orange",
    red: "text-red-400",
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 glass-premium rounded-lg">
      <Icon className={cn("h-4 w-4", colors[color])} />
      <span className={cn("text-sm font-semibold", colors[color])}>{value}</span>
      <span className="text-xs text-steel">{label}</span>
    </div>
  );
}

function StatusBadge({
  status,
  size = "md",
}: {
  status: string;
  size?: "sm" | "md";
}) {
  const styles: Record<string, string> = {
    open: "bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30",
    pending: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    resolved: "bg-neon-mint/10 text-neon-mint border-neon-mint/30",
    closed: "bg-steel/10 text-steel border-steel/30",
  };

  return (
    <span
      className={cn(
        "font-medium rounded-full border capitalize",
        styles[status] || styles.open,
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"
      )}
    >
      {status}
    </span>
  );
}

function PriorityBadge({
  priority,
  size = "md",
}: {
  priority: string;
  size?: "sm" | "md";
}) {
  const styles: Record<string, string> = {
    urgent: "bg-red-500/10 text-red-400 border-red-500/30",
    high: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    normal: "bg-steel/10 text-steel border-steel/30",
    low: "bg-steel/10 text-steel border-steel/30",
  };

  if (priority === "normal" || priority === "low") return null;

  return (
    <span
      className={cn(
        "font-medium rounded-full border capitalize",
        styles[priority] || styles.normal,
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"
      )}
    >
      {priority}
    </span>
  );
}
