import { Card, CardContent } from "@/components/ui/card"

interface ProgressRow {
  label: string
  value: string
  pct: number
}

interface CumulativeProgressProps {
  today: { completed: number; total: number }
  weekPct: number
  monthPct?: number
}

export function CumulativeProgress({ today, weekPct, monthPct }: CumulativeProgressProps) {
  const rows: ProgressRow[] = [
    {
      label: "Today",
      value: `${today.completed} / ${today.total} habits complete`,
      pct: today.total ? Math.round((today.completed / today.total) * 100) : 0,
    },
    { label: "Week", value: `${weekPct}% consistency`, pct: weekPct },
  ]
  if (monthPct !== undefined) {
    rows.push({ label: "Month (30d)", value: `${monthPct}% completion`, pct: monthPct })
  }

  return (
    <Card className="rounded-3xl border-none bg-[#FCFCFC] shadow-sm">
      <CardContent className="p-5">
        <h3 className="mb-4 font-heading text-[16px] font-semibold text-[#131313]">
          Cumulative Progress
        </h3>

        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[14px] font-medium text-[#131313]">
                  {row.label}
                </span>
                <span className="font-sans text-[12px] text-[#6B7280]">{row.value}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#C9D0DD]">
                <div
                  className="h-full rounded-full bg-[#28A745] transition-all"
                  style={{ width: `${Math.min(100, Math.max(0, row.pct))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
