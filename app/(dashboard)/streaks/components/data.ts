import {
  BookOpen,
  Brain,
  Droplet,
  Dumbbell,
  type LucideIcon,
} from "lucide-react"

export type BadgeTone = "new" | "active"

export interface HabitBadge {
  label: string
  tone: BadgeTone
}

export interface Habit {
  id: string
  name: string
  icon: LucideIcon
  badge: HabitBadge
  last: string
  days: number
  /** Mo .. Su — true = completed */
  week: boolean[]
  /** current completed count toward the next milestone */
  milestoneCurrent: number
  /** milestone goal in days */
  milestoneTarget: number
  best: number
}

export interface HabitGroup {
  category: string
  habits: Habit[]
}

export interface SummaryStat {
  label: string
  value: number
}

export const summaryStats: SummaryStat[] = [
  { label: "Completed streak", value: 0 },
  { label: "Pending", value: 4 },
  { label: "Graced", value: 0 },
]

export const habitGroups: HabitGroup[] = [
  {
    category: "Lose Weight",
    habits: [
      {
        id: "hit-the-gym",
        name: "Hit the Gym",
        icon: Dumbbell,
        badge: { label: "New", tone: "new" },
        last: "Never",
        days: 0,
        week: [false, false, false, false, false, false, false],
        milestoneCurrent: 0,
        milestoneTarget: 5,
        best: 0,
      },
      {
        id: "drink-water",
        name: "Drink Water",
        icon: Droplet,
        badge: { label: "Active", tone: "active" },
        last: "Never",
        days: 5,
        week: [true, true, true, true, true, false, false],
        milestoneCurrent: 5,
        milestoneTarget: 7,
        best: 5,
      },
    ],
  },
  {
    category: "Study",
    habits: [
      {
        id: "read-10-mins",
        name: "Read 10 mins",
        icon: BookOpen,
        badge: { label: "Active", tone: "active" },
        last: "Today",
        days: 2,
        week: [true, true, true, true, false, false, false],
        milestoneCurrent: 2,
        milestoneTarget: 5,
        best: 4,
      },
      {
        id: "meditation",
        name: "Meditation",
        icon: Brain,
        badge: { label: "Active", tone: "active" },
        last: "Today",
        days: 2,
        week: [true, true, true, true, false, false, false],
        milestoneCurrent: 2,
        milestoneTarget: 5,
        best: 4,
      },
    ],
  },
]
