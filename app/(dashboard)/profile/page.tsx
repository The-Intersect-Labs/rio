import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Calendar, Target, TrendingUp, BarChart2, Flame, AlertTriangle, Bell, Sun, MessageSquare, Lightbulb, User, Clock, CheckCircle2, ChevronRight, Activity } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  return (
    <div className="p-8 space-y-8 bg-[#E6F4EA] min-h-screen">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500">Manage your habits, settings, and insights</p>
      </header>

      <Card className="rounded-3xl border-none shadow-sm">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-md">
              <Image src="/assets/signup.png" alt="Profile" width={80} height={80} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Ireti Ogunmola</h2>
              <p className="text-gray-500 italic">"I am building systems that last."</p>
              <div className="flex gap-2 mt-2">
                <span className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  <Zap className="h-4 w-4" /> Discipline & Focus
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4" /> Joined Mar 21, 2026
                </span>
              </div>
            </div>
          </div>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">✏️</button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader><CardTitle className="text-lg">Behavioral Snapshot</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {[
              { icon: Zap, label: "Active Habits", value: "4", iconBg: "bg-blue-600", iconColor: "text-white" },
              { icon: Sun, label: "Keystone Habit", value: "Read 20 mins", valueBg: "bg-yellow-100 text-yellow-800", iconBg: "bg-amber-500", iconColor: "text-white" },
              { icon: Activity, label: "Strongest Pillar", value: "Body", valueBg: "bg-green-100 text-green-800", iconBg: "bg-green-600", iconColor: "text-white" },
              { icon: TrendingUp, label: "Weakest Pillar", value: "Mind", valueBg: "bg-red-100 text-red-800", iconBg: "bg-red-600", iconColor: "text-white" },
              { icon: BarChart2, label: "Weekly Consistency", value: "90%", valueBg: "bg-green-100 text-green-800", iconBg: "bg-indigo-600", iconColor: "text-white" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.iconBg} ${item.iconColor}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
                {item.valueBg ? (
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.valueBg}`}>{item.value}</span>
                ) : (
                  <span className="font-bold text-gray-900">{item.value}</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader><CardTitle className="text-lg">Scorecard History</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {[
              { icon: Target, label: "Hit the Gym", value: "100%", total: "5 total", progress: "7/7", color: "bg-red-500" },
              { icon: Activity, label: "Read 20 mins", value: "86%", total: "21 total", progress: "6/7", color: "bg-green-600" },
              { icon: Zap, label: "Meditation", value: "86%", total: "6 total", progress: "6/7", color: "bg-indigo-600" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 font-medium">
                    <div className={`p-1.5 rounded-lg ${item.color} text-white`}>
                      <item.icon className="h-3 w-3" />
                    </div>
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-green-600">{item.value}</span>
                    <span className="text-xs text-gray-400">↗</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1 ml-9">
                        {[...Array(7)].map((_, i) => <div key={i} className={`w-4 h-2 rounded-full ${i < parseInt(item.progress) ? item.color : "bg-gray-200"}`} />)}
                    </div>
                    <span className="text-xs text-gray-400 ml-auto">{item.total}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-8">
            <Card className="rounded-3xl border-none shadow-sm">
              <CardHeader><CardTitle className="text-lg">Analytics</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                {[
                    { icon: Clock, label: "Peak Productive Time", value: "Afternoon", valueBg: "bg-purple-100 text-purple-800", iconBg: "bg-purple-600" },
                    { icon: BarChart2, label: "Avg Completion Rate", value: "90%", iconBg: "bg-blue-600" },
                    { icon: Flame, label: "Streak Average", value: "10 days", iconBg: "bg-orange-600" },
                    { icon: AlertTriangle, label: "Risk Score", value: "Low", valueBg: "bg-green-100 text-green-800", iconBg: "bg-green-600" },
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${item.iconBg} text-white`}>
                                <item.icon className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        </div>
                        {item.valueBg ? (
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.valueBg}`}>{item.value}</span>
                        ) : (
                            <span className="font-bold text-gray-900">{item.value}</span>
                        )}
                    </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-none shadow-sm">
              <CardHeader><CardTitle className="text-lg">Settings</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                    { icon: Bell, label: "Notification Time", value: "8:00 AM" },
                    { icon: Calendar, label: "Weekly Review Day", value: "Sunday" },
                    { icon: MessageSquare, label: "Reminder Style", value: "Gentle" },
                    { icon: Lightbulb, label: "Insight Tone", value: "Encouraging" },
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2">
                        <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        </div>
                        <div className="flex items-center text-sm font-semibold">
                            {item.value}
                            <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
                        </div>
                    </div>
                ))}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
