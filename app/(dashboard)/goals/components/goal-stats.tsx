import { Card, CardContent } from "@/components/ui/card"

export interface GoalStatsData {
  total: number
  active: number
  archived: number
  totalHabits: number
}

export function GoalStats({ data }: { data: GoalStatsData }) {
  const stats = [
    {
      label: "Total Goals",
      value: String(data.total),
      subtext: "Across all time",
      dotColor: "#7C3AED",
    },
    {
      label: "Active",
      value: String(data.active),
      subtext: "Currently tracking",
      dotColor: "#2563EB",
    },
    {
      label: "Linked Habits",
      value: String(data.totalHabits),
      subtext: "Habits under goals",
      dotColor: "#FF6B35",
    },
    {
      label: "Archived",
      value: String(data.archived),
      subtext: "Completed / shelved",
      dotColor: "#28A745",
    },
  ]

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
