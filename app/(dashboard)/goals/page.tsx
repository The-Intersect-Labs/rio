"use client"

import { useMemo, useState } from "react"
import { AlertCircle } from "lucide-react"
import { Header } from "@/components/header"
import { GoalStats } from "./components/goal-stats"
import { GoalList } from "./components/goal-list"
import { AddGoalButton } from "./components/add-goal-button"
import { useDeleteGoal, useGoals } from "@/lib/api/hooks"
import type { Goal } from "@/lib/api/types"

export default function GoalsPage() {
  const { data, isLoading, error } = useGoals()
  const deleteGoal = useDeleteGoal()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const goals = useMemo(() => data?.goals ?? [], [data])

  const stats = useMemo(() => {
    const active = goals.filter((g) => !g.isArchived).length
    const archived = goals.length - active
    const totalHabits = goals.reduce(
      (sum, g) => sum + (g.habitCount ?? g.habits?.length ?? 0),
      0,
    )
    return { total: goals.length, active, archived, totalHabits }
  }, [goals])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteGoal.mutateAsync(id)
    } catch {
      // surfaced by React Query error state; keep UI responsive
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (goal: Goal) => {
    // TODO: open edit modal — the create modal is single-purpose for now
    console.log("edit goal", goal.id)
  }

  return (
    <div className="flex h-full flex-col">
      <Header
        title="Goals"
        subtext="Track and manage your personal goals"
        action={<AddGoalButton />}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 font-sans text-[14px] text-red-600">
              <AlertCircle className="h-4 w-4" />
              Couldn&apos;t load goals: {(error as Error).message}
            </div>
          )}
          <GoalStats data={stats} />
          <GoalList
            goals={goals}
            isLoading={isLoading}
            deletingId={deletingId}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  )
}
