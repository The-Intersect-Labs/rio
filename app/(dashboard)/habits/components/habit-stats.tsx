import { BarChart2, Flame, Check } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  value: string
  label: string
  iconBg: string
  iconColor: string
  icon: ReactNode
}

function StatCard({ value, label, iconBg, iconColor, icon }: StatCardProps) {
  return (
    <div className="flex min-w-0 flex-col rounded-3xl bg-white p-3.5 shadow-sm">
      <div className={cn("mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg", iconBg, iconColor)}>
        {icon}
      </div>
      <p className="font-heading text-[22px] font-semibold leading-none text-[#121212]">{value}</p>
      <p className="mt-1.5 font-sans text-[11px] leading-tight text-[#6B7280]">{label}</p>
    </div>
  )
}

interface HabitStatsProps {
  activeHabits: number
  bestStreak: number
  completedToday: number
  totalHabits: number
}

export function HabitStats({ activeHabits, bestStreak, completedToday, totalHabits }: HabitStatsProps) {
  const pct = totalHabits ? Math.round((completedToday / totalHabits) * 100) : 0

  return (
    <div className="grid h-full min-w-0 grid-cols-[minmax(0,133fr)_minmax(0,142fr)] gap-3">
      <div className="grid min-w-0 grid-rows-2 gap-3">
        <StatCard
          value={String(activeHabits)}
          label="Active Habits"
          iconBg="bg-[#EEF2FF]"
          iconColor="text-[#6366F1]"
          icon={<BarChart2 className="h-4 w-4" />}
        />
        <StatCard
          value={String(bestStreak)}
          label="Best Streak"
          iconBg="bg-[#FEF3C7]"
          iconColor="text-[#F59E0B]"
          icon={<Flame className="h-4 w-4" />}
        />
      </div>

      <div className="flex min-w-0 flex-col rounded-3xl bg-white p-3.5 shadow-sm">
        <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#22C55E]">
          <Check className="h-4 w-4" strokeWidth={3} />
        </div>
        <p className="font-heading text-[22px] font-semibold leading-none text-[#121212]">
          {completedToday}/{totalHabits}
        </p>
        <p className="mt-1.5 font-sans text-[11px] leading-tight text-[#6B7280]">Completed Today</p>

        <div className="mt-auto space-y-2 pt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F1F1F1]">
            <div className="h-full rounded-full bg-[#28A745]" style={{ width: `${pct}%` }} />
          </div>
          <p className="font-sans text-[11px] leading-tight text-[#6B7280]">{pct}% of today&apos;s habits</p>
        </div>
      </div>
    </div>
  )
}
