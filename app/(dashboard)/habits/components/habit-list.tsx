import { Flame, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Habit {
  emoji: string
  title: string
  streak?: number
  frequency: string
  time: string
  progress: number
  total: number
  completed: boolean
}

const HABITS: Habit[] = [
  { emoji: "🏋️", title: "Hit the Gym", streak: 9, frequency: "Daily", time: "Morning", progress: 5, total: 7, completed: false },
  { emoji: "📖", title: "Read 10 mins", streak: 8, frequency: "Daily", time: "Morning", progress: 7, total: 7, completed: true },
  { emoji: "💧", title: "Drink Water", frequency: "Daily", time: "Morning", progress: 3, total: 7, completed: false },
  { emoji: "🧘", title: "Meditation", streak: 21, frequency: "Daily", time: "Morning", progress: 7, total: 7, completed: true },
]

const TABS = ["All", "Daily", "Weekly"]

export function HabitList() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-[16px] font-medium text-[#121212]">My Habits</h2>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-2xl bg-white p-1 shadow-sm">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                className={cn(
                  "rounded-xl px-3.5 py-1.5 font-sans text-[12px] transition-colors",
                  i === 0 ? "bg-[#F1F1F1] font-medium text-[#121212]" : "text-[#6B7280] hover:text-[#121212]",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="font-sans text-[12px] text-[#2563EB] hover:underline">View All</button>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {HABITS.map((habit) => (
          <div
            key={habit.title}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C9D8FA] text-[16px]">
              {habit.emoji}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="font-sans text-[14px] font-medium text-[#121212]">{habit.title}</span>
                {habit.streak !== undefined && (
                  <span className="flex items-center gap-1 rounded-md bg-[#F3EBFF] px-1.5 py-0.5">
                    <Flame className="h-3 w-3 fill-[#7C3AED] text-[#7C3AED]" />
                    <span className="font-sans text-[10px] font-medium text-[#7C3AED]">{habit.streak}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-[#C9D8FA] px-1.5 py-0.5 font-sans text-[10px] font-medium text-[#2563EB]">
                  {habit.frequency}
                </span>
                <span className="font-sans text-[10px] text-[#C9D0DD]">{habit.time}</span>
              </div>

              <div className="flex items-center gap-1">
                {Array.from({ length: habit.total }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-[5px] w-3 rounded-full",
                      i < habit.progress ? "bg-[#7C3AED]" : "bg-[#F1F1F1]",
                    )}
                  />
                ))}
                <span className="ml-1 font-sans text-[10px] text-[#C9D0DD]">
                  {habit.progress}/{habit.total}
                </span>
              </div>
            </div>

            <button
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
                habit.completed ? "bg-[#28A745] text-white" : "bg-[#F1F1F1] text-[#C9D0DD]",
              )}
            >
              <Check className="h-4 w-4" strokeWidth={3} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
