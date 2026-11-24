'use client'

// ─────────────────────────────────────────────────────────────────────────────
// React Query hooks for every RIO API resource.
// Mutations invalidate the relevant queries so the UI stays in sync.
// ─────────────────────────────────────────────────────────────────────────────
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query'
import { qk } from './query-keys'
import {
  analyticsApi,
  checkinsApi,
  dashboardApi,
  goalsApi,
  habitsApi,
  insightsApi,
  notificationsApi,
  scorecardApi,
  tasksApi,
  usersApi,
} from './endpoints'
import type {
  ConvertScorecardInput,
  CreateCheckinInput,
  CreateGoalInput,
  CreateHabitInput,
  CreateScorecardEntryInput,
  CreateTaskInput,
  UpdateGoalInput,
  UpdateHabitInput,
  UpdateProfileInput,
  UpdateScorecardEntryInput,
  UpdateTaskInput,
} from './types'

// ── Users ────────────────────────────────────────────────────────────────────
export function useMe(enabled = true) {
  return useQuery({ queryKey: qk.me, queryFn: usersApi.me, enabled })
}

export function useBehavioralSnapshot() {
  return useQuery({ queryKey: qk.behavioralSnapshot, queryFn: usersApi.behavioralSnapshot })
}

export function useUpdateProfile() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: UpdateProfileInput) => usersApi.updateProfile(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.me })
      qc.invalidateQueries({ queryKey: qk.dashboard })
    },
  })
}

// ── Scorecard (Awareness) ────────────────────────────────────────────────────
export function useScorecard() {
  return useQuery({ queryKey: qk.scorecard, queryFn: scorecardApi.list })
}

export function useCreateScorecardEntry() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateScorecardEntryInput) => scorecardApi.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.scorecard }),
  })
}

export function useUpdateScorecardEntry() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ entryId, input }: { entryId: string; input: UpdateScorecardEntryInput }) =>
      scorecardApi.update(entryId, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.scorecard }),
  })
}

export function useDeleteScorecardEntry() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (entryId: string) => scorecardApi.remove(entryId),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.scorecard }),
  })
}

export function useConvertScorecardEntry() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ entryId, input }: { entryId: string; input: ConvertScorecardInput }) =>
      scorecardApi.convert(entryId, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.scorecard })
      qc.invalidateQueries({ queryKey: ['habits'] })
      qc.invalidateQueries({ queryKey: qk.dashboard })
    },
  })
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export function useDashboard(
  options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof dashboardApi.get>>>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: qk.dashboard,
    queryFn: dashboardApi.get,
    staleTime: 30_000,
    ...options,
  })
}

// ── Goals ────────────────────────────────────────────────────────────────────
export function useGoals(params?: { limit?: number; offset?: number; includeArchived?: boolean }) {
  return useQuery({ queryKey: qk.goals(params), queryFn: () => goalsApi.list(params) })
}

export function useGoal(goalId: string) {
  return useQuery({
    queryKey: qk.goal(goalId),
    queryFn: () => goalsApi.get(goalId),
    enabled: !!goalId,
  })
}

export function useCreateGoal() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateGoalInput) => goalsApi.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['goals'] })
      qc.invalidateQueries({ queryKey: qk.dashboard })
    },
  })
}

export function useUpdateGoal(goalId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: UpdateGoalInput) => goalsApi.update(goalId, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['goals'] })
    },
  })
}

export function useDeleteGoal() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (goalId: string) => goalsApi.remove(goalId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['goals'] })
      qc.invalidateQueries({ queryKey: qk.dashboard })
    },
  })
}

// ── Habits ───────────────────────────────────────────────────────────────────
export function useHabits(params?: {
  limit?: number
  offset?: number
  goalId?: string
  pillar?: string
  includeArchived?: boolean
}) {
  return useQuery({ queryKey: qk.habits(params), queryFn: () => habitsApi.list(params) })
}

export function useHabit(habitId: string) {
  return useQuery({
    queryKey: qk.habit(habitId),
    queryFn: () => habitsApi.get(habitId),
    enabled: !!habitId,
  })
}

export function useCreateHabit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateHabitInput) => habitsApi.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['habits'] })
      qc.invalidateQueries({ queryKey: qk.dashboard })
    },
  })
}

export function useUpdateHabit(habitId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: UpdateHabitInput) => habitsApi.update(habitId, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['habits'] })
      qc.invalidateQueries({ queryKey: qk.dashboard })
    },
  })
}

export function useDeleteHabit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (habitId: string) => habitsApi.remove(habitId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['habits'] })
      qc.invalidateQueries({ queryKey: qk.dashboard })
    },
  })
}

// ── Check-ins ────────────────────────────────────────────────────────────────
export function useCheckins(
  habitId: string,
  params?: { limit?: number; offset?: number; from?: string; to?: string },
) {
  return useQuery({
    queryKey: qk.checkins(habitId, params),
    queryFn: () => checkinsApi.history(habitId, params),
    enabled: !!habitId,
  })
}

export function useCreateCheckin(habitId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateCheckinInput) => checkinsApi.create(habitId, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.dashboard })
      qc.invalidateQueries({ queryKey: ['habits'] })
      qc.invalidateQueries({ queryKey: ['checkins', habitId] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

// ── Tasks ────────────────────────────────────────────────────────────────────
export function useTasks(params?: {
  limit?: number
  offset?: number
  priority?: string
  status?: string
  goalId?: string
  includeArchived?: boolean
}) {
  return useQuery({ queryKey: qk.tasks(params), queryFn: () => tasksApi.list(params) })
}

export function useCreateTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateTaskInput) => tasksApi.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  })
}

export function useUpdateTask(taskId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: UpdateTaskInput) => tasksApi.update(taskId, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useDeleteTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (taskId: string) => tasksApi.remove(taskId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  })
}

// ── Insights ─────────────────────────────────────────────────────────────────
export function useDailyInsight() {
  return useQuery({ queryKey: qk.insightsDaily, queryFn: insightsApi.daily })
}

export function useInsightsHistory(params?: { limit?: number; offset?: number }) {
  return useQuery({
    queryKey: qk.insightsHistory(params),
    queryFn: () => insightsApi.history(params),
  })
}

export function useMarkInsightRead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (insightId: string) => insightsApi.markRead(insightId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['insights'] })
      qc.invalidateQueries({ queryKey: qk.dashboard })
    },
  })
}

// ── Analytics ────────────────────────────────────────────────────────────────
export function useAnalyticsOverview(days: 7 | 14 | 30 | 90 = 30) {
  return useQuery({
    queryKey: qk.analyticsOverview(days),
    queryFn: () => analyticsApi.overview(days),
  })
}

export function useWeeklyReview() {
  return useQuery({ queryKey: qk.weeklyReview, queryFn: analyticsApi.weeklyReview })
}

// ── Notifications ────────────────────────────────────────────────────────────
export function useNotificationStatus() {
  return useQuery({
    queryKey: qk.notificationStatus,
    queryFn: notificationsApi.status,
  })
}
