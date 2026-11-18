import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface HabitSummaryProps {
  overallRate: number
  todayCompleted: number
  todayTotal: number
  bestStreak: number
  /** Mon..Sun — true = at least one check-in that day */
  week: boolean[]
}

const WEEK_LABELS = ["M", "T", "W", "T", "F", "S", "S"]

/** Segmented donut chart with the overall rate in the centre. */
function Donut({ percent }: { percent: number }) {
  const size = 130
  const stroke = 13
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const p = Math.min(100, Math.max(0, percent)) / 100
  const seg = (start: number, len: number) => ({
    strokeDasharray: `${c * len} ${c}`,
    strokeDashoffset: -c * start,
  })

  return (
    <div className="relative h-[130px] w-[130px] shrink-0">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF2FF" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#2563EB"
          strokeWidth={stroke}
          strokeLinecap="round"
          {...seg(0, p)}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-heading text-[18px] font-semibold text-[#121212]">
          {percent}%
        </span>
      </div>
    </div>
  )
}

export function HabitSummary({
  overallRate,
  todayCompleted,
  todayTotal,
  bestStreak,
  week,
}: HabitSummaryProps) {
  const legend = [
    { label: "Overall Rate", value: `${overallRate}%`, dot: "bg-[#2563EB]" },
    { label: "Today", value: `${todayCompleted}/${todayTotal}`, dot: "bg-[#F59E0B]" },
    { label: "Best Streak", value: `${bestStreak} days`, dot: "bg-[#7C3AED]" },
  ]

  return (
    <div className="flex h-full min-w-0 items-center gap-6 rounded-3xl bg-white p-6 shadow-sm">
      <Donut percent={overallRate} />

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="flex flex-col gap-4">
          {legend.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn("h-2 w-2 rounded-full", row.dot)} />
                <span className="font-sans text-[12px] text-[#6B7280]">{row.label}</span>
              </div>
              <span className="font-sans text-[12px] text-[#121212]">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          {WEEK_LABELS.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="font-sans text-[10px] font-semibold text-[#9CA3AF]">{day}</span>
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  week[i] ? "bg-[#C9D8FA] text-[#2563EB]" : "bg-[#EDF0F4]",
                )}
              >
                {week[i] && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
