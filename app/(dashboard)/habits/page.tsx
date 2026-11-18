"use client"

import { useMemo, useState } from "react"
import { Flame, Loader2, AlertCircle } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Header } from "@/components/header"
import { HabitSummary } from "./components/habit-summary"
import { HabitStats } from "./components/habit-stats"
import { HabitList } from "./components/habit-list"
import { HabitSidebar } from "./components/habit-sidebar"
import { useDashboard, useHabits } from "@/lib/api/hooks"
import { checkinsApi } from "@/lib/api/endpoints"

const TABS = ["All", "Daily", "Weekly"] as const
type Tab = (typeof TABS)[number]

export default function HabitsPage() {
  const [tab, setTab] = useState<Tab>("All")
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [overrides, setOverrides] = useState<Record<string, boolean>>({})
  const qc = useQueryClient()

  const habitsQuery = useHabits({ limit: 100 })
  const dashboardQuery = useDashboard()

  const checkin = useMutation({
    mutationFn: ({ habitId, logDate }: { habitId: string; logDate: string }) =>
      checkinsApi.create(habitId, { logDate, status: "completed" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dashboard"] })
      qc.invalidateQueries({ queryKey: ["habits"] })
      qc.invalidateQueries({ queryKey: ["analytics"] })
    },
  })

  const habits = habitsQuery.data?.habits ?? []
  const dashboard = dashboardQuery.data

  // Today's check-in state comes from the dashboard payload — the habits
  // list endpoint does not include per-day checkins.
  const todayMap = useMemo(() => {
    const map: Record<string, boolean> = {}
    for (const h of dashboard?.todayHabits ?? []) {
      map[h.id] = h.todayCheckin?.status === "completed"
    }
    return { ...map, ...overrides }
  }, [dashboard, overrides])

  const completedToday = habits.filter((h) => todayMap[h.id]).length
  const totalHabits = habits.length || dashboard?.metrics.totalHabits || 0
  const bestStreak = habits.reduce(
    (max, h) => Math.max(max, h.streak?.longestStreak ?? 0),
    0,
  )
  const todayRate = totalHabits ? Math.round((completedToday / totalHabits) * 100) : 0

  const loading = habitsQuery.isLoading || dashboardQuery.isLoading
  const error = habitsQuery.error ?? dashboardQuery.error

  async function handleToggle(habitId: string, completed: boolean) {
    if (!completed) {
      // The API has no "un-check" endpoint yet — revert locally only.
      setOverrides((prev) => ({ ...prev, [habitId]: false }))
      return
    }

    setPendingId(habitId)
    try {
      await checkin.mutateAsync({
        habitId,
        logDate: new Date().toISOString().slice(0, 10),
      })
      setOverrides((prev) => ({ ...prev, [habitId]: true }))
    } catch {
      // React Query keeps the previous cache state on failure.
    } finally {
      setPendingId(null)
    }
  }

  const week = Array.from({ length: 7 }, (_, i) => {
    const todayIdx = (new Date().getDay() + 6) % 7 // Mon = 0
    return i === todayIdx && completedToday > 0
  })

  return (
    <div className="flex h-full flex-col">
      <Header
        title="Habit Tracker"
        subtext={new Date().toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
        action={
          <div className="flex items-center gap-1.5 rounded-full bg-[#FDE7C2] px-3 py-1.5">
            <Flame className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span className="font-sans text-[12px] font-semibold text-[#F59E0B]">
              {completedToday}/{totalHabits}
            </span>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        {loading ? (
          <div className="flex h-64 items-center justify-center gap-2 text-[#6B7280]">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-sans text-[14px]">Loading habits…</span>
          </div>
        ) : error ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2 text-[#DC2626]">
            <AlertCircle className="h-5 w-5" />
            <span className="font-sans text-[14px]">Couldn&apos;t load habits.</span>
            <span className="font-sans text-[12px] text-[#6B7280]">
              {(error as Error).message}
            </span>
          </div>
        ) : (
          <div className="flex gap-8">
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div className="grid min-h-[245px] grid-cols-[minmax(0,483fr)_minmax(0,276fr)] gap-3">
                <HabitSummary
                  overallRate={todayRate}
                  todayCompleted={completedToday}
                  todayTotal={totalHabits}
                  bestStreak={bestStreak}
                  week={week}
                />
                <HabitStats
                  activeHabits={habits.length}
                  bestStreak={bestStreak}
                  completedToday={completedToday}
                  totalHabits={totalHabits}
                />
              </div>

              <HabitList
                habits={habits}
                todayMap={todayMap}
                tab={tab}
                onTabChange={setTab}
                onToggle={handleToggle}
                pendingId={pendingId}
              />
            </div>

            <div className="w-[340px] shrink-0">
              <HabitSidebar habits={habits} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
