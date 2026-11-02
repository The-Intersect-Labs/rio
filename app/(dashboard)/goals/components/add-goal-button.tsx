"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateGoalModal } from "./create-goal-modal"

export function AddGoalButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="flex h-11 items-center gap-2 rounded-xl bg-[#7C3AED] px-5 font-sans text-[15px] font-medium text-white shadow-sm hover:bg-[#6D28D9]"
      >
        <Plus className="h-4 w-4" />
        Add Goal
      </Button>
      <CreateGoalModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
