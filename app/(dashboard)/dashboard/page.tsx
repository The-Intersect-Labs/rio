"use client"

import { useMemo, useState } from "react"
import { Header } from "@/components/header"
import { AddHabitButton } from "@/components/add-habit-dialog"
import { TodayHabits } from "@/app/(dashboard)/dashboard/components/today-habits"
import { StreakCard } from "@/app/(dashboard)/dashboard/components/streak-card"
import { CumulativeProgress } from "@/app/(dashboard)/dashboard/components/cumulative-progress"
import { SmartSuggestion } from "@/app/(dashboard)/dashboard/components/smart-suggestion"
import { useAnalyticsOverview, useCreateCheckin, useDashboard } from "@/lib/api/hooks"
import { ApiError } from "@/lib/api/client"

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 18) return "Good afternoon"
  return "Good evening"
}

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard()
  const { data: analytics } = useAnalyticsOverview(30)
  const [pendingId, setPendingId] = useState<string | null>(null)

  // A single useCreateCheckin needs a habitId; we rebind per action by calling
  // the fetch directly through the mutation with the tapped habit's id.
  const checkin = useCreateCheckin(pendingId ?? "")

  const today = useMemo(() => new Date().toISOString().split("T")[0], [])

  async function handleToggle(habitId: string, completed: boolean) {
    if (!completed) return // un-checking isn't supported by the API (one row/day)
    setPendingId(habitId)
    try {
      await checkin.mutateAsync({ logDate: today, status: "completed" })
    } finally {
      setPendingId(null)
    }
  }

  if (isLoading) {
    return <div className="flex h-full items-center justify-center p-8 text-sm text-slate-400">Loading dashboard…</div>
  }

  if (error) {
    const status = (error as ApiError).status
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-sm text-red-500">
        {status === 401
          ? "Your session expired — please sign in again."
          : `Could not load dashboard: ${(error as Error).message}`}
      </div>
    )
  }

  if (!data) return null

  const firstName = data.identity.firstName

  return (
    <div className="flex h-full flex-col">
      <Header
        title={<>{greeting()}{firstName ? `, ${firstName}` : ""}! 👋</>}
        subtext={
          data.identity.statement ??
          "You are becoming a Pro! Keep up the great work."
        }
        action={<AddHabitButton />}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex gap-8">
          <div className="min-w-0 flex-1">
            <TodayHabits
              habits={data.todayHabits}
              onToggle={handleToggle}
              pendingId={pendingId}
            />
          </div>

          <div className="w-[329px] shrink-0 space-y-6">
            <StreakCard
              currentStreak={data.metrics.longestStreak}
              longestStreak={data.metrics.longestStreak}
              activeStreaks={data.metrics.activeStreaks}
            />
            <CumulativeProgress
              today={{
                completed: data.metrics.completedToday,
                total: data.metrics.totalHabits,
              }}
              weekPct={data.metrics.weeklyConsistencyScore}
              monthPct={analytics?.habits.completionRate}
            />
            <SmartSuggestion insight={data.insight} />
          </div>
        </div>
      </div>
    </div>
  )
}
