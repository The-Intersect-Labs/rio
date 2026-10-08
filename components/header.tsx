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
    <header className="flex h-20 items-center justify-between px-8 bg-[#f8fafc] border-b border-gray-100">
      <div className="flex items-center justify-between flex-1">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {title}
          </h1>
          <p className="text-sm text-gray-500">
            {subtext}
          </p>
        </div>
        {action && (
          <div className="mr-8">
            {action}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 border-l border-gray-100 pl-8">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search..." 
            className="pl-10 bg-white border-none rounded-xl h-11" 
          />
        </div>
        
        <button className="relative rounded-xl bg-white p-2.5 text-gray-400 shadow-sm border border-gray-100 hover:text-gray-600 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-blue-500" />
        </button>

        <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow-sm">
           <Image src="/assets/signup.png" alt="Avatar" width={44} height={44} className="object-cover" />
        </div>
      </div>
    </header>
  )
}
