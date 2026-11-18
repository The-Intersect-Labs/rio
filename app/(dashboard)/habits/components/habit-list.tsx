"use client"

import { Flame, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Habit as ApiHabit, PillarType } from "@/lib/api/types"

const PILLAR_EMOJI: Record<PillarType, string> = {
  health: "🏋️",
  learning: "📖",
  wealth: "💰",
  emotional_spiritual: "🧘",
  relationships: "🤝",
}

const FREQ_LABEL: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  custom: "Custom",
}

const TABS = ["All", "Daily", "Weekly"] as const
type Tab = (typeof TABS)[number]

interface HabitListProps {
  habits: ApiHabit[]
  /** habitId -> checked in today */
  todayMap: Record<string, boolean>
  tab: Tab
  onTabChange: (tab: Tab) => void
  onToggle: (habitId: string, completed: boolean) => void
  pendingId?: string | null
}

export function HabitList({
  habits,
  todayMap,
  tab,
  onTabChange,
  onToggle,
  pendingId,
}: HabitListProps) {
  const visible = habits.filter((h) => {
    if (tab === "All") return true
    return h.frequency === tab.toLowerCase()
  })

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-[16px] font-medium text-[#121212]">My Habits</h2>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-2xl bg-white p-1 shadow-sm">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => onTabChange(t)}
                className={cn(
                  "rounded-xl px-3.5 py-1.5 font-sans text-[12px] transition-colors",
                  tab === t
                    ? "bg-[#F1F1F1] font-medium text-[#121212]"
                    : "text-[#6B7280] hover:text-[#121212]",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-center font-sans text-[13px] text-[#6B7280] shadow-sm">
          No habits here yet.
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {visible.map((habit) => {
            const completed = !!todayMap[habit.id]
            const pending = pendingId === habit.id
            const emoji = habit.pillar ? PILLAR_EMOJI[habit.pillar] : "✨"

            return (
              <div
                key={habit.id}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C9D8FA] text-[16px]">
                  {emoji}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[14px] font-medium text-[#121212]">
                      {habit.title}
                    </span>
                    {habit.isKeystone && (
                      <span className="rounded-md bg-[#EFEAFF] px-1.5 py-0.5 font-sans text-[10px] font-medium text-[#7C3AED]">
                        KEYSTONE
                      </span>
                    )}
                    {(habit.streak?.currentStreak ?? 0) > 0 && (
                      <span className="flex items-center gap-1 rounded-md bg-[#F3EBFF] px-1.5 py-0.5">
                        <Flame className="h-3 w-3 fill-[#7C3AED] text-[#7C3AED]" />
                        <span className="font-sans text-[10px] font-medium text-[#7C3AED]">
                          {habit.streak?.currentStreak}
                        </span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="rounded-md bg-[#C9D8FA] px-1.5 py-0.5 font-sans text-[10px] font-medium text-[#2563EB]">
                      {FREQ_LABEL[habit.frequency] ?? habit.frequency}
                    </span>
                    {habit.scheduledTime && (
                      <span className="font-sans text-[10px] text-[#C9D0DD]">
                        {habit.scheduledTime}
                      </span>
                    )}
                    <span className="font-sans text-[10px] text-[#C9D0DD]">
                      best {habit.streak?.longestStreak ?? 0}d
                    </span>
                  </div>
                </div>

                <button
                  aria-label={completed ? "Mark as not done" : "Mark as done"}
                  disabled={pending}
                  onClick={() => onToggle(habit.id, !completed)}
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-60",
                    completed ? "bg-[#28A745] text-white" : "bg-[#F1F1F1] text-[#C9D0DD]",
                  )}
                >
                  {pending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" strokeWidth={3} />
                  )}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
