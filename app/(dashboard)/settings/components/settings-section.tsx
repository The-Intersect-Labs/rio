import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface SettingsSectionProps {
  title: string
  children: ReactNode
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <section>
      <h3 className="mb-3 font-sans text-[18px] font-semibold text-[#131313]">
        {title}
      </h3>
      <Card className="overflow-hidden rounded-3xl border-none bg-[#FCFCFC] shadow-sm">
        <CardContent className="divide-y divide-[#F1F1F1] p-0">{children}</CardContent>
      </Card>
    </section>
  )
}
