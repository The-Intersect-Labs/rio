"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BarChart3,
  Flame,
  User,
  Settings,
  LogOut,
  PanelLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: BarChart3, label: "Stats", href: "/stats" },
  { icon: Flame, label: "Daily Streak", href: "/streaks" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-60 shrink-0 flex-col rounded-3xl bg-[#FCFCFC] p-5">
      <div className="flex items-center justify-between px-1">
        <span className="font-heading text-2xl font-bold text-[#2563EB]">RIO</span>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F0F4FF] hover:text-[#2563EB]"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 font-sans text-[16px] font-medium transition-colors",
                isActive
                  ? "bg-[#2563EB] text-[#FCFCFC]"
                  : "text-[#6B7280] hover:bg-[#F0F4FF] hover:text-[#2563EB]",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-3 px-1 py-2">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
            <Image
              src="/assets/signup.png"
              alt="Avatar"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-sans text-[16px] font-medium text-black">
              Ireti Ogunmola
            </span>
            <span className="font-sans text-[12px] text-[#6B7280]">Pro Member</span>
          </div>
        </div>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2 font-sans text-[16px] font-medium text-[#E20004] transition-colors hover:bg-[#FDECEC]">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
