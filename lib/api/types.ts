// ─────────────────────────────────────────────────────────────────────────────
// RIO API — shared types
// Mirrors the NestJS DTOs / service `format()` output + Prisma enums.
// Source of truth: rio-api → apps/api/src (services define the real shape).
// ─────────────────────────────────────────────────────────────────────────────

// ── Enums (Prisma) ───────────────────────────────────────────────────────────
export type AuthProvider = 'firebase' | 'auth0'
export type GoalType = 'short_term' | 'long_term'
export type FrequencyType = 'daily' | 'weekly' | 'custom'
export type CheckinStatus = 'completed' | 'missed' | 'skipped'
export type PriorityType =
  | 'critical'
  | 'essential'
  | 'important'
  | 'nice_to_have'
  | 'someday'
export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'cancelled'
export type TriggerType =
  | 'streak_risk'
  | 'streak_recovery'
  | 'completion_dropoff'
  | 'momentum'
  | 'weekly_reflection'
  | 'educational'
  | 'fallback'
export type PillarType =
  | 'health'
  | 'learning'
  | 'wealth'
  | 'emotional_spiritual'
  | 'relationships'
export type ScorecardClassification = 'reinforcing' | 'neutral' | 'conflicting'

// ── Response envelope ────────────────────────────────────────────────────────
// Success: { success: true, message, data }
// Error:   { success: false, message, statusCode, timestamp, path }
export interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T | null
}

export interface ApiErrorBody {
  success: false
  message: string | string[]
  statusCode: number
  timestamp: string
  path: string
}

