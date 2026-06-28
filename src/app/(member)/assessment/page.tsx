"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FogLayer } from "@/components/atmosphere/FogLayer";
import { ViewportSection } from "@/components/layout/ViewportSection";
import type { MissionZeroAnswers } from "@/lib/domain/models/mission-zero";
import {
  MISSION_ZERO_QUESTION_COUNT,
  MISSION_ZERO_STEPS,
  type MissionZeroStep,
} from "@/lib/mission-zero/content";
import {
  createEmptyMissionZeroAnswers,
  generateProfileFromMissionZero,
} from "@/lib/mission-zero/scoring";
import { loadMissionZeroScan, saveMissionZeroScan, saveProfile } from "@/lib/storage";

function isStepComplete(
  step: MissionZeroStep,
  answers: Partial<MissionZeroAnswers>
): boolean {
  if (step.kind === "intro" || step.kind === "stage-lesson") return true;
  const value = answers[step.id];
  if (step.input === "multi") return Array.isArray(value) && value.length > 0;
  if (step.input === "text") return typeof value === "string" && value.trim().length > 0;
  return value !== undefined && value !== null && value !== "";
}

function questionIndex(stepIndex: number): number {
  return MISSION_ZERO_STEPS.slice(0, stepIndex + 1).filter((s) => s.kind === "question").length;
}

export default function AssessmentPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<MissionZeroAnswers>>(createEmptyMissionZeroAnswers);

  const currentStep = MISSION_ZERO_STEPS[stepIndex];
  const isLastStep = stepIndex === MISSION_ZERO_STEPS.length - 1;
  const canContinue = isStepComplete(currentStep, answers);
  const fogDensity = Math.max(0.25, 0.9 - stepIndex * 0.025);

  const progressLabel = useMemo(() => {
    if (currentStep.kind === "question") {
      return `Observation ${questionIndex(stepIndex)} of ${MISSION_ZERO_QUESTION_COUNT}`;
    }
    if (currentStep.kind === "stage-lesson") return currentStep.stage;
    return "Mission 0";
  }, [currentStep, stepIndex]);

  useEffect(() => {
    const saved = loadMissionZeroScan();
    if (saved) setAnswers(saved);
  }, []);

  useEffect(() => {
    const hasProgress = MISSION_ZERO_STEPS.some(
      (step) => step.kind === "question" && isStepComplete(step, answers)
    );
    if (hasProgress && answers.version) {
      saveMissionZeroScan(answers as MissionZeroAnswers);
    }
  }, [answers]);

  function handleSingleSelect(id: keyof MissionZeroAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function handleMultiToggle(id: keyof MissionZeroAnswers, value: string) {
    setAnswers((prev) => {
      const current = (prev[id] as string[] | undefined) ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [id]: next };
    });
  }

  function handleTextChange(id: keyof MissionZeroAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function handleContinue() {
    if (!canContinue) return;

    if (isLastStep) {
      const complete = answers as MissionZeroAnswers;
      const profile = generateProfileFromMissionZero(complete);
      saveMissionZeroScan(complete);
      saveProfile(profile);
      router.push("/profile");
      return;
    }

    setStepIndex((i) => i + 1);
  }

  function handleBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  return (
    <div className="snap-scroll-y relative bg-mbn-bg">
      <div className="pointer-events-none fixed inset-0 z-0">
        <FogLayer density={fogDensity} animated />
      </div>

      <div className="relative z-10">
        <ViewportSection>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-electric-bright">
            {progressLabel}
          </p>

          {currentStep.kind === "intro" && (
            <>
              <h1 className="mt-6 font-display text-4xl text-mbn-white sm:text-5xl">
                {currentStep.title}
              </h1>
              <div className="mt-10 space-y-6">
                {currentStep.paragraphs.map((line) => (
                  <p key={line} className="text-lg leading-relaxed text-mbn-steel sm:text-xl">
                    {line}
                  </p>
                ))}
              </div>
            </>
          )}

          {currentStep.kind === "stage-lesson" && (
            <>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.25em] text-mbn-steel-dim">
                Stage · {currentStep.stage}
              </p>
              <h2 className="mt-6 font-display text-3xl leading-snug text-mbn-white sm:text-4xl">
                {currentStep.title}
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-mbn-steel sm:text-xl">
                {currentStep.body}
              </p>
            </>
          )}

          {currentStep.kind === "question" && (
            <>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.25em] text-mbn-steel-dim">
                {currentStep.stage}
              </p>
              <h2 className="mt-6 font-display text-2xl leading-snug text-mbn-white sm:text-3xl">
                {currentStep.prompt}
              </h2>
              {currentStep.hint && (
                <p className="mt-4 text-sm text-electric-primary/80">{currentStep.hint}</p>
              )}
              <p className="mt-2 text-sm text-mbn-steel-dim">Trust what you notice.</p>

              {currentStep.input === "text" && (
                <textarea
                  value={(answers[currentStep.id] as string) ?? ""}
                  onChange={(e) => handleTextChange(currentStep.id, e.target.value)}
                  rows={4}
                  placeholder="Write what you noticed…"
                  className="mt-8 w-full rounded-xl border border-white/10 bg-mbn-panel/60 p-4 text-mbn-white placeholder:text-mbn-steel-dim focus:border-electric-primary/40 focus:outline-none focus:ring-1 focus:ring-electric-primary/30"
                />
              )}

              {currentStep.input === "single" && currentStep.options && (
                <div className="mt-8 space-y-3 text-left">
                  {currentStep.options.map((option) => {
                    const selected = answers[currentStep.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSingleSelect(currentStep.id, option.value)}
                        className={`option-card ${selected ? "option-card-selected" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              selected
                                ? "border-electric-primary bg-electric-primary"
                                : "border-white/20"
                            }`}
                          >
                            {selected && (
                              <svg
                                className="h-3 w-3 text-mbn-bg"
                                fill="currentColor"
                                viewBox="0 0 12 12"
                              >
                                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                              </svg>
                            )}
                          </div>
                          <p className="font-medium text-mbn-white">{option.label}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentStep.input === "multi" && currentStep.options && (
                <div className="mt-8 space-y-3 text-left">
                  {currentStep.options.map((option) => {
                    const selected = ((answers[currentStep.id] as string[]) ?? []).includes(
                      option.value
                    );
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleMultiToggle(currentStep.id, option.value)}
                        className={`option-card ${selected ? "option-card-selected" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                              selected
                                ? "border-electric-primary bg-electric-primary"
                                : "border-white/20"
                            }`}
                          >
                            {selected && (
                              <svg
                                className="h-3 w-3 text-mbn-bg"
                                fill="currentColor"
                                viewBox="0 0 12 12"
                              >
                                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                              </svg>
                            )}
                          </div>
                          <p className="font-medium text-mbn-white">{option.label}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={stepIndex === 0}
              className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLastStep ? "Reveal the map" : "Continue"}
            </button>
          </div>
        </ViewportSection>
      </div>
    </div>
  );
}
