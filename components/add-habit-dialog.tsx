"use client"

import { useState } from "react"
import {
  Plus,
  X,
  Droplet,
  Dumbbell,
  Eye,
  BookOpen,
  Map,
  Package,
  Code,
  Footprints,
  PersonStanding,
  Coffee,
  Search,
  Moon,
  Calendar,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ICONS: LucideIcon[] = [
  Droplet,
  Dumbbell,
  Eye,
  BookOpen,
  Map,
  Package,
  Code,
  Footprints,
  PersonStanding,
  Coffee,
  Search,
  Moon,
]

const TIMES = ["Morning", "Afternoon", "Evening", "Night"]

export function AddHabitButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-5 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4FD7]"
      >
        <Plus className="h-4 w-4" /> New Habit
      </button>

      {open && <AddHabitSheet onClose={() => setOpen(false)} />}
    </>
  )
}

function AddHabitSheet({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("")
  const [icon, setIcon] = useState(0)
  const [frequency, setFrequency] = useState<"Daily" | "Weekly">("Daily")
  const [time, setTime] = useState("Morning")

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="animate-in fade-in zoom-in-95 max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-[22px] font-semibold text-[#131313]">Add Habit</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F1F1] text-[#6B7280] transition-colors hover:bg-[#E5E7EB]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="font-heading text-[16px] font-semibold text-[#131313]">
          Habit Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Drink 8 glasses of water"
          className="mb-6 mt-2 h-12 w-full rounded-xl border border-[#D1D5DB] bg-white px-4 font-sans text-[16px] text-[#131313] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#2563EB]"
        />

        <label className="font-heading text-[16px] font-semibold text-[#131313]">
          Choose Icon
        </label>
        <div className="mb-6 mt-2 grid grid-cols-6 gap-2">
          {ICONS.map((Icon, i) => (
            <button
              key={i}
              onClick={() => setIcon(i)}
              className={cn(
                "flex aspect-square items-center justify-center rounded-xl border transition-colors",
                icon === i
                  ? "border-[#2563EB] bg-[#2563EB] text-white"
                  : "border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] hover:border-[#2563EB] hover:text-[#2563EB]",
              )}
              aria-label={`Icon ${i + 1}`}
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        <label className="font-heading text-[16px] font-semibold text-[#131313]">Frequency</label>
        <div className="mb-3 mt-2 grid grid-cols-2 gap-3">
          {(["Daily", "Weekly"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFrequency(f)}
              className={cn(
                "flex h-12 items-center justify-center gap-2 rounded-xl border font-sans text-[16px] font-medium transition-colors",
                frequency === f
                  ? "border-[#2563EB] bg-[#2563EB] text-white"
                  : "border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] hover:border-[#2563EB]",
              )}
            >
              <Calendar className="h-4 w-4" /> {f}
            </button>
          ))}
        </div>
        <button className="mb-6 h-11 rounded-full bg-[#F1F1F1] px-5 font-sans text-[14px] font-medium text-[#6B7280] transition-colors hover:bg-[#E5E7EB]">
          + Set custom frequency
        </button>

        <label className="font-heading text-[16px] font-semibold text-[#131313]">
          Preferred Time
        </label>
        <div className="mb-8 mt-2 flex flex-wrap gap-2">
          {TIMES.map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={cn(
                "h-10 rounded-full border px-5 font-sans text-[14px] font-medium transition-colors",
                time === t
                  ? "border-[#2563EB] bg-[#2563EB] text-white"
                  : "border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] hover:border-[#2563EB]",
              )}
            >
              {t}
            </button>
          ))}
          <button className="h-10 rounded-full bg-[#F1F1F1] px-5 font-sans text-[14px] font-medium text-[#6B7280] transition-colors hover:bg-[#E5E7EB]">
            Set custom time
          </button>
        </div>

        <button
          disabled={!name.trim()}
          onClick={onClose}
          className={cn(
            "h-12 w-full rounded-full font-sans text-[16px] font-semibold transition-colors",
            name.trim()
              ? "bg-[#2563EB] text-white hover:bg-[#1D4FD7]"
              : "cursor-not-allowed bg-[#C7D6F8] text-[#131313]",
          )}
        >
          Add Habit
        </button>
      </div>
    </div>
  )
}
