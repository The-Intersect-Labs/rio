"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { DailyActivity } from "@/lib/api/use-weekly-activity"

const chartConfig = {
  completed: {
    label: "Habits completed",
    color: "#2563EB",
  },
} satisfies ChartConfig

export function WeeklyActivity({
  data,
  total,
  isLoading,
}: {
  data: DailyActivity[]
  total: number
  isLoading?: boolean
}) {
  const peak = data.reduce((m, d) => Math.max(m, d.completed), 0)

  return (
    <Card className="rounded-3xl border-none bg-[#FCFCFC] shadow-sm">
      <CardContent className="p-6">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-heading text-[18px] font-semibold text-[#131313]">
            Weekly Activity
          </h3>
          <span className="font-sans text-[14px] font-medium text-[#6B7280]">
            {isLoading ? "Loading…" : `${total} check-ins`}
          </span>
        </div>
        <p className="mb-5 font-sans text-[13px] text-[#6B7280]">
          Habits completed each day this week
        </p>

        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#C9E7EA" strokeDasharray="4 4" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              allowDecimals={false}
            />
            <ChartTooltip
              cursor={{ fill: "#EBF1FF", radius: 8 }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="completed" radius={[8, 8, 0, 0]} maxBarSize={44} isAnimationActive={false}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.completed === peak && peak > 0 ? "#2563EB" : "#93B4F5"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
