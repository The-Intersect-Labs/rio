import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Flame, Target, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function TodayHabits() {
  const habits = [
    { label: "Hit the Gym", time: "8:00am", completed: true, icon: Flame },
    { label: "Read 10 mins", time: "8:00am", completed: false, icon: Target },
    { label: "Drink Water", time: "9:00am", completed: false, icon: Flame },
    { label: "Sleep by 10pm", time: "10:00pm", completed: false, icon: Target },
  ]

  return (
    <Card className="border-none shadow-sm rounded-3xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Today's Habits</h3>
          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-md">1/4</span>
        </div>
        
        <div className="space-y-4 mb-8">
          {habits.map((habit, i) => (
            <div 
              key={i} 
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border transition-all",
                habit.completed ? "bg-green-50 border-green-100" : "bg-white border-gray-100"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2.5 rounded-xl",
                  habit.completed ? "bg-green-500 text-white" : "bg-gray-50 text-gray-400"
                )}>
                  <habit.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className={cn("font-bold text-sm", habit.completed ? "text-green-700 line-through opacity-70" : "text-gray-900")}>
                    {habit.label}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">{habit.time}</p>
                </div>
              </div>
              <div className={cn(
                "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                habit.completed ? "bg-green-500 border-green-500" : "border-gray-200"
              )}>
                {habit.completed && <CheckCircle2 className="h-4 w-4 text-white" />}
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full py-6 rounded-2xl border-dashed border-gray-200 text-blue-600 font-semibold text-base hover:bg-blue-50 hover:border-blue-200 transition-all">
          <Plus className="h-5 w-5 mr-2" /> Add New Habit
        </Button>
      </CardContent>
    </Card>
  )
}
