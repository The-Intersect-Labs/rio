import { Header } from "@/components/header"
import { StatsCards } from "@/app/(dashboard)/dashboard/components/stats-cards"
import { WeeklyProgress } from "@/app/(dashboard)/dashboard/components/weekly-progress"
import { TodayFocus } from "@/app/(dashboard)/dashboard/components/today-focus"
import { TodayHabits } from "@/app/(dashboard)/dashboard/components/today-habits"
import { MonthlySummary } from "@/app/(dashboard)/dashboard/components/monthly-summary"
import { UpcomingReminders } from "@/app/(dashboard)/dashboard/components/upcoming-reminders"

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <Header 
        title={<>Good morning, Ireti! <span className="text-2xl">👋</span></>} 
        subtext="You are becoming a Pro! Keep up the great work." 
      />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            <StatsCards />
            <WeeklyProgress />
            <TodayFocus />
          </div>

          {/* Right Sidebar Section */}
          <div className="w-96 space-y-8">
            <TodayHabits />
            <MonthlySummary />
            <UpcomingReminders />
          </div>
        </div>
      </div>
    </div>
  )
}
