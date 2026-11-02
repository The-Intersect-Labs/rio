"use client";

import {
  Heart,
  BookOpen,
  Briefcase,
  Smile,
  Users,
  Dumbbell,
  Brain,
  Palette,
  Target,
  TrendingUp,
  HeartHandshake,
  Compass,
  Wallet,
  Home,
  Plus,
  X,
  Lightbulb,
  Bot,
  AlertTriangle,
  Check,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

/* ---------------------------------- shared --------------------------------- */

export function StepProgress({ step, total = 4 }: { step: number; total?: number }) {
  return (
    <div className="mb-7">
      <p className="mb-3 font-sans text-[15px] font-medium text-[#09193B]">
        Step {step + 1} of {total}
      </p>
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= step ? "bg-[#2563EB]" : "bg-[#C7D6F8]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function StepHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <div className="mb-6 text-center">
      <h1 className="font-heading text-[32px] font-bold leading-tight text-[#2563EB]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 font-sans text-[18px] leading-snug text-[#6B7280]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function ActionButton({
  children,
  disabled,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-12 w-full rounded-full font-sans text-[18px] font-semibold transition-colors",
        disabled
          ? "cursor-not-allowed bg-[#C7D6F8] text-[#131313]"
          : "bg-[#2563EB] text-white hover:bg-[#1D4FD7]",
      )}
    >
      {children}
    </button>
  );
}

