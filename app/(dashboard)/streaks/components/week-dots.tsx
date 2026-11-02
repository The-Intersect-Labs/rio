import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

export function WeekDots({ week }: { week: boolean[] }) {
  return (
    <div className="flex items-center gap-2.5">
      {DAYS.map((day, index) => {
        const done = week[index]
        return (
          <div key={day} className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full",
                done ? "bg-[#7C3AED]" : "bg-[#F1F1F1]",
              )}
            >
              {done && (
                <Check className="h-4 w-4 text-[#EFEAFF]" strokeWidth={3} />
              )}
            </div>
            <span className="font-sans text-[12px] text-[#9CA3AF]">{day}</span>
          </div>
        )
      })}
    </div>
  )
}
