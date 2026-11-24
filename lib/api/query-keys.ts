// Centralised React Query keys — keeps cache invalidation consistent.
export const qk = {
  me: ['users', 'me'] as const,
  behavioralSnapshot: ['users', 'behavioral-snapshot'] as const,
  dashboard: ['dashboard'] as const,
  goals: (params?: Record<string, unknown>) => ['goals', params ?? {}] as const,
  goal: (id: string) => ['goals', id] as const,
  habits: (params?: Record<string, unknown>) => ['habits', params ?? {}] as const,
  habit: (id: string) => ['habits', id] as const,
  checkins: (habitId: string, params?: Record<string, unknown>) =>
    ['checkins', habitId, params ?? {}] as const,
  tasks: (params?: Record<string, unknown>) => ['tasks', params ?? {}] as const,
  insightsDaily: ['insights', 'daily'] as const,
  insightsHistory: (params?: Record<string, unknown>) =>
    ['insights', 'history', params ?? {}] as const,
  analyticsOverview: (days: number) => ['analytics', 'overview', days] as const,
  weeklyReview: ['analytics', 'weekly-review'] as const,
  scorecard: ['scorecard'] as const,
  notificationStatus: ['notifications', 'status'] as const,
}
