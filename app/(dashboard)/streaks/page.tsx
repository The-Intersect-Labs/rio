import { Header } from "@/components/header"
import { StreakSummary } from "./components/streak-summary"
import { HabitCard } from "./components/habit-card"
import { habitGroups, summaryStats } from "./components/data"

export default function StreaksPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Daily Streak" subtext="Monitor your daily streak" />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <StreakSummary percent={0} stats={summaryStats} />

          {habitGroups.map((group) => (
            <section key={group.category} className="space-y-4">
              <h2 className="font-heading text-[20px] font-semibold text-[#131313]">
                {group.category}
              </h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {group.habits.map((habit) => (
                  <HabitCard key={habit.id} habit={habit} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
