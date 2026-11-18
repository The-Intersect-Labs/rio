import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

interface SmartSuggestionProps {
  insight: {
    headline: string
    message: string
    cta: string
  } | null
}

export function SmartSuggestion({ insight }: SmartSuggestionProps) {
  return (
    <Card className="rounded-3xl border-none bg-[#EFEAFF] shadow-sm">
      <CardContent className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#7C3AED]" />
          <h3 className="font-heading text-[16px] font-semibold text-[#131313]">
            {insight?.headline ?? "Smart Habit Suggestion"}
          </h3>
        </div>
        <p className="font-sans text-[16px] leading-snug text-[#6B7280]">
          {insight?.message ??
            "Complete a few habits and RIO will start coaching you with personalised, identity-based suggestions."}
        </p>
        <Link
          href="/habits"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-5 font-sans text-[16px] font-semibold text-[#FCFCFC] transition-colors hover:bg-[#1D4FD7]"
        >
          {insight?.cta ?? "Get Started"} <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )
}
