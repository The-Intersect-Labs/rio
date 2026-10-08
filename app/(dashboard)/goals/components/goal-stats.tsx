import { Card, CardContent } from "@/components/ui/card"

export function GoalStats() {
  const stats = [
    {
      label: "Total Goals",
      value: "5",
      subtext: "Active this week",
      dotColor: "bg-indigo-500",
    },
    {
      label: "Completed",
      value: "3",
      subtext: "60% completion rate",
      dotColor: "bg-blue-500",
    },
    {
      label: "Total Streak",
      value: "46",
      subtext: "Cumulative days",
      dotColor: "bg-orange-500",
    },
    {
      label: "Longest Streak",
      value: "21",
      subtext: "Personal best",
      dotColor: "bg-green-500",
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="border-none shadow-sm rounded-3xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-gray-400">{stat.label}</span>
              <div className={`h-2 w-2 rounded-full ${stat.dotColor}`} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs font-medium text-gray-400 mt-1">{stat.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
