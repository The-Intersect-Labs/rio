"use client"

import { CheckCircle2, MoreVertical, Flame, Target, Droplets, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const habits = [
  {
    id: 1,
    title: "Hit the Gym",
    streak: 3,
    frequency: "Daily",
    time: "Morning",
    progress: "5/7",
    completed: false,
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    dots: [true, true, true, false, false, false, false]
  },
  {
    id: 2,
    title: "Read 10 mins",
    streak: 21,
    frequency: "Daily",
    time: "Morning",
    progress: "7/7",
    completed: true,
    icon: BookOpen,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    dots: [true, true, true, true, true, true, true]
  },
  {
    id: 3,
    title: "Drink Water",
    streak: 2,
    frequency: "Daily",
    time: "Morning",
    progress: "3/7",
    completed: false,
    icon: Droplets,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    dots: [true, true, false, false, false, false, false]
  },
  {
    id: 4,
    title: "Meditation",
    streak: 21,
    frequency: "Daily",
    time: "Morning",
    progress: "7/7",
    completed: true,
    icon: Target,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    dots: [true, true, true, true, true, true, true]
  }
]

export function HabitList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">My Habits</h3>
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          <Button variant="ghost" size="sm" className="rounded-lg bg-white shadow-sm text-xs font-bold px-4 h-8">All</Button>
          <Button variant="ghost" size="sm" className="rounded-lg text-gray-500 text-xs font-bold px-4 h-8">Daily</Button>
          <Button variant="ghost" size="sm" className="rounded-lg text-gray-500 text-xs font-bold px-4 h-8">Weekly</Button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <Button variant="link" size="sm" className="text-blue-600 text-xs font-bold px-2 h-8 decoration-0">View All</Button>
        </div>
      </div>

      <div className="space-y-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={cn(
              "group flex items-center justify-between p-5 rounded-3xl bg-white border border-transparent hover:border-blue-100 hover:shadow-md transition-all",
              habit.completed && "opacity-90"
            )}
          >
            <div className="flex items-center gap-5">
              <div className={cn("p-3 rounded-2xl", habit.bgColor)}>
                <habit.icon className={cn("h-6 w-6", habit.color)} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className={cn("font-bold text-gray-900", habit.completed && "line-through text-gray-400")}>
                    {habit.title}
                  </h4>
                  <div className="flex items-center gap-1 bg-purple-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-purple-600">
                    <Flame className="h-3 w-3 fill-purple-600" />
                    {habit.streak}
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    {habit.frequency}
                  </span>
                  <span className="text-[10px] font-medium text-gray-400">
                    {habit.time}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {habit.dots.map((active, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1 w-4 rounded-full",
                        active ? "bg-indigo-500" : "bg-gray-100"
                      )}
                    />
                  ))}
                  <span className="text-[10px] font-bold text-gray-300 ml-1">{habit.progress}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center transition-all border-2",
                  habit.completed
                    ? "bg-green-500 border-green-500 text-white shadow-sm shadow-green-200"
                    : "bg-gray-50 border-gray-100 text-gray-300 hover:border-blue-200 hover:text-blue-400"
                )}
              >
                <CheckCircle2 className="h-6 w-6" />
              </button>
              <button className="h-10 w-10 flex items-center justify-center text-gray-300 hover:text-gray-600 transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
