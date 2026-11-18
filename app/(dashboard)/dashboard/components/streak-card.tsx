import { Card, CardContent } from "@/components/ui/card"
import { Flame } from "lucide-react"

interface StreakCardProps {
  currentStreak: number
  longestStreak: number
  activeStreaks: number
}

export function StreakCard({ currentStreak, longestStreak, activeStreaks }: StreakCardProps) {
  return (
    <Card className="rounded-3xl border-none bg-[#EFEAFF] shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCFCFC]">
          <Flame className="h-6 w-6 text-[#7C3AED]" />
        </div>
        <div>
          <p className="font-heading text-[18px] font-semibold text-[#131313]">
            {currentStreak} Day Streak
          </p>
          <p className="font-sans text-[14px] font-medium text-[#6B7280]">
            {activeStreaks} active {activeStreaks === 1 ? "habit" : "habits"} · best {longestStreak} days
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
