import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

const MILESTONES = [5, 10, 30]

interface MilestoneProgressProps {
  current: number
  target: number
  best: number
}

export function MilestoneProgress({ current, target, best }: MilestoneProgressProps) {
  const percent = Math.min(100, Math.round((current / target) * 100))
  const remaining = target - current

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-sans text-[13px] font-medium text-[#131313]">
          Milestone progress
        </span>
        <span className="font-sans text-[12px] text-[#9CA3AF]">
          {remaining > 0 ? `${remaining} days to ${target} day` : `${target} day reached`}
        </span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#C9D0DD]">
        <div
          className="h-full rounded-full bg-[#28A745] transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {MILESTONES.map((milestone) => {
            const reached = current >= milestone
            return (
              <span
                key={milestone}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-sans text-[12px] font-medium",
                  reached
                    ? "border-[#7C3AED]/30 bg-[#EFEAFF] text-[#7C3AED]"
                    : "border-[#E5E7EB] bg-[#FCFCFC] text-[#9CA3AF]",
                )}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border text-[10px] leading-none",
                    reached ? "border-[#7C3AED]" : "border-[#C9D0DD]",
                  )}
                >
                  {milestone}
                </span>
                {milestone}d
              </span>
            )
          })}
        </div>

        <span className="inline-flex items-center gap-1 font-sans text-[12px] text-[#9CA3AF]">
          <Trophy className="h-3.5 w-3.5" />
          Best {best}d
        </span>
      </div>
    </div>
  )
}
