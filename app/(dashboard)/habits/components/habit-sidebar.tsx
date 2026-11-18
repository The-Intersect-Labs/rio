import { ChevronLeft, ChevronRight, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Habit } from "@/lib/api/types"

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const BARS = ["bg-[#7C3AED]", "bg-[#F59E0B]", "bg-[#2563EB]", "bg-[#10B981]", "bg-[#EC4899]"]
const TRACKS = ["bg-[#7C3AED]", "bg-[#F59E0B]", "bg-[#2563EB]", "bg-[#10B981]", "bg-[#EC4899]"]
const TRACK = ["bg-[#7C3AED]", "bg-[#F59E0B]", "bg-[#2563EB]", "bg-[#10B981]", "bg-[#EC4899]"]

function CalendarCard() {
  const now = new Date()
  const monthLabel = now.toLocaleDateString(undefined, { month: "long", year: "numeric" })
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay()
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const today = now.getDate()

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-sans text-[18px] font-semibold text-[#121212]">{monthLabel}</h3>
        <div className="flex items-center gap-1">
          <button className="flex h-7 w-7 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6]">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="font-sans text-[13px] font-medium text-[#9CA3AF]">
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <span key={`e${i}`} className="h-9 w-9" />
          const isToday = day === today
          return (
            <div key={day} className="flex items-center justify-center">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full font-sans text-[13px]",
                  isToday ? "bg-[#2563EB] font-bold text-white" : "text-[#D1D5DB]",
                )}
              >
                {day}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function BestStreaksCard({ habits }: { habits: Habit[] }) {
  const sorted = [...habits]
    .sort((a, b) => (b.streak?.currentStreak ?? 0) - (a.streak?.currentStreak ?? 0))
    .slice(0, 3)

  const max = Math.max(1, ...sorted.map((h) => h.streak?.currentStreak ?? 0))

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-sans text-[18px] font-semibold text-[#121212]">Best Streaks</h3>
        <Flame className="h-[18px] w-[18px] fill-[#F59E0B] text-[#F59E0B]" />
      </div>

      {sorted.length === 0 ? (
        <p className="font-sans text-[13px] text-[#6B7280]">No habits tracked yet.</p>
      ) : (
        <div className="flex flex-col gap-3.5">
          {sorted.map((h, i) => {
            const value = h.streak?.currentStreak ?? 0
            return (
              <div key={h.id} className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-[16px]">
                  {i === 0 ? "🔥" : "✨"}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span className="truncate font-sans text-[14px] font-medium text-[#121212]">
                    {h.title}
                  </span>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F1F1F1]">
                    <div
                      className={cn("h-full rounded-full", BARS[i % BARS.length])}
                      style={{ width: `${Math.round((value / max) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="font-sans text-[14px] font-bold text-[#F59E0B]">{value}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function UpcomingCard({ habits }: { habits: Habit[] }) {
  const upcoming = habits.filter((h) => h.scheduledTime).slice(0, 4)

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-sans text-[18px] font-semibold text-[#121212]">Upcoming Today</h3>
        <span className="font-sans text-[13px] text-[#6B7280]">{upcoming.length}</span>
      </div>

      {upcoming.length === 0 ? (
        <p className="font-sans text-[13px] text-[#6B7280]">No habits scheduled.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {upcoming.map((h) => (
            <div key={h.id} className="flex items-center gap-3 rounded-2xl p-1.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5F7FA] text-[16px]">
                🔔
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-sans text-[14px] font-medium text-[#121212]">
                  {h.title}
                </span>
                <span className="font-sans text-[13px] text-[#6B7280]">{h.scheduledTime}</span>
              </div>
              <div className="h-5 w-5 shrink-0 rounded-full border-2 border-[#E5E7EB]" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DailyTipCard({ habits }: { habits: Habit[] }) {
  const best = habits.reduce((m, h) => Math.max(m, h.streak?.currentStreak ?? 0), 0)
  const tip = best > 0
    ? `You're on a ${best}-day streak! Keep the momentum — consistency is the key to lasting habits.`
    : "Pick one keystone habit and repeat it daily. Momentum builds from a single decision."

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[18px]">💡</span>
        <h3 className="font-sans text-[16px] font-semibold text-[#121212]">Daily Tip</h3>
      </div>
      <p className="font-sans text-[14px] leading-relaxed text-[#6B7280]">{tip}</p>
    </div>
  )
}

export function HabitSidebar({ habits }: { habits: Habit[] }) {
  return (
    <div className="flex flex-col gap-4">
      <CalendarCard />
      <BestStreaksCard habits={habits} />
      <UpcomingCard habits={habits} />
      <DailyTipCard habits={habits} />
    </div>
  )
}
