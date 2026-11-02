import { Header } from "@/components/header"
import { GoalStats } from "./components/goal-stats"
import { GoalList } from "./components/goal-list"
import { AddGoalButton } from "./components/add-goal-button"

export default function GoalsPage() {
  return (
    <div className="flex h-full flex-col">
      <Header
        title="Goals"
        subtext="Track and manage your personal goals"
        action={<AddGoalButton />}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6">
          <GoalStats />
          <GoalList />
        </div>
      </div>
    </div>
  )
}
