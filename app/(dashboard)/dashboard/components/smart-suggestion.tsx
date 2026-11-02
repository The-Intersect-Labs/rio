import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

export function SmartSuggestion() {
  return (
    <Card className="rounded-3xl border-none bg-[#EFEAFF] shadow-sm">
      <CardContent className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#7C3AED]" />
          <h3 className="font-heading text-[16px] font-semibold text-[#131313]">
            Smart Habit Suggestion
          </h3>
        </div>
        <p className="font-sans text-[16px] leading-snug text-[#6B7280]">
          Based on your streaks, <span className="font-semibold text-[#131313]">Morning Meditation</span>{" "}
          now has the highest chance to keep your 12-day streak alive.
        </p>
        <Button className="mt-4 w-full gap-2 rounded-xl bg-[#2563EB] py-5 font-sans text-[16px] font-semibold text-[#FCFCFC] hover:bg-[#1D4FD7]">
          Do It Now <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
