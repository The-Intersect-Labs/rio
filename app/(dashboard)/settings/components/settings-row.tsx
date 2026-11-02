import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsRowProps {
  icon?: ReactNode
  iconBg?: string
  iconColor?: string
  label: string
  subtext?: string
  value?: string
  trailing?: ReactNode
  danger?: boolean
  onClick?: () => void
}

export function SettingsRow({
  icon,
  iconBg = "bg-[#EBF1FF]",
  iconColor = "text-[#2563EB]",
  label,
  subtext,
  value,
  trailing,
  danger = false,
  onClick,
}: SettingsRowProps) {
  const interactive = Boolean(onClick) || (!trailing && !danger)

  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 px-5 py-4 transition-colors",
        interactive && "cursor-pointer hover:bg-[#F7F7F7]",
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            danger ? "bg-[#FEE2E2] text-[#E20004]" : iconBg,
            !danger && iconColor,
          )}
        >
          {icon}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-sans text-[15px] font-semibold",
            danger ? "text-[#E20004]" : "text-[#131313]",
          )}
        >
          {label}
        </p>
        {subtext && (
          <p className="mt-0.5 font-sans text-[12px] text-[#6B7280]">{subtext}</p>
        )}
      </div>

      {value && (
        <span className="shrink-0 font-sans text-[14px] text-[#6B7280]">{value}</span>
      )}
      {trailing}
      {!trailing && !danger && (
        <ChevronRight className="h-5 w-5 shrink-0 text-[#9CA3AF]" />
      )}
    </div>
  )
}
