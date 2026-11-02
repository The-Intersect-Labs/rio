import { Flame } from "lucide-react"
import { Header } from "@/components/header"
import { HabitSummary } from "./components/habit-summary"
import { HabitStats } from "./components/habit-stats"
import { HabitList } from "./components/habit-list"
import { HabitSidebar } from "./components/habit-sidebar"

export default function HabitsPage() {
  return (
    <div className="flex h-full flex-col">
      <Header
        title="Habit Tracker"
        subtext="Monday, April 6, 2026"
        action={
          <div className="flex items-center gap-1.5 rounded-full bg-[#FDE7C2] px-3 py-1.5">
            <Flame className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span className="font-sans text-[12px] font-semibold text-[#F59E0B]">2/5</span>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex gap-8">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="grid min-h-[245px] grid-cols-[minmax(0,483fr)_minmax(0,276fr)] gap-3">
              <HabitSummary />
              <HabitStats />
            </div>

            <HabitList />
          </div>

          <div className="w-[340px] shrink-0">
            <HabitSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