export interface PaginationMeta {
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

// NOTE: list endpoints return a *named* array (habits/goals/tasks/checkins/
// insights), not a generic `items` field. We type each explicitly below.

// ── Auth / Users ─────────────────────────────────────────────────────────────
export interface SyncedUser {
  id: string
  email: string
  authProvider: AuthProvider
  timezone: string
  isVerified: boolean
  onboardingCompleted: boolean
  createdAt: string
}

export interface UserPreferences {
  notificationsEnabled?: boolean
  theme?: 'light' | 'dark'
  weekStartsOn?: 0 | 1
  notificationTime?: string
  weeklyReviewDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  insightTonePreference?: 'motivational' | 'analytical'
}

export interface UserProfile {
  id: string
  email: string
  authProvider: AuthProvider
  timezone: string
  isVerified: boolean
  fullName: string | null
  avatarUrl: string | null
  bio: string | null
  identityStatement: string | null
  growthIntention: string | null
  selectedPillars: PillarType[]
  onboardingCompleted: boolean
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}

export interface BehavioralSnapshot {
  activeHabits: number
  keystoneHabit: { id: string; title: string } | null
  strongestPillar: PillarType | null
  weakestPillar: PillarType | null
  weeklyConsistencyAverage: number | null
  streakAverage: number
  riskScore: number
}

export interface UpdateProfileInput {
  fullName?: string
  avatarUrl?: string
  bio?: string
  onboardingCompleted?: boolean
  timezone?: string
  identityStatement?: string
  growthIntention?: string
  selectedPillars?: PillarType[]
  preferences?: UserPreferences
}

// ── Goals ────────────────────────────────────────────────────────────────────
export interface Goal {
  id: string
  title: string
  description: string | null
  type: GoalType
  startDate: string | null
  endDate: string | null
  isArchived: boolean
  habitCount?: number
  habits?: Habit[]
  createdAt: string
  updatedAt: string
}

export interface GoalsListResponse {
  goals: Goal[]
  pagination: PaginationMeta
}

export interface CreateGoalInput {
  title: string
  description?: string
  type?: GoalType
  startDate?: string
  endDate?: string
}
export type UpdateGoalInput = Partial<CreateGoalInput> & { isArchived?: boolean }

// ── Habits ───────────────────────────────────────────────────────────────────
export interface StreakSummary {
  currentStreak: number
  longestStreak: number
  lastCheckinDate: string | null
  weeklyRecoveryUsed: boolean
}

export interface Habit {
  id: string
  goalId: string
  title: string
  pillar: PillarType | null
  isKeystone: boolean
  frequency: FrequencyType
  frequencyDetails: Record<string, unknown>
  scheduledTime: string | null // "HH:MM"
  habitStackTrigger: string | null
  estimatedDuration: number | null
  isArchived: boolean
  streak: StreakSummary | null
  createdAt: string
  updatedAt: string
}

export interface HabitsListResponse {
  habits: Habit[]
  pagination: PaginationMeta
}

export interface CreateHabitInput {
  goalId: string
  title: string
  pillar?: PillarType
  isKeystone?: boolean
  frequency?: FrequencyType
  frequencyDetails?: Record<string, unknown>
  scheduledTime?: string
  habitStackTrigger?: string
  estimatedDuration?: number
}
export type UpdateHabitInput = Partial<CreateHabitInput> & { isArchived?: boolean }

// ── Check-ins ────────────────────────────────────────────────────────────────
export interface Checkin {
  id: string
  habitId: string
  status: CheckinStatus
  logDate: string
  note: string | null
  createdAt: string
}

export interface CreateCheckinResponse extends Checkin {
  streak: { currentStreak: number; longestStreak: number } | null
}

export interface CheckinsListResponse {
  checkins: Checkin[]
  pagination: PaginationMeta
}

export interface CreateCheckinInput {
  logDate: string // ISO date "2026-03-11"
  status: CheckinStatus
  note?: string
}

// ── Tasks ────────────────────────────────────────────────────────────────────
export interface Task {
  id: string
  title: string
  description: string | null
  priority: PriorityType
  position: number
  status: TaskStatus
  goalId: string | null
  dueDate: string | null
  completedAt: string | null
  isArchived: boolean
  createdAt: string
  updatedAt: string
}

export interface TasksListResponse {
  tasks: Task[]
  pagination: PaginationMeta
}

export interface CreateTaskInput {
  title: string
  description?: string
  priority?: PriorityType
  goalId?: string
  dueDate?: string
}
export type UpdateTaskInput = Partial<CreateTaskInput> & {
  status?: TaskStatus
  isArchived?: boolean
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export interface DashboardTodayHabit {
  id: string
  title: string
  pillar: PillarType | null
  isKeystone: boolean
  frequency: FrequencyType
  scheduledTime: string | null
  currentStreak: number
  longestStreak: number
  weeklyRecoveryUsed: boolean
  todayCheckin: Checkin | null
}

export interface PillarBalanceEntry {
  pillar: string
  habitCount: number
  completedThisWeek: number
  rate: number
}

export interface DashboardInsight {
  id: string
  triggerType: TriggerType
  headline: string
  message: string
  cta: string
  generatedAt: string
}

export interface Dashboard {
  date: string
  identity: {
    statement: string | null
    firstName: string | null
    selectedPillars: PillarType[]
  }
  metrics: {
    totalHabits: number
    completedToday: number
    completionRate: number
    activeStreaks: number
    longestStreak: number
    weeklyConsistencyScore: number
  }
  keystoneHabit: {
    id: string
    title: string
    currentStreak: number
    todayCheckin: Checkin | null
  } | null
  pillarBalance: { breakdown: PillarBalanceEntry[]; imbalanceWarning: string[] }
  twoDayRisk: { count: number; habits: { id: string; title: string }[] }
  todayHabits: DashboardTodayHabit[]
  insight: DashboardInsight | null
}

// ── Insights ─────────────────────────────────────────────────────────────────
export interface Insight {
  id: string
  triggerType: TriggerType
  headline: string
  message: string
  cta: string
  isRead: boolean
  generatedAt: string
}

export interface InsightsListResponse {
  insights: Insight[]
  pagination: PaginationMeta
}

// ── Analytics ────────────────────────────────────────────────────────────────
export interface AnalyticsOverview {
  period: { days: number; since: string }
  habits: {
    total: number
    completionRate: number
    checkinsLogged: number
    avgStreak: number
  }
  tasks: { total: number; completed: number; completionRate: number }
  pillarBreakdown: { pillar: string; completionRate: number }[]
  topHabits: {
    id: string
    title: string
    pillar: PillarType | null
    currentStreak: number
    longestStreak: number
  }[]
}

export interface WeeklyReview {
  id: string
  userId: string
  weekLabel: string
  consistencyScore: number
  bestPillar: PillarType | null
  weakestPillar: PillarType | null
  reflectionPrompt: string | null
  pillarBreakdown: { pillar: string; total: number; completed: number; rate: number }[]
  createdAt: string
}

// ── Scorecard (Awareness screen before goal creation) ────────────────────────
// (ScorecardClassification enum lives with the other Prisma enums above.)
export interface ScorecardEntry {
  id: string
  userId: string
  behavior: string
  classification: ScorecardClassification
  /** Set once the entry is promoted to a tracked habit. */
  convertedHabitId: string | null
  convertedHabit?: { id: string; title: string } | null
  createdAt: string
  updatedAt: string
}

export interface ScorecardSummary {
  total: number
  reinforcing: number
  neutral: number
  conflicting: number
  identitySignal: string | null
}

export interface ScorecardResponse {
  entries: ScorecardEntry[]
  summary: ScorecardSummary
}

export interface CreateScorecardEntryInput {
  behavior: string
  classification: ScorecardClassification
}

export interface UpdateScorecardEntryInput {
  classification: ScorecardClassification
}

export interface ConvertScorecardInput {
  goalId: string
  title?: string
}
