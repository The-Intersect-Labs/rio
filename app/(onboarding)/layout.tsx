import { RequireAuth } from "@/components/require-auth";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="flex min-h-screen w-full items-center justify-center bg-[#E6F6F7] px-4 py-10">
        {children}
      </div>
    </RequireAuth>
  );
}
