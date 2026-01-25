"use client";

import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckSquare,
  Pin,
  MoreHorizontal,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type NoteType = "general" | "call" | "email" | "meeting" | "task";

interface AdminNote {
  id: string;
  content: string;
  noteType: NoteType;
  isPinned: boolean;
  authorName: string;
  createdAt: string;
}

interface AdminNotesTimelineProps {
  notes: AdminNote[];
  onAddNote?: () => void;
  className?: string;
}

const noteTypeConfig: Record<
  NoteType,
  { icon: typeof MessageSquare; color: string; label: string }
> = {
  general: {
    icon: MessageSquare,
    color: "text-slate-900 dark:text-slate-200 bg-steel/10 border-steel/30",
    label: "Note",
  },
  call: {
    icon: Phone,
    color: "text-emerald-pro-400 bg-emerald-pro-400/10 border-emerald-pro-400/30",
    label: "Call",
  },
  email: {
    icon: Mail,
    color: "text-emerald-pro-600 bg-emerald-pro-600/10 border-emerald-pro-600/30",
    label: "Email",
  },
  meeting: {
    icon: Calendar,
    color: "text-emerald-pro-500 bg-emerald-pro-500/10 border-emerald-pro-500/30",
    label: "Meeting",
  },
  task: {
    icon: CheckSquare,
    color: "text-energy-orange bg-energy-orange/10 border-energy-orange/30",
    label: "Task",
  },
};

export function AdminNotesTimeline({
  notes,
  onAddNote,
  className,
}: AdminNotesTimelineProps) {
  // Separate pinned notes
  const pinnedNotes = notes.filter((n) => n.isPinned);
  const unpinnedNotes = notes.filter((n) => !n.isPinned);

  return (
    <div className={cn("rounded-xl border border-border-default dark:border-graphite/50 bg-light-bg-secondary dark:bg-midnight-blue/30 p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">
          Admin Notes
        </h3>
        {onAddNote && (
          <button
            onClick={onAddNote}
            className="text-sm text-emerald-pro-600 hover:text-emerald-pro-600/80 transition-colors"
          >
            + Add Note
          </button>
        )}
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="h-8 w-8 text-slate-900 dark:text-slate-200 mx-auto mb-2" />
          <p className="text-sm text-slate-900 dark:text-slate-200">No notes yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Pinned notes first */}
          {pinnedNotes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}

          {/* Regular notes */}
          {unpinnedNotes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

function NoteItem({ note }: { note: AdminNote }) {
  const config = noteTypeConfig[note.noteType];
  const Icon = config.icon;

  return (
    <div className="relative pl-8 pb-4 border-l border-border-default dark:border-graphite/50 last:border-l-0 last:pb-0">
      {/* Timeline dot */}
      <div
        className={cn(
          "absolute -left-3 top-0 h-6 w-6 rounded-full border flex items-center justify-center",
          config.color
        )}
      >
        <Icon className="h-3 w-3" />
      </div>

      {/* Note content */}
      <div className="bg-white dark:bg-deep-space/30 rounded-lg p-4 border border-border-default dark:border-graphite/30">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-900 dark:text-slate-200">
              {note.authorName}
            </span>
            {note.isPinned && (
              <Pin className="h-3 w-3 text-energy-orange" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-900 dark:text-slate-200">
              {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
            </span>
            <button className="text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:text-slate-200 transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-900 dark:text-slate-200 whitespace-pre-wrap">
          {note.content}
        </p>

        <div className="mt-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border",
              config.color
            )}
          >
            <Icon className="h-3 w-3" />
            {config.label}
          </span>
        </div>
      </div>
    </div>
  );
}