export function InsightCard({
  icon: Icon = Lightbulb,
  title,
  children,
}: {
  icon?: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-2xl bg-[#EBF1FF] p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10">
        <Icon className="h-4 w-4 text-[#2563EB]" />
      </div>
      <div>
        <p className="font-heading text-[14px] font-semibold text-[#004AC6]">{title}</p>
        <p className="mt-0.5 font-sans text-[14px] leading-snug text-[#434655]">
          {children}
        </p>
      </div>
    </div>
  );
}

const fieldLabel = "font-heading text-[16px] font-semibold text-[#111827]";

/* -------------------------------- step 1: identity -------------------------------- */

const SUGGESTIONS = [
  "A disciplined learner",
  "A consistent reader",
  "A healthy person",
  "A purpose driven person",
  "A focused creator",
  "A physically fit person",
];

export function StepIdentity({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepProgress step={0} />
      <StepHeading
        title="Who do you want to become?"
        subtitle="Your habits should reinforce the type of person you want to be"
      />

      <div className="mt-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 100))}
          placeholder="I am becoming..."
          rows={4}
          className="w-full resize-none rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 font-sans text-[16px] text-[#111827] outline-none transition placeholder:text-[#6B7280] focus:border-[#2563EB]"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="font-sans text-[14px] font-medium text-[#6B7280]">
            You can edit this anytime.
          </span>
          <span className="font-sans text-[14px] font-medium text-[#6B7280]">
            {value.length}/100
          </span>
        </div>
      </div>

      <p className="mt-6 font-sans text-[16px] text-[#131313]">Or Choose from Suggestions</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s.slice(0, 100))}
            className={cn(
              "rounded-xl border px-3 py-2.5 font-sans text-[15px] text-[#6B7280] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]",
              value === s ? "border-[#2563EB] text-[#2563EB]" : "border-[#E5E7EB] bg-white",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <InsightCard icon={Bot} title="RIO’s Insight">
          Identity-based habits are 3x more likely to stick. By saying “I am a runner” instead
          of “I want to run”, you rewire your brain’s reward system.
        </InsightCard>
      </div>

      <div className="mt-8">
        <ActionButton disabled={!value.trim()} onClick={onNext}>
          Save Identity
        </ActionButton>
      </div>
    </div>
  );
}

/* -------------------------------- step 2: current habits -------------------------------- */

export function StepHabits({
  habits,
  onAdd,
  onRemove,
  onNext,
}: {
  habits: string[];
  onAdd: (h: string) => void;
  onRemove: (i: number) => void;
  onNext: () => void;
}) {
  const [draft, setDraft] = useState("");
  const add = () => {
    if (draft.trim()) {
      onAdd(draft.trim());
      setDraft("");
    }
  };

  return (
    <div>
      <StepProgress step={1} />
      <StepHeading
        title="Your Current Habits"
        subtitle="List behaviors you already do regularly."
      />

      <div className="mt-6 flex gap-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="e.g., Reading before bed"
          className="h-12 flex-1 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 font-sans text-[16px] text-[#111827] outline-none transition placeholder:text-[#6B7280] focus:border-[#2563EB]"
        />
        <button
          type="button"
          onClick={add}
          className="inline-flex h-12 items-center gap-1.5 rounded-xl bg-[#2563EB] px-5 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4FD7]"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {habits.length === 0 ? (
          <div className="flex items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
            <p className="font-sans text-[15px] text-[#6B7280]">
              Start by classifying your behaviours to understand your patterns
            </p>
          </div>
        ) : (
          habits.map((h, i) => (
            <div
              key={`${h}-${i}`}
              className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3"
            >
              <span className="font-sans text-[15px] text-[#111827]">{h}</span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="text-[#9CA3AF] transition-colors hover:text-[#EF4444]"
                aria-label={`Remove ${h}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-8">
        <ActionButton onClick={onNext}>Continue</ActionButton>
      </div>
    </div>
  );
}

/* -------------------------------- step 3: pillars -------------------------------- */

type Pillar = { label: string; icon: LucideIcon };

const PILLARS: Pillar[] = [
  { label: "Health", icon: Heart },
  { label: "Learning", icon: BookOpen },
  { label: "Wealth / Career", icon: Briefcase },
  { label: "Emotional / Spiritual", icon: Smile },
  { label: "Relationships", icon: Users },
  { label: "Fitness / Physical Activity", icon: Dumbbell },
  { label: "Mental Health", icon: Brain },
  { label: "Creativity", icon: Palette },
  { label: "Productivity / Focus", icon: Target },
  { label: "Personal Growth", icon: TrendingUp },
  { label: "Community / Contribution", icon: HeartHandshake },
  { label: "Adventure / Experiences", icon: Compass },
  { label: "Financial Stability", icon: Wallet },
  { label: "Family", icon: Home },
];

export function StepPillars({
  selected,
  onToggle,
  onNext,
}: {
  selected: string[];
  onToggle: (p: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepProgress step={2} />
      <StepHeading
        title="Choose Your Focus Areas"
        subtitle={
          <>
            Balanced habits create sustainable growth.
            <br />
            <span className="font-medium">Select 2- 4 pillars.</span>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-3 gap-3">
        {PILLARS.map((p) => {
          const active = selected.includes(p.label);
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => onToggle(p.label)}
              className={cn(
                "flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border p-2 text-center transition-colors",
                active
                  ? "border-[#2563EB] bg-[#EBF1FF]"
                  : "border-transparent bg-[#EEF2FB] hover:bg-[#E3EAF9]",
              )}
            >
              <p.icon
                className={cn("h-5 w-5", active ? "text-[#2563EB]" : "text-[#64748B]")}
              />
              <span className="font-sans text-[13px] font-medium leading-tight text-[#131313]">
                {p.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <InsightCard icon={Bot} title=" ">
          RIO will help you keep your habits balanced across pillars.
        </InsightCard>
      </div>

      <div className="mt-8">
        <ActionButton disabled={selected.length < 2 || selected.length > 4} onClick={onNext}>
          Continue
        </ActionButton>
      </div>
    </div>
  );
}

/* -------------------------------- step 4: first habit -------------------------------- */

export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-xl bg-[#F3F4F6] p-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={cn(
            "flex-1 rounded-lg py-2.5 font-sans text-[16px] font-semibold transition-colors",
            value === o ? "bg-white text-[#2563EB] shadow-sm" : "text-[#6B7280]",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function StepFirstHabit({
  name,
  setName,
  frequency,
  setFrequency,
  timeOfDay,
  setTimeOfDay,
  trigger,
  setTrigger,
  onNext,
}: {
  name: string;
  setName: (v: string) => void;
  frequency: string;
  setFrequency: (v: string) => void;
  timeOfDay: string;
  setTimeOfDay: (v: string) => void;
  trigger: string;
  setTrigger: (v: string) => void;
  onNext: () => void;
}) {
  const inputCls =
    "h-12 w-full rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 font-sans text-[16px] text-[#111827] outline-none transition placeholder:text-[#6B7280] focus:border-[#2563EB]";

  return (
    <div>
      <StepProgress step={3} />
      <StepHeading
        title="Start Your First Habit"
        subtitle="Small habits create big identity change."
      />

      <div className="mt-6 space-y-5">
        <div>
          <label className={fieldLabel}>Habit name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Exercise"
            className={cn(inputCls, "mt-2")}
          />
        </div>

        <div>
          <label className={fieldLabel}>Frequency</label>
          <div className="mt-2">
            <Segmented
              value={frequency}
              options={["Daily", "Weekly"]}
              onChange={setFrequency}
            />
          </div>
        </div>

        <div>
          <label className={fieldLabel}>Time of the day</label>
          <div className="mt-2">
            <Segmented
              value={timeOfDay}
              options={["Morning", "Afternoon", "Evening"]}
              onChange={setTimeOfDay}
            />
          </div>
        </div>

        <div>
          <label className={fieldLabel}>Habit Stack Trigger</label>
          <input
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            placeholder="e.g. After morning meditation"
            className={cn(inputCls, "mt-2")}
          />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#FEF9E7] p-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
        <p className="font-sans text-[14px] font-medium leading-snug text-[#806103]">
          Starting with too many habits reduces success. We recommend beginning with 1-3 habits.
        </p>
      </div>

      <div className="mt-8">
        <ActionButton disabled={!name.trim()} onClick={onNext}>
          Start My System
        </ActionButton>
      </div>
    </div>
  );
}

/* -------------------------------- complete -------------------------------- */

const CONFETTI_COLORS = ["#2563EB", "#22C55E", "#A855F7", "#F59E0B", "#38BDF8"];

function confetti(index: number, total: number) {
  // deterministic pseudo-random so SSR and client match
  const r = (n: number) => {
    const x = Math.sin(index * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    top: `${(r(2) * 100).toFixed(2)}%`,
    size: 6 + Math.round(r(3) * 6),
    color: CONFETTI_COLORS[Math.floor(r(4) * CONFETTI_COLORS.length)],
    delay: `${(r(5) * 2).toFixed(2)}s`,
  };
}

export function StepComplete({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="relative flex min-h-[560px] w-full flex-col items-center justify-center overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 70 }).map((_, i) => {
          const c = confetti(i, 70);
          return (
            <span
              key={i}
              className="absolute animate-pulse rounded-full"
              style={{
                left: c.left,
                top: c.top,
                width: c.size,
                height: c.size,
                backgroundColor: c.color,
                animationDelay: c.delay,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#16A34A] shadow-[0_0_60px_rgba(168,85,247,0.45)]">
          <Check className="h-14 w-14 text-white" strokeWidth={3} />
        </div>
        <h1 className="mt-10 font-heading text-[32px] font-bold text-[#2563EB]">
          You’re All Set
        </h1>
        <p className="mx-auto mt-3 max-w-md font-sans text-[18px] leading-snug text-[#6B7280]">
          Your RIO experience begins now. Let&apos;s start building great habits together!
        </p>
        <div className="mt-14 w-[320px] max-w-full">
          <ActionButton onClick={onFinish}>Go to Dashboard</ActionButton>
        </div>
      </div>
    </div>
  );
}
