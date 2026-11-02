import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { label: "HEALTH", value: 86, count: "24 / 28" },
  { label: "MINDSET", value: 72, count: "18 / 25" },
  { label: "FOCUS", value: 64, count: "16 / 25" },
]

export function CategoryBreakdown() {
  return (
    <Card className="rounded-3xl border-none bg-[#FCFCFC] shadow-sm">
      <CardContent className="p-6">
        <h3 className="mb-1 font-heading text-[18px] font-semibold text-[#131313]">
          Category Breakdown
        </h3>
        <p className="mb-5 font-sans text-[13px] text-[#6B7280]">
          Completion by habit category
        </p>

        <div className="space-y-5">
          {categories.map((cat) => (
            <div key={cat.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-[#F1F1F1] px-2 py-0.5 font-sans text-[12px] font-medium tracking-wide text-[#6B7280]">
                  {cat.label}
                </span>
                <span className="font-sans text-[13px] font-semibold text-[#131313]">
                  {cat.value}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#C9D0DD]">
                <div
                  className="h-full rounded-full bg-[#28A745]"
                  style={{ width: `${cat.value}%` }}
                />
              </div>
              <p className="font-sans text-[12px] text-[#6B7280]">
                {cat.count} habits completed
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
