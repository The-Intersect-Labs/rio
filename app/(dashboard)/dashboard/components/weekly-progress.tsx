"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Plus, TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { day: "Mon", progress: 40 },
  { day: "Tue", progress: 30 },
  { day: "Wed", progress: 60 },
  { day: "Thu", progress: 25 },
  { day: "Fri", progress: 55 },
  { day: "Sat", progress: 90 },
  { day: "Sun", progress: 20 },
]

const chartConfig = {
  progress: {
    label: "Progress",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function WeeklyProgress() {
  return (
    <Card className="border-none shadow-sm rounded-3xl">
      <CardContent className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-500 mb-1">Weekly Progress</h3>
            <div className="flex flex-col items-baseline gap-2">
              <span className="text-4xl font-bold">62%</span>
              <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-5 w-5" /> +8% from last week
              </span>
            </div>
          </div>
          <div className="relative h-20 w-20 flex items-center justify-center">
            <svg className="h-full w-full -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#f1f5f9"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeDasharray="226.2"
                strokeDashoffset={226.2 * (1 - 0.62)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-50 p-2 rounded-full">
                <Trophy className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="h-40 w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="progress"
                radius={[6, 6, 6, 6]}
                barSize={100}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.day === "Sat" ? "#3b82f6" : "#dbeafe"} 
                    className="transition-all duration-300"
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
