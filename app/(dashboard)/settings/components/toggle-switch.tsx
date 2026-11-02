"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ToggleSwitchProps {
  defaultChecked?: boolean
  label?: string
}

export function ToggleSwitch({ defaultChecked = false, label }: ToggleSwitchProps) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => setChecked((v) => !v)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-[#2563EB]" : "bg-[#C9D0DD]",
      )}
    >
      <span
        className={cn(
          "inline-block transform rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[23px]" : "translate-x-[3px]",
        )}
        style={{ height: 18, width: 18 }}
      />
    </button>
  )
}
