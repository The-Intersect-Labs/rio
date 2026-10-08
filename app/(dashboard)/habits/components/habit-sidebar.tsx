import { Card, CardContent } from "@/components/ui/card"
import { Flame, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"

export function HabitSidebar() {
  return (
    <div className="space-y-8">
      {/* Calendar Section */}
      <Card className="border-none shadow-sm rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900">April 2026</h4>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="h-4 w-4 text-gray-400" /></button>
              <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="h-4 w-4 text-gray-400" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
              <span key={day} className="text-[10px] font-bold text-gray-300 uppercase py-2">{day}</span>
            ))}
            {[...Array(30)].map((_, i) => {
              const day = i + 1
              const isSelected = day === 6
              const isToday = day === 30
              const hasActivity = [1, 2, 3, 4, 5, 6].includes(day)
              
              return (
                <div 
                  key={i} 
                  className={`
                    h-8 w-8 flex items-center justify-center text-xs font-bold rounded-lg cursor-pointer transition-all
                    ${isSelected ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-50"}
                    ${hasActivity && !isSelected ? "bg-blue-50 text-blue-600" : ""}
                    ${isToday ? "ring-2 ring-blue-200" : ""}
                  `}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Best Streaks */}
      <Card className="border-none shadow-sm rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-gray-900">Best Streaks</h4>
            <Flame className="h-4 w-4 text-orange-500" />
          </div>
          <div className="space-y-5">
            {[
              { label: "Meditation", value: 21, color: "bg-indigo-500", icon: "🧘" },
              { label: "Hit the Gym", value: 9, color: "bg-orange-500", icon: "🏋️" },
              { label: "Read 10 mins", value: 8, color: "bg-blue-500", icon: "📖" },
            ].map((streak, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{streak.icon}</span>
                    <span className="text-sm font-bold text-gray-700">{streak.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-500 fill-orange-500" />
                    <span className="text-xs font-bold text-gray-900">{streak.value}</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${streak.color} rounded-full`} style={{ width: `${(streak.value / 25) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Today */}
      <Card className="border-none shadow-sm rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-gray-900">Upcoming Today</h4>
            <button className="text-xs font-bold text-blue-500 hover:text-blue-600">See all</button>
          </div>
          <div className="space-y-4">
            {[
              { label: "Drink Water", time: "Now", icon: "💧" },
              { label: "Evening Run", time: "6:00 PM", icon: "🏃" },
              { label: "Journal", time: "9:00 PM", icon: "📓" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.label}</p>
                    <p className="text-[10px] font-medium text-gray-400">{item.time}</p>
                  </div>
                </div>
                <div className="h-5 w-5 rounded-full border-2 border-gray-100" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Tip */}
      <Card className="border-none shadow-sm bg-amber-50 rounded-3xl border-amber-100">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <h4 className="font-bold text-amber-900 text-sm">Daily Tip</h4>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            You&apos;re on a 4-day streak! Keep the momentum — consistency is the key to lasting habits.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
