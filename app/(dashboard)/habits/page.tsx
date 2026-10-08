import { Header } from "@/components/header"
import { HabitSummary } from "./components/habit-summary"
import { HabitStats } from "./components/habit-stats"
import { HabitList } from "./components/habit-list"
import { HabitSidebar } from "./components/habit-sidebar"

export default function HabitsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Habit Tracker" subtext="Monday, April 6, 2026" />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Overview Section - Side by Side as per reference */}
            <div className="flex gap-6 h-[340px]">
              <div className="flex-[3]">
                <HabitSummary />
              </div>
              <div className="flex-[2]">
                <HabitStats />
              </div>
            </div>

            <HabitList />
          </div>

          {/* Right Sidebar Section */}
          <div className="w-96 space-y-8">
            <HabitSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
