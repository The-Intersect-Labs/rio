import type { LucideIcon } from "lucide-react"
import { Target, Flame, ListChecks, CalendarCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Stat {
  label: string
  value: string
  subtext: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export interface StatCardsData {
  completionRate: number
  avgStreak: number
  totalHabits: number
  checkinsLogged: number
}

function buildStats(data: StatCardsData): Stat[] {
  return [
    {
      label: "Completion Rate",
      value: `${Math.round(data.completionRate)}%`,
      subtext: "Last 30 days",
      icon: Target,
      iconBg: "bg-[#EBF1FF]",
      iconColor: "text-[#2563EB]",
    },
    {
      label: "Avg Streak",
      value: String(Math.round(data.avgStreak)),
      subtext: "Days across habits",
      icon: Flame,
      iconBg: "bg-[#FFDACD]",
      iconColor: "text-[#FF6B35]",
    },
    {
      label: "Total Habits",
      value: String(data.totalHabits),
      subtext: "Being tracked",
      icon: ListChecks,
      iconBg: "bg-[#DECEFB]",
      iconColor: "text-[#7C3AED]",
    },
    {
      label: "Check-ins",
      value: String(data.checkinsLogged),
      subtext: "Last 30 days",
      icon: CalendarCheck,
      iconBg: "bg-[#F1FBF4]",
      iconColor: "text-[#228E3B]",
    },
  ]
}

export function StatCards({ data }: { data: StatCardsData }) {
  const stats = buildStats(data)
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="rounded-3xl border-none bg-[#FCFCFC] shadow-sm">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  stat.iconBg,
                  stat.iconColor,
                )}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="font-heading text-[28px] font-semibold leading-none text-[#131313]">
              {stat.value}
            </p>
            <p className="mt-2 font-sans text-[14px] font-medium text-[#131313]">
              {stat.label}
            </p>
            <p className="mt-0.5 font-sans text-[12px] text-[#6B7280]">{stat.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
