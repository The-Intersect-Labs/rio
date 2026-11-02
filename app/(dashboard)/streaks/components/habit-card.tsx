import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Habit } from "./data"
import { WeekDots } from "./week-dots"
import { MilestoneProgress } from "./milestone-progress"

const badgeStyles: Record<string, string> = {
  new: "bg-[#F1F1F1] text-[#6B7280]",
  active: "bg-[#E7F6EC] text-[#228E3B]",
}

export function HabitCard({ habit }: { habit: Habit }) {
  const Icon = habit.icon

  return (
    <Card className="rounded-3xl border-none bg-[#FCFCFC] shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EFEAFF] text-[#7C3AED]">
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-heading text-[16px] font-semibold text-[#131313]">
                {habit.name}
              </p>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    habit.badge.tone === "active" ? "bg-[#228E3B]" : "bg-[#9CA3AF]",
                  )}
                />
                <span
                  className={cn(
                    "inline-flex items-center rounded-md px-2 py-0.5 font-sans text-[12px] font-medium",
                    badgeStyles[habit.badge.tone],
                  )}
                >
                  {habit.badge.label}
                </span>
              </span>
            </div>
            <p className="mt-0.5 font-sans text-[13px] text-[#9CA3AF]">
              Last: {habit.last}
            </p>
          </div>

          <div className="text-right">
            <p className="font-heading text-[26px] font-bold leading-none text-[#7C3AED]">
              {habit.days}
            </p>
            <p className="mt-0.5 font-sans text-[11px] text-[#9CA3AF]">days</p>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2.5 font-sans text-[13px] font-medium text-[#131313]">
            This week
          </p>
          <WeekDots week={habit.week} />
        </div>

        <div className="mt-5">
          <MilestoneProgress
            current={habit.milestoneCurrent}
            target={habit.milestoneTarget}
            best={habit.best}
          />
        </div>
      </CardContent>
    </Card>
  )
}
