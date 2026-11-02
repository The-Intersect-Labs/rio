import { Header } from "@/components/header"
import { AddHabitButton } from "@/components/add-habit-dialog"
import { TodayHabits } from "@/app/(dashboard)/dashboard/components/today-habits"
import { StreakCard } from "@/app/(dashboard)/dashboard/components/streak-card"
import { CumulativeProgress } from "@/app/(dashboard)/dashboard/components/cumulative-progress"
import { SmartSuggestion } from "@/app/(dashboard)/dashboard/components/smart-suggestion"

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col">
      <Header
        title={<>Good morning, Ireti! 👋</>}
        subtext="You are becoming a Pro! Keep up the great work."
        action={<AddHabitButton />}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex gap-8">
          <div className="min-w-0 flex-1">
            <TodayHabits />
          </div>

          <div className="w-[329px] shrink-0 space-y-6">
            <StreakCard />
            <CumulativeProgress />
            <SmartSuggestion />
          </div>
        </div>
      </div>
    </div>
  )
}
