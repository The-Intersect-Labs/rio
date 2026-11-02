import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const LEGEND = [
  { label: "Overall Rate", value: "50%", dot: "bg-[#2563EB]" },
  { label: "Today", value: "2/5", dot: "bg-[#F59E0B]" },
  { label: "Best Streak", value: "21 days", dot: "bg-[#7C3AED]" },
]

const WEEK = [
  { day: "M", done: true },
  { day: "T", done: true },
  { day: "W", done: true },
  { day: "T", done: true },
  { day: "F", done: false },
  { day: "S", done: false },
  { day: "S", done: false },
]

/** Segmented donut chart with the overall rate in the centre. */
function Donut() {
  const size = 130
  const stroke = 13
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const seg = (start: number, len: number) => ({
    strokeDasharray: `${c * len} ${c}`,
    strokeDashoffset: -c * start,
  })

  return (
    <div className="relative h-[130px] w-[130px] shrink-0">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF2FF" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2563EB" strokeWidth={stroke} strokeLinecap="round" {...seg(0, 0.46)} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F59E0B" strokeWidth={stroke} strokeLinecap="round" {...seg(0.53, 0.19)} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#93B4F5" strokeWidth={stroke} strokeLinecap="round" {...seg(0.79, 0.13)} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-heading text-[18px] font-semibold text-[#121212]">50%</span>
      </div>
    </div>
  )
}

export function HabitSummary() {
  return (
    <div className="flex h-full min-w-0 items-center gap-6 rounded-3xl bg-white p-6 shadow-sm">
      <Donut />

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="flex flex-col gap-4">
          {LEGEND.map((row) => (
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
          {WEEK.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="font-sans text-[10px] font-semibold text-[#9CA3AF]">{item.day}</span>
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  item.done ? "bg-[#C9D8FA] text-[#2563EB]" : "bg-[#EDF0F4]",
                )}
              >
                {item.done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
