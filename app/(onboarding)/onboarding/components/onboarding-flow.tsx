"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  StepIdentity,
  StepHabits,
  StepPillars,
  StepFirstHabit,
  StepComplete,
} from "./steps";

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // form state
  const [identity, setIdentity] = useState("");
  const [habits, setHabits] = useState<string[]>([]);
  const [pillars, setPillars] = useState<string[]>([]);
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [timeOfDay, setTimeOfDay] = useState("Morning");
  const [trigger, setTrigger] = useState("");

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const togglePillar = (p: string) =>
    setPillars((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );

  const finish = () => {
    // Persist onboarding result for the app (swap for a real API later)
    try {
      localStorage.setItem(
        "rio:onboarding",
        JSON.stringify({ identity, habits, pillars, firstHabit: habitName, frequency, timeOfDay, trigger }),
      );
    } catch {
      /* ignore storage errors */
    }
    router.push("/dashboard");
  };

  const isComplete = step === 4;

  return (
    <div className="w-full max-w-[520px]">
      {isComplete ? (
        <StepComplete onFinish={finish} />
      ) : (
        <div className="rounded-3xl bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="mb-4 font-sans text-[14px] font-medium text-[#6B7280] transition-colors hover:text-[#2563EB]"
            >
              ← Back
            </button>
          )}

          {step === 0 && (
            <StepIdentity value={identity} onChange={setIdentity} onNext={next} />
          )}

          {step === 1 && (
            <StepHabits
              habits={habits}
              onAdd={(h) => setHabits((prev) => [...prev, h])}
              onRemove={(i) => setHabits((prev) => prev.filter((_, idx) => idx !== i))}
              onNext={next}
            />
          )}

          {step === 2 && (
            <StepPillars selected={pillars} onToggle={togglePillar} onNext={next} />
          )}

          {step === 3 && (
            <StepFirstHabit
              name={habitName}
              setName={setHabitName}
              frequency={frequency}
              setFrequency={setFrequency}
              timeOfDay={timeOfDay}
              setTimeOfDay={setTimeOfDay}
              trigger={trigger}
              setTrigger={setTrigger}
              onNext={next}
            />
          )}
        </div>
      )}
    </div>
  );
}
