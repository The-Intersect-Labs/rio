"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts"

export function HabitSummary() {
  const data = [
    { name: "Today", value: 40, fill: "#fbbf24" },
    { name: "Overall Rate", value: 50, fill: "#3b82f6" },
  ]

  const weeklyDots = [
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: true },
    { day: "T", completed: true },
    { day: "F", completed: false },
    { day: "S", completed: false },
    { day: "S", completed: false },
  ]

  return (
    <Card className="border-none shadow-sm rounded-3xl h-full flex flex-col justify-center">
      <CardContent className="p-8">
        <div className="flex items-start gap-8">
          {/* Chart Section */}
          <div className="relative h-44 w-44 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="100%"
                barSize={8}
                data={data}
                startAngle={90}
                endAngle={450}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  background={{ fill: "#f1f5f9" }}
                  dataKey="value"
                  cornerRadius={30}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">50%</span>
            </div>
          </div>

          {/* Stats & Weekly Dots */}
          <div className="flex-1 flex flex-col justify-between self-stretch">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium text-gray-400">Overall Rate</span>
                </div>
                <span className="text-sm font-bold text-gray-900">50%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-sm font-medium text-gray-400">Today</span>
                </div>
                <span className="text-sm font-bold text-gray-900">2/5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  <span className="text-sm font-medium text-gray-400">Best Streak</span>
                </div>
                <span className="text-sm font-bold text-gray-900">21 days</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              {weeklyDots.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-300 uppercase">{item.day}</span>
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center border-2 ${
                      item.completed
                        ? "bg-blue-100 border-blue-100 text-blue-600"
                        : "bg-gray-50 border-transparent"
                    }`}
                  >
                    {item.completed && (
                      <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
