"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  StepIdentity,
  StepHabits,
  StepPillars,
  StepFirstHabit,
  StepComplete,
  type BehaviorDraft,
} from "./steps";
import {
  useCreateGoal,
  useCreateHabit,
  useCreateScorecardEntry,
  useUpdateProfile,
} from "@/lib/api/hooks";
import type { PillarType, ScorecardClassification } from "@/lib/api/types";

// The API only stores a scheduled time (HH:MM), so map the coarse picker to one.
const TIME_OF_DAY: Record<string, string> = {
  Morning: "08:00",
  Afternoon: "14:00",
  Evening: "20:00",
};

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // form state
  const [identity, setIdentity] = useState("");
  const [behaviors, setBehaviors] = useState<BehaviorDraft[]>([]);
  const [pillars, setPillars] = useState<PillarType[]>([]);
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [timeOfDay, setTimeOfDay] = useState("Morning");
  const [trigger, setTrigger] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useUpdateProfile();
  const createScorecardEntry = useCreateScorecardEntry();
  const createGoal = useCreateGoal();
  const createHabit = useCreateHabit();

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const togglePillar = (p: PillarType) =>
    setPillars((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );

  const addBehavior = (behavior: string) =>
    setBehaviors((prev) => [...prev, { behavior }]);

  const removeBehavior = (i: number) =>
    setBehaviors((prev) => prev.filter((_, idx) => idx !== i));

  const classifyBehavior = (i: number, classification: ScorecardClassification) =>
    setBehaviors((prev) =>
      prev.map((b, idx) => (idx === i ? { ...b, classification } : b)),
    );

  const finish = async () => {
    setError(null);
    setSaving(true);
    try {
      // 1. Persist identity + pillars + the completion flag on the profile.
      await updateProfile.mutateAsync({
        identityStatement: identity.trim() || undefined,
        selectedPillars: pillars,
        onboardingCompleted: true,
      });

      // 2. Persist the behavior scorecard (POST /scorecard, one per entry).
      for (const b of behaviors) {
        if (!b.classification) continue;
        await createScorecardEntry.mutateAsync({
          behavior: b.behavior,
          classification: b.classification,
        });
      }

      // 3. Habits must belong to a goal — create one to hold the first habit.
      if (habitName.trim()) {
        const goal = await createGoal.mutateAsync({
          title: "My Habits",
          description: identity.trim() || undefined,
          type: "long_term",
        });
        await createHabit.mutateAsync({
          goalId: goal.id,
          title: habitName.trim(),
          pillar: pillars[0],
          frequency: frequency === "Weekly" ? "weekly" : "daily",
          scheduledTime: TIME_OF_DAY[timeOfDay],
          habitStackTrigger: trigger.trim() || undefined,
        });
      }

      router.push("/dashboard");
    } catch (e) {
      setError((e as Error).message || "Something went wrong saving your setup.");
    } finally {
      setSaving(false);
    }
  };

  const isComplete = step === 4;

  return (
    <div className="w-full max-w-[520px]">
      {isComplete ? (
        <StepComplete onFinish={finish} saving={saving} error={error} />
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
              behaviors={behaviors}
              onAdd={addBehavior}
              onRemove={removeBehavior}
              onClassify={classifyBehavior}
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
