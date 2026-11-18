'use client'

import { useQueries } from '@tanstack/react-query'
import { checkinsApi } from './endpoints'
import { qk } from './query-keys'
import type { Habit } from './types'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export interface DailyActivity {
  day: string
  date: string
  completed: number
}

/**
 * The API only exposes check-ins per habit (`GET /habits/:id/checkins`), so a
 * weekly series has to be stitched client-side. One query per habit, fanned out
 * with `useQueries`, then bucketed by local day.
 */
export function useWeeklyActivity(habits: Habit[] | undefined) {
  const since = new Date()
  since.setDate(since.getDate() - 6)
  const from = since.toISOString().slice(0, 10)

  const queries = useQueries({
    queries: (habits ?? []).map((habit) => ({
      queryKey: qk.checkins(habit.id, { from, limit: 100 }),
      queryFn: () => checkinsApi.history(habit.id, { from, limit: 100 }),
      enabled: !!habit.id,
    })),
  })

  const days: DailyActivity[] = []
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    days.push({ day: DAY_LABELS[d.getDay()], date: key, completed: 0 })
  }

  const byDate = new Map(days.map((d) => [d.date, d]))
  const perHabit: Record<string, boolean[]> = {}
  const habitIds = (habits ?? []).map((h) => h.id)

  queries.forEach((q, index) => {
    const habitId = habitIds[index]
    if (!habitId) return
    const week = days.map(() => false)
    perHabit[habitId] = week
    for (const checkin of q.data?.checkins ?? []) {
      if (checkin.status !== 'completed') continue
      const key = checkin.logDate.slice(0, 10)
      const bucket = byDate.get(key)
      if (bucket) bucket.completed += 1
      const dayIndex = days.findIndex((d) => d.date === key)
      if (dayIndex >= 0) week[dayIndex] = true
    }
  })

  const isLoading = queries.some((q) => q.isLoading)
  const total = days.reduce((sum, d) => sum + d.completed, 0)
  const best = days.reduce(
    (acc, d) => (d.completed > acc.completed ? d : acc),
    days[0],
  )

  return { days, isLoading, total, best }
}
