import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import React from "react"

interface TextProps {
  title: React.ReactNode
  subtext: string
  action?: React.ReactNode
}

export function Header({ title, subtext, action }: TextProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[#E5E7EB] bg-[#FCFCFC] px-8">
      <div className="flex flex-col">
        <h1 className="flex items-center gap-2 font-heading text-[24px] font-semibold text-[#131313]">
          {title}
        </h1>
        <p className="font-sans text-[12px] text-[#6B7280]">{subtext}</p>
      </div>

      <div className="flex items-center gap-4">
        {action}

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <Input
            placeholder="Search habits..."
            className="h-11 rounded-xl border-none bg-[#F3F4F6] pl-10"
          />
        </div>

        <button className="relative rounded-xl border border-[#E5E7EB] bg-white p-2.5 text-[#9CA3AF] shadow-sm transition-colors hover:text-[#2563EB]">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#2563EB]" />
        </button>

        <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow-sm">
          <Image
            src="/assets/signup.png"
            alt="Avatar"
            width={44}
            height={44}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
