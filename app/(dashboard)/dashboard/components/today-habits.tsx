"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Dumbbell,
  BookOpen,
  Brain,
  Droplet,
  Zap,
  Flame,
  AlertTriangle,
  Check,
  Heart,
  Wallet,
  Users,
  Loader2,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { DashboardTodayHabit, PillarType } from "@/lib/api/types"

type StreakTone = "purple" | "orange"

const PILLAR_ICON: Record<PillarType, LucideIcon> = {
  health: Dumbbell,
  learning: BookOpen,
  wealth: Wallet,
  emotional_spiritual: Heart,
  relationships: Users,
}

const PILLAR_LABEL: Record<PillarType, string> = {
  health: "HEALTH",
  learning: "MINDSET",
  wealth: "WEALTH",
  emotional_spiritual: "EMOTIONAL",
  relationships: "RELATIONSHIPS",
}

const streakChip = (tone: StreakTone) =>
  tone === "purple"
    ? { bg: "bg-[#DECEFB]", text: "text-[#7C3AED]", Icon: Zap }
    : { bg: "bg-[#FFDACD]", text: "text-[#FF6B35]", Icon: Flame }

interface TodayHabitsProps {
  habits: DashboardTodayHabit[]
  onToggle?: (habitId: string, completed: boolean) => void
  pendingId?: string | null
}

export function TodayHabits({ habits, onToggle, pendingId }: TodayHabitsProps) {
  const completedCount = habits.filter((h) => h.todayCheckin?.status === "completed").length

  return (
    <Card className="rounded-3xl border-none shadow-sm">
      <CardContent className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-heading text-[18px] font-semibold text-[#131313]">
            Today&apos;s Habits
          </h3>
          <span className="font-sans text-[14px] font-medium text-[#6B7280]">
            {completedCount}/{habits.length} completed
          </span>
        </div>

        {habits.length === 0 ? (
          <p className="py-6 text-center font-sans text-[14px] text-[#6B7280]">
            No habits yet. Create a goal and add your first habit.
          </p>
        ) : (
          <div className="space-y-3">
            {habits.map((habit) => {
              const completed = habit.todayCheckin?.status === "completed"
              const atRisk = habit.currentStreak === 0 && !completed && habit.longestStreak > 0
              const tone: StreakTone = habit.currentStreak >= 7 ? "purple" : "orange"
              const chip = habit.currentStreak > 0 ? streakChip(tone) : null
              const Icon = (habit.pillar && PILLAR_ICON[habit.pillar]) || Zap
              const pending = pendingId === habit.id

              return (
                <div
                  key={habit.id}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border p-4 transition-colors",
                    atRisk
                      ? "border-[#FFEFC1] bg-[#FFEFC1]"
                      : completed
                        ? "border-[#C9E9D1] bg-[#F1FBF4]"
                        : "border-[#F1F1F1] bg-[#FCFCFC]",
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF1FF] text-[#2563EB]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-[16px] font-semibold text-[#131313]">
                      {habit.title}
                      {habit.isKeystone && (
                        <span className="ml-2 rounded-md bg-[#EFEAFF] px-2 py-0.5 font-sans text-[11px] font-medium text-[#7C3AED]">
                          KEYSTONE
                        </span>
                      )}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded-md bg-[#F1F1F1] px-2 py-0.5 font-sans text-[12px] text-[#6B7280]">
                        {habit.pillar ? PILLAR_LABEL[habit.pillar] : "GENERAL"}
                      </span>
                      {chip && (
                        <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-sans text-[12px]", chip.bg, chip.text)}>
                          <chip.Icon className="h-3 w-3" />
                          {habit.currentStreak} day streak
                        </span>
                      )}
                      {atRisk && (
                        <span className="inline-flex items-center gap-1 font-sans text-[12px] text-[#B38705]">
                          <AlertTriangle className="h-3 w-3" />
                          Streak at risk
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={completed ? "Mark as not done" : "Mark as done"}
                    disabled={pending}
                    onClick={() => onToggle?.(habit.id, !completed)}
                    className="shrink-0 disabled:opacity-60"
                  >
                    {pending ? (
                      <Loader2 className="h-5 w-5 animate-spin text-[#6B7280]" />
                    ) : completed ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#228E3B]">
                        <Check className="h-4 w-4 text-white" strokeWidth={3} />
                      </div>
                    ) : atRisk ? (
                      <AlertTriangle className="h-5 w-5 text-[#B38705]" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-[#D1D5DB] transition-colors hover:border-[#228E3B]" />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
