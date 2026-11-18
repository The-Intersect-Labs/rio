"use client"

import { useEffect, useState } from "react"
import { X, Calendar, Check, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCreateGoal } from "@/lib/api/hooks"

interface CreateGoalModalProps {
  open: boolean
  onClose: () => void
}

type DurationType = "short" | "long"

export function CreateGoalModal({ open, onClose }: CreateGoalModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState<DurationType>("short")
  const [error, setError] = useState<string | null>(null)
  const createGoal = useCreateGoal()

  const handleSubmit = async () => {
    if (!title.trim() || createGoal.isPending) return
    setError(null)
    try {
      await createGoal.mutateAsync({
        title: title.trim(),
        description: description.trim() || undefined,
        type: duration === "long" ? "long_term" : "short_term",
      })
      setTitle("")
      setDescription("")
      setDuration("short")
      onClose()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  // Close on Escape and lock scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Create Goal"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[calc(100vh-2rem)] w-full max-w-[540px] overflow-y-auto rounded-3xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6">
          <h2 className="font-heading text-[18px] font-semibold text-[#131313]">
            Create Goal
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F1F1] text-[#131313] transition-colors hover:bg-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-px w-full bg-[#F1F1F1]" />

        {/* Body */}
        <div className="space-y-6 px-8 py-6">
          {/* Goal Title */}
          <div>
            <label className="mb-2 block font-sans text-[14px] font-medium text-[#131313]">
              Goal Title
            </label>
            <div className="relative">
              <input
                value={title}
                maxLength={60}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What do you want to achieve?"
                className="h-[50px] w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 pr-14 font-sans text-[14px] text-[#131313] outline-none transition-colors placeholder:text-[#6B7280] focus:border-[#2563EB]"
              />
              <span className="absolute bottom-2.5 right-4 font-sans text-[10px] text-[#6B7280]">
                {title.length}/60
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-sans text-[14px] font-medium text-[#131313]">
              Description
            </label>
            <div className="relative">
              <textarea
                value={description}
                maxLength={300}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details about your goal"
                className="h-[126px] w-full resize-none rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 font-sans text-[14px] text-[#131313] outline-none transition-colors placeholder:text-[#6B7280] focus:border-[#2563EB]"
              />
              <span className="absolute bottom-2.5 right-4 font-sans text-[10px] text-[#6B7280]">
                {description.length}/300
              </span>
            </div>
          </div>

          {/* Duration Type */}
          <div>
            <label className="mb-2 block font-sans text-[14px] font-medium text-[#131313]">
              Duration Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDuration("short")}
                className={cn(
                  "flex h-[47px] flex-1 items-center justify-center gap-2 rounded-2xl border font-sans text-[14px] font-medium transition-colors",
                  duration === "short"
                    ? "border-[#2563EB] bg-[#DBEAFE] text-[#2563EB]"
                    : "border-transparent bg-[#F1F1F1] text-[#6B7280] hover:bg-gray-200",
                )}
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] border-2 border-current">
                  <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                </span>
                Short-term
              </button>
              <button
                type="button"
                onClick={() => setDuration("long")}
                className={cn(
                  "flex h-[47px] flex-1 items-center justify-center gap-2 rounded-2xl border font-sans text-[14px] font-medium transition-colors",
                  duration === "long"
                    ? "border-[#2563EB] bg-[#DBEAFE] text-[#2563EB]"
                    : "border-transparent bg-[#F1F1F1] text-[#6B7280] hover:bg-gray-200",
                )}
              >
                <Calendar className="h-3.5 w-3.5" />
                Long-term
              </button>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="flex items-start gap-3 rounded-2xl bg-[#C9D8FA] p-4">
            <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#92B1F5]">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[12px] font-semibold text-[#1F54C8]">
                Pro Tip
              </p>
              <p className="font-sans text-[12px] text-[#1F54C8]">
                Short-term goals are great for building momentum. Aim for 1-4
                weeks.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-3 px-8 pb-6 pt-4">
          {error && (
            <p className="w-full rounded-xl bg-red-50 px-4 py-2 text-center font-sans text-[13px] text-red-600">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim() || createGoal.isPending}
            className="h-[50px] w-full rounded-full bg-[#C9D8FA] font-sans text-[16px] font-semibold text-[#131313] transition-colors hover:bg-[#B4CBF7] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createGoal.isPending ? "Creating…" : "Create Goal"}
          </button>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-5 rounded-full bg-[#2563EB]" />
            <span className="h-1.5 w-5 rounded-full bg-[#C9D8FA]" />
          </div>
        </div>
      </div>
    </div>
  )
}
