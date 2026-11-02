import { Card, CardContent } from "@/components/ui/card"
import { StreakRing } from "./streak-ring"
import type { SummaryStat } from "./data"

interface StreakSummaryProps {
  percent: number
  stats: SummaryStat[]
}

export function StreakSummary({ percent, stats }: StreakSummaryProps) {
  return (
    <Card className="rounded-3xl border-none bg-[#FCFCFC] shadow-sm">
      <CardContent className="flex flex-col items-center p-8">
        <StreakRing value={percent} />

        <div className="mt-8 grid w-full max-w-lg grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-heading text-[28px] font-bold text-[#131313]">
                {stat.value}
              </span>
              <span className="mt-1 text-center font-sans text-[13px] text-[#6B7280]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
