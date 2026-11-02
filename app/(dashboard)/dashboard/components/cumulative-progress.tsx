import { Card, CardContent } from "@/components/ui/card"

const rows = [
  { label: "Today", value: "1 / 4 habits complete", pct: 25 },
  { label: "Week", value: "11 / 14 habits complete", pct: 78 },
  { label: "Month", value: "46 / 60 habits complete", pct: 77 },
]

export function CumulativeProgress() {
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
                  className="h-full rounded-full bg-[#28A745]"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
