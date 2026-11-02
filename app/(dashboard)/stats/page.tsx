import { Header } from "@/components/header"
import { StatCards } from "./components/stat-cards"
import { WeeklyActivity } from "./components/weekly-activity"
import { CategoryBreakdown } from "./components/category-breakdown"

export default function StatsPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Stats" subtext="Your habit analytics and trends" />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6">
          <StatCards />

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <div className="min-w-0 flex-1">
              <WeeklyActivity />
            </div>
            <div className="w-full shrink-0 lg:w-[329px]">
              <CategoryBreakdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
