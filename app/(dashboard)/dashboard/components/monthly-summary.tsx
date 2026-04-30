import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function MonthlySummary() {
  const summaries = [
    { label: "Habits Completed", value: 84, color: "bg-green-500" },
    { label: "Streak Days", value: 70, color: "bg-purple-500" },
    { label: "Goals Reached", value: 58, color: "bg-orange-500" },
  ]

  return (
    <Card className="border-none shadow-sm rounded-3xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-6">Monthly Summary</h3>
        <div className="space-y-6">
          {summaries.map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-gray-400">{stat.label}</span>
                <span className="text-gray-900">{stat.value}%</span>
              </div>
              <Progress value={stat.value} className="h-2.5" indicatorClassName={stat.color} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
