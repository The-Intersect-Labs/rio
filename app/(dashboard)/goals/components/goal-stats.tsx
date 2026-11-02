import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    label: "Total Goals",
    value: "5",
    subtext: "Active this week",
    dotColor: "#7C3AED",
  },
  {
    label: "Completed",
    value: "3",
    subtext: "60% completion rate",
    dotColor: "#2563EB",
  },
  {
    label: "Total Streak",
    value: "46",
    subtext: "Cumulative days",
    dotColor: "#FF6B35",
  },
  {
    label: "Longest Streak",
    value: "21",
    subtext: "Personal best",
    dotColor: "#28A745",
  },
]

export function GoalStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="rounded-2xl border-none bg-white shadow-sm"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <span className="font-sans text-[14px] text-[#9CA3AF]">
                {stat.label}
              </span>
              <span
                className="mt-1 h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: stat.dotColor }}
              />
            </div>
            <p className="mt-2 font-heading text-[28px] font-semibold leading-none text-[#131313]">
              {stat.value}
            </p>
            <p className="mt-2 font-sans text-[13px] text-[#9CA3AF]">
              {stat.subtext}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
