"use client"

import { AlertCircle } from "lucide-react"
import { Header } from "@/components/header"
import { StatCards } from "./components/stat-cards"
import { WeeklyActivity } from "./components/weekly-activity"
import { CategoryBreakdown } from "./components/category-breakdown"
import { useAnalyticsOverview, useHabits } from "@/lib/api/hooks"
import { useWeeklyActivity } from "@/lib/api/use-weekly-activity"

export default function StatsPage() {
  const { data: analytics, error } = useAnalyticsOverview(30)
  const { data: habitsData } = useHabits()
  const weekly = useWeeklyActivity(habitsData?.habits)

  return (
    <div className="flex h-full flex-col">
      <Header title="Stats" subtext="Your habit analytics and trends" />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 font-sans text-[14px] text-red-600">
              <AlertCircle className="h-4 w-4" />
              Couldn&apos;t load analytics: {(error as Error).message}
            </div>
          )}

          <StatCards
            data={{
              completionRate: analytics?.habits.completionRate ?? 0,
              avgStreak: analytics?.habits.avgStreak ?? 0,
              totalHabits: analytics?.habits.total ?? 0,
              checkinsLogged: analytics?.habits.checkinsLogged ?? 0,
            }}
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <div className="min-w-0 flex-1">
              <WeeklyActivity
                data={weekly.days}
                total={weekly.total}
                isLoading={weekly.isLoading}
              />
            </div>
            <div className="w-full shrink-0 lg:w-[329px]">
              <CategoryBreakdown categories={analytics?.pillarBreakdown ?? []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
