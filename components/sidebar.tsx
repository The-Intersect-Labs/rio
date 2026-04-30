"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, Zap, User, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: BarChart2, label: "Stats", href: "/stats" },
  { icon: Zap, label: "Streaks", href: "/streaks" },
  { icon: User, label: "Profile", href: "/profile" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-20 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">RIO</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto border-t p-4 space-y-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
             <Image src="/assets/signup.png" alt="Avatar" width={40} height={40} className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">Ireti Ogunmola</span>
            <span className="text-xs text-gray-500">Pro Member</span>
          </div>
        </div>
      </div>
    </div>
  )
}
