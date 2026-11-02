import { ChevronLeft, ChevronRight, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

// April 2026 — starts on Wednesday (3 leading blanks), 30 days.
const LEADING = 3
const DAYS = 30

const STREAKS = [
  { emoji: "🧘", label: "Meditation", value: 21, bar: "bg-[#7C3AED]", color: "text-[#7C3AED]", track: "73%" },
  { emoji: "🏋️", label: "Hit the Gym", value: 9, bar: "bg-[#F59E0B]", color: "text-[#F59E0B]", track: "40%" },
  { emoji: "📖", label: "Read 10 mins", value: 8, bar: "bg-[#2563EB]", color: "text-[#2563EB]", track: "36%" },
]

const UPCOMING = [
  { emoji: "💧", label: "Drink Water", time: "Now" },
  { emoji: "🏃", label: "Evening Run", time: "6:00 PM" },
  { emoji: "📝", label: "Journal", time: "9:00 PM" },
]

function CalendarCard() {
  const cells: (number | null)[] = [
    ...Array(LEADING).fill(null),
    ...Array.from({ length: DAYS }, (_, i) => i + 1),
  ]

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-sans text-[18px] font-semibold text-[#121212]">April 2026</h3>
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
          const active = day === 1 || day === 2 || day === 3 || day === 4
          const today = day === 5
          const selected = day === 6
          return (
            <div key={day} className="flex items-center justify-center">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full font-sans text-[13px]",
                  selected && "bg-[#2563EB] font-bold text-white",
                  active && "bg-[#C9D8FA] text-[#2563EB]",
                  today && "text-[#2563EB]",
                  !active && !today && !selected && "text-[#D1D5DB]",
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

function BestStreaksCard() {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-sans text-[18px] font-semibold text-[#121212]">Best Streaks</h3>
        <Flame className="h-[18px] w-[18px] fill-[#F59E0B] text-[#F59E0B]" />
      </div>

      <div className="flex flex-col gap-3.5">
        {STREAKS.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3EBFF] text-[18px]">
              {s.emoji}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="font-sans text-[14px] font-medium text-[#121212]">{s.label}</span>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F1F1F1]">
                <div className={cn("h-full rounded-full", s.bar)} style={{ width: s.track }} />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Flame className={cn("h-3.5 w-3.5 fill-current", s.color)} />
              <span className={cn("font-sans text-[14px] font-bold", s.color)}>{s.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UpcomingCard() {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-sans text-[18px] font-semibold text-[#121212]">Upcoming Today</h3>
        <button className="font-sans text-[14px] font-medium text-[#2563EB] hover:underline">See all</button>
      </div>

      <div className="flex flex-col">
        {UPCOMING.map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-2xl p-1.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5F7FA] text-[16px]">
              {item.emoji}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="font-sans text-[14px] font-medium text-[#121212]">{item.label}</span>
              <span className="font-sans text-[13px] text-[#6B7280]">{item.time}</span>
            </div>
            <div className="h-5 w-5 shrink-0 rounded-full border-2 border-[#E5E7EB]" />
          </div>
        ))}
      </div>
    </div>
  )
}

function DailyTipCard() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[18px]">💡</span>
        <h3 className="font-sans text-[16px] font-semibold text-[#121212]">Daily Tip</h3>
      </div>
      <p className="font-sans text-[14px] leading-relaxed text-[#6B7280]">
        You&apos;re on a 4-day streak! Keep the momentum — consistency is the key to lasting habits.
      </p>
    </div>
  )
}

export function HabitSidebar() {
  return (
    <div className="flex flex-col gap-4">
      <CalendarCard />
      <BestStreaksCard />
      <UpcomingCard />
      <DailyTipCard />
    </div>
  )
}
