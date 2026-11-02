import { Card, CardContent } from "@/components/ui/card"
import {
  Dumbbell,
  BookOpen,
  Brain,
  Droplet,
  Zap,
  Flame,
  AlertTriangle,
  Check,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

type StreakTone = "purple" | "orange"

interface Habit {
  name: string
  category: string
  icon: LucideIcon
  completed?: boolean
  warning?: string
  streak?: { tone: StreakTone; label: string }
}

const habits: Habit[] = [
  {
    name: "Morning Exercise",
    category: "HEALTH",
    icon: Dumbbell,
    completed: true,
    streak: { tone: "purple", label: "8 day streak" },
  },
  {
    name: "Reading",
    category: "MINDSET",
    icon: BookOpen,
    warning: "Missed yesterday",
  },
  {
    name: "Morning Meditation",
    category: "FOCUS",
    icon: Brain,
    streak: { tone: "purple", label: "12 day streak" },
  },
  {
    name: "Hydration (2L)",
    category: "HEALTH",
    icon: Droplet,
    streak: { tone: "orange", label: "4 day streak" },
  },
]

const streakChip = (tone: StreakTone) =>
  tone === "purple"
    ? { bg: "bg-[#DECEFB]", text: "text-[#7C3AED]", Icon: Zap }
    : { bg: "bg-[#FFDACD]", text: "text-[#FF6B35]", Icon: Flame }

export function TodayHabits() {
  return (
    <Card className="rounded-3xl border-none shadow-sm">
      <CardContent className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-heading text-[18px] font-semibold text-[#131313]">
            Today&apos;s Habits
          </h3>
          <span className="font-sans text-[14px] font-medium text-[#6B7280]">
            1/4 completed
          </span>
        </div>

        <div className="space-y-3">
          {habits.map((habit) => {
            const chip = habit.streak ? streakChip(habit.streak.tone) : null
            return (
              <div
                key={habit.name}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border p-4",
                  habit.warning
                    ? "border-[#FFEFC1] bg-[#FFEFC1]"
                    : habit.completed
                      ? "border-[#C9E9D1] bg-[#F1FBF4]"
                      : "border-[#F1F1F1] bg-[#FCFCFC]",
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF1FF] text-[#2563EB]">
                  <habit.icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[16px] font-semibold text-[#131313]">
                    {habit.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded-md bg-[#F1F1F1] px-2 py-0.5 font-sans text-[12px] text-[#6B7280]">
                      {habit.category}
                    </span>
                    {chip && habit.streak && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-sans text-[12px]",
                          chip.bg,
                          chip.text,
                        )}
                      >
                        <chip.Icon className="h-3 w-3" />
                        {habit.streak.label}
                      </span>
                    )}
                    {habit.warning && (
                      <span className="inline-flex items-center gap-1 font-sans text-[12px] text-[#B38705]">
                        <AlertTriangle className="h-3 w-3" />
                        {habit.warning}
                      </span>
                    )}
                  </div>
                </div>

                {habit.completed ? (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#228E3B]">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                ) : habit.warning ? (
                  <AlertTriangle className="h-5 w-5 shrink-0 text-[#B38705]" />
                ) : (
                  <div className="h-6 w-6 shrink-0 rounded-full border-2 border-[#D1D5DB]" />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
