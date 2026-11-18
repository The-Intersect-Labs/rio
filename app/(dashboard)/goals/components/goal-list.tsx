"use client"

import { useState } from "react"
import {
  Edit2,
  Trash2,
  Flame,
  Clock,
  BookOpen,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Goal } from "@/lib/api/types"

const filters = ["All", "Active", "Archived"] as const
type Filter = (typeof filters)[number]

const iconByType: Record<string, LucideIcon> = {
  short_term: BookOpen,
  long_term: BookOpen,
}

interface GoalListProps {
  goals: Goal[]
  isLoading?: boolean
  deletingId?: string | null
  onDelete: (id: string) => void
  onEdit: (goal: Goal) => void
}

export function GoalList({
  goals,
  isLoading,
  deletingId,
  onDelete,
  onEdit,
}: GoalListProps) {
  const [filter, setFilter] = useState<Filter>("All")

  const visible = goals.filter((goal) => {
    if (filter === "Active") return !goal.isArchived
    if (filter === "Archived") return goal.isArchived
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
        <span className="text-center">Type</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-[#EFF1F4] bg-[#FCFCFC] px-6 py-10 text-center font-sans text-[14px] text-[#9CA3AF]">
          Loading goals…
        </div>
      )}

      {!isLoading && visible.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[#EFF1F4] bg-[#FCFCFC] px-6 py-10 text-center font-sans text-[14px] text-[#9CA3AF]">
          No goals yet. Create one to get started.
        </div>
      )}

      {/* Goal rows */}
      <div className="space-y-4">
        {visible.map((goal) => {
          const Icon = iconByType[goal.type] ?? BookOpen
          const habits = goal.habits ?? []
          const streak = habits.reduce(
            (max, h) => Math.max(max, h.streak?.currentStreak ?? 0),
            0,
          )
          const total = goal.habitCount ?? habits.length
          const deleting = deletingId === goal.id

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
                    {streak > 0 && (
                      <span className="flex items-center gap-1 rounded-md bg-[#DECEFB] px-1.5 py-0.5 font-sans text-[11px] font-medium text-[#7C3AED]">
                        <Flame className="h-3 w-3 fill-[#7C3AED]" />
                        {streak}
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="rounded-md bg-[#C9D8FA] px-2 py-0.5 font-sans text-[11px] font-medium text-[#2563EB]">
                      {total} {total === 1 ? "habit" : "habits"}
                    </span>
                    {goal.endDate && (
                      <span className="flex items-center gap-1 font-sans text-[11px] text-[#C9D0DD]">
                        <Clock className="h-3 w-3" />
                        {new Date(goal.endDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {goal.description && (
                    <p className="mt-2 line-clamp-2 font-sans text-[12px] text-[#9CA3AF]">
                      {goal.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Type */}
              <div className="flex lg:justify-center">
                <span className="rounded-lg bg-[#F5F5F5] px-4 py-1.5 font-sans text-[13px] text-[#9CA3AF]">
                  {goal.type === "long_term" ? "Long term" : "Short term"}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-[11px] w-[11px] shrink-0 rounded-full",
                    goal.isArchived ? "bg-[#7C3AED]" : "bg-[#E5E7EB]",
                  )}
                />
                <span className="font-sans text-[13px] text-[#9CA3AF]">
                  {goal.isArchived ? "Archived" : "Active"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 lg:justify-end">
                <button
                  type="button"
                  aria-label="Edit goal"
                  onClick={() => onEdit(goal)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9D8FA] text-[#2563EB] transition-colors hover:bg-[#B4CBF7]"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Delete goal"
                  disabled={deleting}
                  onClick={() => onDelete(goal.id)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFDACD] text-[#FF6B35] transition-colors hover:bg-[#FFC9B6] disabled:opacity-50"
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
