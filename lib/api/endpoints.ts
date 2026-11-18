// ─────────────────────────────────────────────────────────────────────────────
// RIO API — endpoint functions (thin, typed wrappers over the HTTP client)
// Paths are relative to API_BASE_URL which already includes the /v1 prefix.
// ─────────────────────────────────────────────────────────────────────────────
import { api } from './client'
import type {
  AnalyticsOverview,
  BehavioralSnapshot,
  CheckinsListResponse,
  CreateCheckinInput,
  CreateCheckinResponse,
  CreateGoalInput,
  CreateHabitInput,
  CreateTaskInput,
  Dashboard,
  Goal,
  GoalsListResponse,
  Habit,
  HabitsListResponse,
  Insight,
  InsightsListResponse,
  SyncedUser,
  Task,
  TasksListResponse,
  UpdateGoalInput,
  UpdateHabitInput,
  UpdateProfileInput,
  UpdateTaskInput,
  UserProfile,
} from './types'

// ── Auth ─────────────────────────────────────────────────────────────────────
// POST /auth/sync — call immediately after Firebase login. Registers/updates the
// user row server-side. Public route (no bearer required).
export const authApi = {
  sync: (token: string) =>
    api.post<SyncedUser>('/auth/sync', { token }, { anonymous: true }),
}

// ── Users ────────────────────────────────────────────────────────────────────
export const usersApi = {
  me: () => api.get<UserProfile>('/users/me'),
  updateProfile: (input: UpdateProfileInput) =>
    api.patch<UserProfile>('/users/me/profile', input),
  behavioralSnapshot: () =>
    api.get<BehavioralSnapshot>('/users/me/behavioral-snapshot'),
  deleteAccount: () => api.del<null>('/users/me'),
}

// ── Goals ────────────────────────────────────────────────────────────────────
export const goalsApi = {
  list: (params?: { limit?: number; offset?: number; includeArchived?: boolean }) =>
    api.get<GoalsListResponse>('/goals' + toQuery(params)),
  get: (goalId: string) => api.get<Goal>(`/goals/${goalId}`),
  create: (input: CreateGoalInput) => api.post<Goal>('/goals', input),
  update: (goalId: string, input: UpdateGoalInput) =>
    api.patch<Goal>(`/goals/${goalId}`, input),
  remove: (goalId: string) => api.del<null>(`/goals/${goalId}`),
}

// ── Habits ───────────────────────────────────────────────────────────────────
export const habitsApi = {
  list: (params?: {
    limit?: number
    offset?: number
    goalId?: string
    pillar?: string
    includeArchived?: boolean
  }) => api.get<HabitsListResponse>('/habits' + toQuery(params)),
  get: (habitId: string) => api.get<Habit>(`/habits/${habitId}`),
  create: (input: CreateHabitInput) => api.post<Habit>('/habits', input),
  update: (habitId: string, input: UpdateHabitInput) =>
    api.patch<Habit>(`/habits/${habitId}`, input),
  remove: (habitId: string) => api.del<null>(`/habits/${habitId}`),
}

// ── Check-ins ────────────────────────────────────────────────────────────────
export const checkinsApi = {
  history: (habitId: string, params?: { limit?: number; offset?: number; from?: string; to?: string }) =>
    api.get<CheckinsListResponse>(`/habits/${habitId}/checkins` + toQuery(params)),
  create: (habitId: string, input: CreateCheckinInput) =>
    api.post<CreateCheckinResponse>(`/habits/${habitId}/checkins`, input),
}

// ── Tasks ────────────────────────────────────────────────────────────────────
export const tasksApi = {
  list: (params?: {
    limit?: number
    offset?: number
    priority?: string
    status?: string
    goalId?: string
    includeArchived?: boolean
  }) => api.get<TasksListResponse>('/tasks' + toQuery(params)),
  get: (taskId: string) => api.get<Task>(`/tasks/${taskId}`),
  create: (input: CreateTaskInput) => api.post<Task>('/tasks', input),
  update: (taskId: string, input: UpdateTaskInput) =>
    api.patch<Task>(`/tasks/${taskId}`, input),
  remove: (taskId: string) => api.del<null>(`/tasks/${taskId}`),
  reorder: (orderedIds: { id: string; position: number }[]) =>
    api.patch<{ updated: number }>('/tasks/reorder', { orderedIds }),
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export const dashboardApi = {
  get: () => api.get<Dashboard>('/dashboard'),
}

// ── Insights ─────────────────────────────────────────────────────────────────
export const insightsApi = {
  daily: () => api.get<Insight | null>('/insights/daily'),
  history: (params?: { limit?: number; offset?: number }) =>
    api.get<InsightsListResponse>('/insights/history' + toQuery(params)),
  markRead: (insightId: string) =>
    api.patch<Insight>(`/insights/${insightId}/read`),
}

// ── Analytics ────────────────────────────────────────────────────────────────
export const analyticsApi = {
  overview: (days: 7 | 14 | 30 | 90 = 30) =>
    api.get<AnalyticsOverview>(`/analytics/overview?days=${days}`),
  goal: (goalId: string, days = 30) =>
    api.get<unknown>(`/analytics/goals/${goalId}?days=${days}`),
  habitTrend: (habitId: string, from: string, to: string) =>
    api.get<{
      habitId: string
      title: string
      pillar: string | null
      currentStreak: number
      longestStreak: number
      trend: { date: string; status: string }[]
    }>(`/analytics/habits/${habitId}/trend?from=${from}&to=${to}`),
  taskSummary: (days = 30) =>
    api.get<{ period: { days: number }; summary: unknown[] }>(
      `/analytics/tasks/summary?days=${days}`,
    ),
  weeklyReview: () => api.get<unknown>('/analytics/weekly-review'),
  weeklyReviewHistory: () => api.get<unknown[]>('/analytics/weekly-review/history'),
}

// ── Sessions ─────────────────────────────────────────────────────────────────
export const sessionsApi = {
  heartbeat: (tabId: string) =>
    api.post<{ alive: boolean; nextHeartbeatMs: number }>(
      '/sessions/heartbeat',
      undefined,
      { headers: { 'X-Tab-ID': tabId } },
    ),
  logout: () => api.del<null>('/sessions'),
}

// ── Notifications (web push) ─────────────────────────────────────────────────
export const notificationsApi = {
  status: () => api.get<{ isSubscribed: boolean; subscriptionId: string | null }>(
    '/notifications/web-push/status',
  ),
  subscribe: (subscription: PushSubscriptionJSON) =>
    api.post<{ subscriptionId: string; isSubscribed: boolean }>(
      '/notifications/web-push/subscribe',
      { subscription },
    ),
  unsubscribe: (endpoint?: string) =>
    api.del<null>(
      '/notifications/web-push/subscribe' + (endpoint ? `?endpoint=${encodeURIComponent(endpoint)}` : ''),
    ),
}

// ── helpers ──────────────────────────────────────────────────────────────────
function toQuery(params?: Record<string, unknown>): string {
  if (!params) return ''
  const search = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') search.set(k, String(v))
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}
