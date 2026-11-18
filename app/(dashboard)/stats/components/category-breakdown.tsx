import { Card, CardContent } from "@/components/ui/card"

export interface PillarEntry {
  pillar: string
  completionRate: number
}

export function CategoryBreakdown({ categories }: { categories: PillarEntry[] }) {
  return (
    <Card className="rounded-3xl border-none bg-[#FCFCFC] shadow-sm">
      <CardContent className="p-6">
        <h3 className="mb-1 font-heading text-[18px] font-semibold text-[#131313]">
          Category Breakdown
        </h3>
        <p className="mb-5 font-sans text-[13px] text-[#6B7280]">
          Completion by habit pillar
        </p>

        {categories.length === 0 && (
          <p className="font-sans text-[13px] text-[#9CA3AF]">
            No check-ins yet — stats will appear as you log habits.
          </p>
        )}

        <div className="space-y-5">
          {categories.map((cat) => {
            const value = Math.round(cat.completionRate)
            return (
              <div key={cat.pillar} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#F1F1F1] px-2 py-0.5 font-sans text-[12px] font-medium tracking-wide text-[#6B7280]">
                    {cat.pillar.replace(/_/g, " ").toUpperCase()}
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-[#131313]">
                    {value}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#C9D0DD]">
                  <div
                    className="h-full rounded-full bg-[#28A745]"
                    style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
