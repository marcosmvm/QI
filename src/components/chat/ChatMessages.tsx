"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Send, Loader2 } from "lucide-react";

interface MessageWithSender {
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

interface ChatMessagesProps {
  conversationId: string;
  currentUserId: string;
  initialMessages: MessageWithSender[];
}

export function ChatMessages({
  conversationId,
  currentUserId,
  initialMessages,
}: ChatMessagesProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const supabase = createClient();

    // Subscribe to new messages
    const channel = supabase
      .channel(`chat:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newMsg = payload.new as any;

          // Fetch sender info
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: sender } = await (supabase as any)
            .from("profiles")
            .select("*")
            .eq("id", newMsg.sender_id)
            .single();

          setMessages((prev) => [
            ...prev,
            { ...newMsg, sender } as MessageWithSender,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    const supabase = createClient();

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("chat_messages").insert({
        conversation_id: conversationId,
        sender_id: currentUserId,
        content: newMessage.trim(),
        is_from_admin: false,
      });

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: typeof messages }[] = [];
  messages.forEach((msg) => {
    const dateStr = formatDate(msg.created_at);
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    if (lastGroup && lastGroup.date === dateStr) {
      lastGroup.messages.push(msg);
    } else {
      groupedMessages.push({ date: dateStr, messages: [msg] });
    }
  });

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Date separator */}
            <div className="flex items-center justify-center my-4">
              <span className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-deep-space px-3 py-1 rounded-full">
                {group.date}
              </span>
            </div>

            {/* Messages for this date */}
            <div className="space-y-4">
              {group.messages.map((message) => {
                const isOwn = message.sender_id === currentUserId;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        isOwn
                          ? "bg-emerald-pro-600/10 border border-emerald-pro-600/30"
                          : "bg-light-bg-secondary dark:bg-midnight-blue/50 border border-border-default dark:border-graphite/30"
                      } rounded-2xl px-4 py-3`}
                    >
                      {!isOwn && message.sender && (
                        <p className="text-xs text-emerald-pro-600 font-medium mb-1">
                          {message.sender.full_name || "Support"}
                        </p>
                      )}
                      <p className="text-sm text-slate-900 dark:text-white whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-1 ${isOwn ? "text-emerald-pro-600/60" : "text-slate-500 dark:text-slate-400"}`}>
                        {formatTime(message.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-border-default dark:border-graphite/50">
        <div className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white placeholder:text-slate-500 dark:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50 transition-colors"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="h-11 px-4 bg-emerald-pro-600 dark:bg-xgrowth-500 text-white dark:text-green-950 font-medium rounded-lg hover:bg-emerald-pro-600/90 dark:hover:bg-xgrowth-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
