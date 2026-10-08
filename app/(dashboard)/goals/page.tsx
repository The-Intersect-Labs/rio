import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { GoalStats } from "./components/goal-stats"
import { GoalList } from "./components/goal-list"

export default function GoalsPage() {
  return (
    <div className="flex flex-col h-full bg-[#EFF6FF]">
      <Header 
        title="Goals" 
        subtext="Track and manage your personal goals" 
        action={
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-6 font-bold flex gap-2">
            <Plus className="h-5 w-5" />
            Add Goal
          </Button>
        }
      />
      
      <div className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">
        <div className="space-y-10">
          <GoalStats />
          <GoalList />
        </div>
      </div>
    </div>
  )
}
