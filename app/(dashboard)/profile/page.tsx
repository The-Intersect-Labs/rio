import Image from "next/image"
import {
  Activity,
  Star,
  Dumbbell,
  Brain,
  BarChart3,
  Target,
  Flame,
  TrendingUp,
  Pencil,
  Bell,
  CalendarDays,
  MessageCircle,
  Lightbulb,
  ChevronRight,
  Droplet,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Primitives                                                        */
/* ------------------------------------------------------------------ */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-[18px] font-semibold text-[#131313]">
      {children}
    </h2>
  )
}

function IconChip({
  icon: Icon,
  color,
  size = 30,
}: {
  icon: React.ElementType
  color: string
  size?: number
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-lg text-white"
      style={{ backgroundColor: color, width: size, height: size }}
    >
      <Icon style={{ width: size * 0.47, height: size * 0.47 }} />
    </div>
  )
}

function Badge({
  children,
  bg,
  color,
}: {
  children: React.ReactNode
  bg: string
  color: string
}) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[12px] font-semibold"
      style={{ backgroundColor: bg, color }}
    >
      {children}
    </span>
  )
}

function InfoRow({
  icon,
  iconColor,
  label,
  value,
  badge,
}: {
  icon: React.ElementType
  iconColor: string
  label: string
  value: string
  badge?: { bg: string; color: string }
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <div className="flex items-center gap-3">
        <IconChip icon={icon} color={iconColor} />
        <span className="font-sans text-[14px] font-medium text-[#131313]">
          {label}
        </span>
      </div>
      {badge ? (
        <Badge bg={badge.bg} color={badge.color}>
          {value}
        </Badge>
      ) : (
        <span className="font-sans text-[14px] font-semibold text-[#131313]">
          {value}
        </span>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const snapshot = [
  { icon: Activity, iconColor: "#2563EB", label: "Active Habits", value: "4" },
  {
    icon: Star,
    iconColor: "#F59E0B",
    label: "Keystone Habit",
    value: "Read 20 mins",
    badge: { bg: "#FEF3C7", color: "#B45309" },
  },
  {
    icon: Dumbbell,
    iconColor: "#28A745",
    label: "Strongest Pillar",
    value: "Body",
    badge: { bg: "#C9E9D1", color: "#1B7A3E" },
  },
  {
    icon: Brain,
    iconColor: "#FF6B35",
    label: "Weakest Pillar",
    value: "Mind",
    badge: { bg: "#FEE2E2", color: "#DC2626" },
  },
  {
    icon: BarChart3,
    iconColor: "#7C3AED",
    label: "Weekly Consistency",
    value: "90%",
    badge: { bg: "#C9E9D1", color: "#1B7A3E" },
  },
]

const scorecards = [
  { icon: Target, color: "#E20004", label: "Hit the Gym", pct: 100, total: 5 },
  { icon: Activity, color: "#28A745", label: "Read 20 mins", pct: 86, total: 21 },
  { icon: Droplet, color: "#2563EB", label: "Drink Water", pct: 86, total: 12 },
  { icon: Flame, color: "#7C3AED", label: "Meditation", pct: 86, total: 6 },
]

const analytics = [
  {
    icon: Activity,
    iconColor: "#7C3AED",
    label: "Peak Productive Time",
    value: "Afternoon",
    badge: { bg: "#F1F1F1", color: "#4B5563" },
  },
  { icon: BarChart3, iconColor: "#2563EB", label: "Avg Completion Rate", value: "90%" },
  { icon: Flame, iconColor: "#FF6B35", label: "Streak Average", value: "10 days" },
  {
    icon: Target,
    iconColor: "#28A745",
    label: "Risk Score",
    value: "Low",
    badge: { bg: "#C9E9D1", color: "#1B7A3E" },
  },
]

const preferences = [
  { icon: Bell, iconColor: "#2563EB", label: "Notification Time", value: "8:00 AM" },
  { icon: CalendarDays, iconColor: "#7C3AED", label: "Weekly Review Day", value: "Sunday" },
  { icon: MessageCircle, iconColor: "#28A745", label: "Reminder Style", value: "Gentle" },
  { icon: Lightbulb, iconColor: "#F59E0B", label: "Insight Tone", value: "Encouraging" },
]

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function ProfilePage() {
  return (
    <div className="min-h-full space-y-6 bg-[#E6F6F7] p-6 lg:p-8">
      {/* Page title */}
      <h1 className="font-heading text-[24px] font-bold text-[#131313]">
        Profile
      </h1>

      {/* Profile header card — top accent bar */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="h-[3px] w-full bg-[#2563EB]" />
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full ring-4 ring-[#E6F6F7]">
              <Image
                src="/assets/signup.png"
                alt="Ireti Ogunmola"
                width={72}
                height={72}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-heading text-[20px] font-semibold text-[#131313]">
                Ireti Ogunmola
              </h2>
              <p className="font-sans text-[13px] italic text-[#6B7280]">
                &ldquo;I am building systems that last.&rdquo;
              </p>
              <div className="flex flex-wrap gap-2 pt-0.5">
                <span className="flex items-center gap-1.5 rounded-full bg-[#C9D8FA] px-3 py-1 font-sans text-[12px] font-medium text-[#2563EB]">
                  <Activity className="h-3.5 w-3.5" />
                  Discipline &amp; Focus
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-[#F1F1F1] px-3 py-1 font-sans text-[12px] font-medium text-[#6B7280]">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Joined Mar 21, 2026
                </span>
              </div>
            </div>
          </div>

          <button
            aria-label="Edit profile"
            className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-[#F1F1F1] text-[#4B5563] transition-colors hover:bg-[#E5E7EB]"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Sections grid — responsive desktop layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {/* Behavioral Snapshot */}
        <div className="space-y-3">
          <SectionHeading>Behavioral Snapshot</SectionHeading>
          <div className="space-y-1 rounded-3xl bg-[#FCFCFC] p-5 shadow-sm">
            {snapshot.map((row) => (
              <InfoRow key={row.label} {...row} />
            ))}
          </div>
        </div>

        {/* Scorecard History */}
        <div className="space-y-3">
          <SectionHeading>Scorecard History</SectionHeading>
          <div className="space-y-5 rounded-3xl bg-[#FCFCFC] p-5 shadow-sm">
            {scorecards.map((item) => {
              const filled = Math.round((item.pct / 100) * 7)
              return (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <IconChip icon={item.icon} color={item.color} size={32} />
                      <span className="font-sans text-[14px] font-medium text-[#131313]">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans text-[14px] font-semibold text-[#1B7A3E]">
                        {item.pct}%
                      </span>
                      <TrendingUp className="h-4 w-4 text-[#22C55E]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-1 gap-1">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <span
                          key={i}
                          className="h-1.5 flex-1 rounded-full"
                          style={{
                            backgroundColor:
                              i < filled ? item.color : "#E5E7EB",
                          }}
                        />
                      ))}
                    </div>
                    <span className="font-sans text-[12px] text-[#9CA3AF]">
                      {filled}/7
                    </span>
                    <span className="font-sans text-[12px] text-[#9CA3AF]">
                      {item.total} total
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Analytics + Preferences */}
        <div className="space-y-6">
          <div className="space-y-3">
            <SectionHeading>Analytics</SectionHeading>
            <div className="space-y-1 rounded-3xl bg-[#FCFCFC] p-5 shadow-sm">
              {analytics.map((row) => (
                <InfoRow key={row.label} {...row} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <SectionHeading>Preferences</SectionHeading>
            <div className="space-y-1 rounded-3xl bg-[#FCFCFC] p-3 shadow-sm">
              {preferences.map((item) => (
                <button
                  key={item.label}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl px-2.5 py-3 text-left transition-colors hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <IconChip icon={item.icon} color={item.iconColor} />
                    <span className="font-sans text-[14px] font-medium text-[#131313]">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-sans text-[14px] font-semibold text-[#131313]">
                      {item.value}
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#9CA3AF]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
