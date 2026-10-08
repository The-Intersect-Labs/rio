"use client"

import { Edit2, Trash2, Flame, BookOpen, Droplets, Target, Waves } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const goals = [
  {
    id: 1,
    title: "Read 10 mins",
    streak: 3,
    frequency: "Daily",
    time: "Morning",
    progress: "7/7",
    category: "Learning",
    status: "Completed",
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    dots: [true, true, true, true, true, true, true],
  },
  {
    id: 2,
    title: "Drink Water",
    streak: 3,
    frequency: "Daily",
    time: "Morning",
    progress: "3/7",
    category: "Health",
    status: "In Progress",
    icon: Droplets,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    dots: [true, true, true, false, false, false, false],
  },
  {
    id: 3,
    title: "Meditation",
    streak: 21,
    frequency: "Daily",
    time: "Morning",
    progress: "7/7",
    category: "Wellness",
    status: "Completed",
    icon: Target,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    dots: [true, true, true, true, true, true, true],
  },
  {
    id: 4,
    title: "Read 10 mins",
    streak: 3,
    frequency: "Daily",
    time: "Morning",
    progress: "7/7",
    category: "Learning",
    status: "Completed",
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    dots: [true, true, true, true, true, true, true],
  },
  {
    id: 5,
    title: "Hit the Gym",
    streak: 9,
    frequency: "Daily",
    time: "Morning",
    progress: "5/7",
    category: "Fitness",
    status: "In Progress",
    icon: Waves,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    dots: [true, true, true, true, true, false, false],
  },
]

export function GoalList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="rounded-lg bg-indigo-600 shadow text-white hover:bg-indigo-700 text-xs font-bold px-4 h-8">All</Button>
          <Button variant="ghost" size="sm" className="rounded-lg text-gray-500 bg-white shadow hover:bg-gray-100 text-xs font-bold px-4 h-8">Active</Button>
          <Button variant="ghost" size="sm" className="rounded-lg text-gray-500 bg-white shadow hover:bg-gray-100 text-xs font-bold px-4 h-8">Completed</Button>
        </div>
        <span className="text-xs font-bold text-gray-400">5 goals</span>
      </div>

      <div className="w-full">
        {/* Table Header */}
        <div className="flex items-center justify-between px-8 py-3 text-[10px] font-bold text-gray-300 uppercase tracking-wider">
          <span>Goal</span>
          <div className="flex gap-13">
          <span className="">Category</span>
          <span className="">Status</span>
          <span className="">Actions</span>
          </div>
        </div>

        {/* Goal Items */}
        <div className="space-y-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="grid grid-cols-[1fr,200px,150px,120px] items-center p-5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all border border-transparent hover:border-indigo-100"
            >
              {/* Goal Info */}
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-6">

                  <div className={cn("p-3 rounded-2xl h-fit", goal.bgColor)}>
                    <goal.icon className={cn("h-6 w-6", goal.color)} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={cn("font-bold text-gray-900", goal.status === "Completed" && "line-through text-gray-400")}>
                        {goal.title}
                      </h4>
                      <div className="flex items-center gap-1 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-indigo-600">
                        <Flame className="h-3 w-3 fill-indigo-600" />
                        {goal.streak}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {goal.frequency}
                      </span>
                      <span className="text-[10px] font-medium text-gray-300">
                        {goal.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      {goal.dots.map((active, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-2 w-4 rounded-full",
                            active ? "bg-indigo-500" : "bg-gray-100"
                          )}
                        />
                      ))}
                      <span className="text-[10px] font-bold text-gray-300 ml-1">{goal.progress}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  {/* Category */}
                  <div className="flex justify-center">
                    <span className="bg-gray-50 text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {goal.category}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex justify-center items-center gap-2">
                    <div className={cn("h-1.5 w-1.5 rounded-full", goal.status === "Completed" ? "bg-indigo-500" : "bg-gray-200")} />
                    <span className={cn("text-[10px] font-bold", goal.status === "Completed" ? "text-gray-400" : "text-gray-400")}>
                      {goal.status}
                    </span>
                  </div>
                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-orange-50 text-orange-400 hover:bg-orange-100 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
