import { Card, CardContent } from "@/components/ui/card"
import { BarChart2, Zap, CheckCircle2 } from "lucide-react"

export function HabitStats() {
  return (
    <div className="flex gap-6 h-full w-full">
      {/* Left Column: 2 Small Cards */}
      <div className="flex flex-col gap-6 w-1/2">
        <Card className="border-none shadow-sm rounded-3xl flex-1">
          <CardContent className="p-6 flex flex-col justify-center">
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <BarChart2 className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">4</p>
              <p className="text-sm font-medium text-gray-400">Active Habits</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm rounded-3xl flex-1">
          <CardContent className="p-6 flex flex-col justify-center">
            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
              <Zap className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">21</p>
              <p className="text-sm font-medium text-gray-400">Best Streak</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: 1 Tall Card */}
      <Card className="border-none shadow-sm rounded-3xl w-1/2">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
          <div className="flex-1">
            <p className="text-3xl font-bold text-gray-900">2/4</p>
            <p className="text-sm font-medium text-gray-400">Completed Today</p>
          </div>
          <div className="mt-auto space-y-2">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `50%` }}
              />
            </div>
            <p className="text-[10px] text-gray-400 font-medium">50% of today&apos;s goals</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
