import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Flame, Target, ChevronRight } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      label: "Habit completed",
      value: "6/7",
      icon: CheckCircle2,
      color: "bg-[#22c55e]",
    },
    {
      label: "Current streak",
      value: "4 days",
      icon: Flame,
      color: "bg-[#8b5cf6]",
    },
    {
      label: "Goals Achieved",
      value: "7",
      icon: Target,
      color: "bg-[#f59e0b]",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className={`${stat.color} border-none text-white overflow-hidden relative group`}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 p-2 rounded-full">
                <stat.icon className="h-6 w-6" />
              </div>
              <ChevronRight className="h-5 w-5 text-white/60 group-hover:translate-x-1 transition-transform cursor-pointer" />
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-white/80 text-sm">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
