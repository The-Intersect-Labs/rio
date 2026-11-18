import { Sidebar } from "@/components/sidebar"
import { RequireAuth } from "@/components/require-auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireAuth>
      <div className="flex h-screen gap-4 bg-[#E6F6F7] p-4">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden rounded-3xl bg-[#E6F6F7]">
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </RequireAuth>
  )
}
