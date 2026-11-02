"use client"

import { useState } from "react"
import {
  Edit2,
  Trash2,
  Flame,
  Clock,
  BookOpen,
  Droplets,
  PersonStanding,
  Dumbbell,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

type GoalStatus = "Completed" | "In Progress"

interface Goal {
  id: number
  title: string
  streak: number
  frequency: string
  time: string
  done: number
  total: number
  category: string
  status: GoalStatus
  icon: LucideIcon
}

const goals: Goal[] = [
  {
    id: 1,
    title: "Read 10 mins",
    streak: 8,
    frequency: "Daily",
    time: "Morning",
    done: 7,
    total: 7,
    category: "Learning",
    status: "Completed",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Drink Water",
    streak: 3,
    frequency: "Daily",
    time: "Morning",
    done: 3,
    total: 7,
    category: "Health",
    status: "In Progress",
    icon: Droplets,
  },
  {
    id: 3,
    title: "Meditation",
    streak: 21,
    frequency: "Daily",
    time: "Morning",
    done: 7,
    total: 7,
    category: "Wellness",
    status: "Completed",
    icon: PersonStanding,
  },
  {
    id: 4,
    title: "Read 10 mins",
    streak: 8,
    frequency: "Daily",
    time: "Morning",
    done: 7,
    total: 7,
    category: "Learning",
    status: "Completed",
    icon: BookOpen,
  },
  {
    id: 5,
    title: "Hit the Gym",
    streak: 9,
    frequency: "Daily",
    time: "Morning",
    done: 5,
    total: 7,
    category: "Fitness",
    status: "In Progress",
    icon: Dumbbell,
  },
]

const filters = ["All", "Active", "Completed"] as const
type Filter = (typeof filters)[number]

export function GoalList() {
  const [filter, setFilter] = useState<Filter>("All")

  const visible = goals.filter((goal) => {
    if (filter === "Active") return goal.status === "In Progress"
    if (filter === "Completed") return goal.status === "Completed"
    return true
  })

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {filters.map((item) => {
            const isActive = filter === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={cn(
                  "h-9 rounded-lg px-4 font-sans text-[14px] font-medium transition-colors",
                  isActive
                    ? "bg-[#7C3AED] text-white shadow-sm"
                    : "bg-white text-[#6B7280] shadow-sm hover:bg-gray-50",
                )}
              >
                {item}
              </button>
            )
          })}
        </div>
        <span className="font-sans text-[14px] text-[#9CA3AF]">
          {visible.length} goals
        </span>
      </div>

      {/* Column headers */}
      <div className="hidden grid-cols-[1fr_120px_130px_96px] items-center gap-4 px-6 font-sans text-[12px] font-medium uppercase tracking-wider text-[#9CA3AF] lg:grid">
        <span>Goal</span>
        <span className="text-center">Category</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      {/* Goal rows */}
      <div className="space-y-4">
        {visible.map((goal) => {
          const Icon = goal.icon
          return (
            <div
              key={goal.id}
              className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-[#EFF1F4] bg-[#FCFCFC] px-6 py-5 shadow-sm transition-shadow hover:shadow-md lg:grid-cols-[1fr_120px_130px_96px]"
            >
              {/* Goal info */}
              <div className="flex items-center gap-5">
                <div className="flex h-[51px] w-[51px] shrink-0 items-center justify-center rounded-full bg-[#C9D8FA]">
                  <Icon className="h-5 w-5 text-[#2563EB]" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h4 className="font-sans text-[17px] font-semibold text-[#131313]">
                      {goal.title}
                    </h4>
                    <span className="flex items-center gap-1 rounded-md bg-[#DECEFB] px-1.5 py-0.5 font-sans text-[11px] font-medium text-[#7C3AED]">
                      <Flame className="h-3 w-3 fill-[#7C3AED]" />
                      {goal.streak}
                    </span>
                  </div>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="rounded-md bg-[#C9D8FA] px-2 py-0.5 font-sans text-[11px] font-medium text-[#2563EB]">
                      {goal.frequency}
                    </span>
                    <span className="flex items-center gap-1 font-sans text-[11px] text-[#C9D0DD]">
                      <Clock className="h-3 w-3" />
                      {goal.time}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5">
                    {Array.from({ length: goal.total }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-[7px] w-[17px] rounded-full",
                          i < goal.done ? "bg-[#7C3AED]" : "bg-[#F1F1F1]",
                        )}
                      />
                    ))}
                    <span className="ml-1 font-sans text-[11px] text-[#C9D0DD]">
                      {goal.done}/{goal.total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="flex lg:justify-center">
                <span className="rounded-lg bg-[#F5F5F5] px-4 py-1.5 font-sans text-[13px] text-[#9CA3AF]">
                  {goal.category}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-[11px] w-[11px] shrink-0 rounded-full",
                    goal.status === "Completed"
                      ? "bg-[#7C3AED]"
                      : "bg-[#E5E7EB]",
                  )}
                />
                <span className="font-sans text-[13px] text-[#9CA3AF]">
                  {goal.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 lg:justify-end">
                <button
                  type="button"
                  aria-label="Edit goal"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9D8FA] text-[#2563EB] transition-colors hover:bg-[#B4CBF7]"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Delete goal"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFDACD] text-[#FF6B35] transition-colors hover:bg-[#FFC9B6]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
