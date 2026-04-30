import { Card, CardContent } from "@/components/ui/card"
import { Flame, Target, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function UpcomingReminders() {
  const reminders = [
    { label: "Drink Water", time: "9:00 AM", color: "bg-blue-500", icon: Flame },
    { label: "Meditate 5min", time: "12:00 PM", color: "bg-purple-500", icon: Target },
    { label: "Sleep by 10pm", time: "10:00 PM", color: "bg-orange-500", icon: CheckCircle2 },
  ]

  return (
    <Card className="border-none shadow-sm rounded-3xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-6">Upcoming Reminders</h3>
        <div className="space-y-6">
          {reminders.map((reminder, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-gray-50 text-gray-400">
                  <reminder.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">{reminder.label}</p>
                  <p className="text-xs text-gray-400 font-medium">{reminder.time}</p>
                </div>
              </div>
              <div className={cn("h-2 w-2 rounded-full", reminder.color)} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
