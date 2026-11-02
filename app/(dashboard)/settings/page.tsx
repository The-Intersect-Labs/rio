import Image from "next/image"
import {
  Bell,
  Flame,
  CalendarCheck,
  Clock,
  CalendarDays,
  Sparkles,
  LogOut,
  Trash2,
} from "lucide-react"
import { Header } from "@/components/header"
import { SettingsSection } from "./components/settings-section"
import { SettingsRow } from "./components/settings-row"
import { ToggleSwitch } from "./components/toggle-switch"

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Settings" subtext="Manage your preferences" />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-[720px] space-y-8">
          <SettingsSection title="Account">
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm">
                <Image
                  src="/assets/signup.png"
                  alt="Avatar"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[15px] font-semibold text-[#131313]">
                  Ireti Ogunmola
                </p>
                <p className="mt-0.5 font-sans text-[12px] text-[#6B7280]">
                  ireti@rio.app
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-[#EBF1FF] px-3 py-1 font-sans text-[12px] font-semibold text-[#2563EB]">
                Pro
              </span>
            </div>
          </SettingsSection>

          <SettingsSection title="Notifications">
            <SettingsRow
              icon={<Bell className="h-5 w-5" />}
              label="Daily reminders"
              subtext="A gentle nudge for your habits"
              trailing={<ToggleSwitch defaultChecked label="Daily reminders" />}
            />
            <SettingsRow
              icon={<Flame className="h-5 w-5" />}
              iconBg="bg-[#FFDACD]"
              iconColor="text-[#FF6B35]"
              label="Streak alerts"
              subtext="Notify me when a streak is at risk"
              trailing={<ToggleSwitch defaultChecked label="Streak alerts" />}
            />
            <SettingsRow
              icon={<CalendarCheck className="h-5 w-5" />}
              iconBg="bg-[#DECEFB]"
              iconColor="text-[#7C3AED]"
              label="Weekly review"
              subtext="Your summary every Sunday"
              trailing={<ToggleSwitch label="Weekly review" />}
            />
          </SettingsSection>

          <SettingsSection title="Preferences">
            <SettingsRow
              icon={<Clock className="h-5 w-5" />}
              label="Reminder time"
              subtext="When to send daily reminders"
              value="7:00 AM"
            />
            <SettingsRow
              icon={<CalendarDays className="h-5 w-5" />}
              iconBg="bg-[#F1FBF4]"
              iconColor="text-[#228E3B]"
              label="Week starts on"
              value="Monday"
            />
            <SettingsRow
              icon={<Sparkles className="h-5 w-5" />}
              iconBg="bg-[#EFEAFF]"
              iconColor="text-[#7C3AED]"
              label="Insight tone"
              subtext="How suggestions are phrased"
              value="Encouraging"
            />
          </SettingsSection>

          <SettingsSection title="Account Actions">
            <SettingsRow icon={<LogOut className="h-5 w-5" />} label="Log out" />
            <SettingsRow
              danger
              icon={<Trash2 className="h-5 w-5" />}
              label="Delete account"
              subtext="Permanently remove your data"
            />
          </SettingsSection>
        </div>
      </div>
    </div>
  )
}
