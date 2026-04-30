import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter, Plus, Target } from "lucide-react"

export function TodayFocus() {
  return (
    <Card className="border-none shadow-sm rounded-3xl">
      <CardContent className="p-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-xl font-bold">Today's Focus</h3>
            <p className="text-sm text-gray-500">Complete your daily Goal</p>
          </div>
          <Button variant="outline" className="rounded-xl bg-blue-600 text-white flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center">
            <Target className="h-12 w-12 text-blue-600" />
          </div>
          <div className="text-center space-y-2">
            <h4 className="text-lg font-bold">No habits yet</h4>
            <p className="text-sm text-gray-500 max-w-xs">
              Start building your habits. Your habit journey starts here.
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 h-12 text-base font-semibold flex items-center gap-2">
            <Plus className="h-5 w-5" /> Create Your First Habit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
