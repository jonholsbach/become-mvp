"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ProgressBar } from "@/components/ProgressBar";
import { FogIndicator } from "@/components/FogIndicator";
import { DEFAULT_FOG } from "@/lib/pillars";
import {
  ASSESSMENT_OPTIONS,
  ASSESSMENT_STEPS,
  STEP_LABELS,
  STEP_HINTS,
  type AssessmentAnswers,
} from "@/lib/types";
import { generateCenterProfile } from "@/lib/assessment";
import { saveAssessment, saveProfile } from "@/lib/storage";

type StepKey = (typeof ASSESSMENT_STEPS)[number];

export default function AssessmentPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<AssessmentAnswers>>({});

  const currentStep = ASSESSMENT_STEPS[stepIndex];
  const options = ASSESSMENT_OPTIONS[currentStep];
  const selectedValue = answers[currentStep];
  const isLastStep = stepIndex === ASSESSMENT_STEPS.length - 1;
  const scanProgress = Math.round(((stepIndex + 1) / ASSESSMENT_STEPS.length) * 100);

  function handleSelect(value: AssessmentAnswers[StepKey]) {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }));
  }

  function handleNext() {
    if (!selectedValue) return;

    if (isLastStep) {
      const complete = answers as AssessmentAnswers;
      const profile = generateCenterProfile(complete);
      saveAssessment(complete);
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
    <PageShell
      title="System Scan"
      subtitle="You are entering the map. Each answer reveals more of your internal landscape, positional sphere, and distorted signal."
      backHref="/"
      maxWidth="2xl"
    >
      <FogIndicator
        metrics={{
          ...DEFAULT_FOG,
          fogClearedPercent: Math.max(3, Math.round(scanProgress * 0.08)),
          newSignalsDetected: stepIndex,
        }}
        compact
      />

      <div className="mt-6">
        <ProgressBar
          current={stepIndex + 1}
          total={ASSESSMENT_STEPS.length}
          label="Scan progress"
        />
      </div>

      <div className="mt-10">
        <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">
          Scan point {stepIndex + 1} of {ASSESSMENT_STEPS.length}
        </p>
        <h2 className="mt-2 font-display text-2xl text-mbn-white">{STEP_LABELS[currentStep]}</h2>
        {STEP_HINTS[currentStep] && (
          <p className="mt-2 text-sm text-electric-primary/80">{STEP_HINTS[currentStep]}</p>
        )}
        <p className="mt-2 text-sm text-mbn-steel-dim">Select the signal that fits best</p>

        <div className="mt-6 space-y-3">
          {options.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`option-card ${isSelected ? "option-card-selected" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isSelected ? "border-electric-primary bg-electric-primary" : "border-white/20"
                    }`}
                  >
                    {isSelected && (
                      <svg className="h-3 w-3 text-mbn-bg" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-mbn-white">{option.label}</p>
                    <p className="mt-0.5 text-sm text-mbn-steel-dim">{option.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
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
            onClick={handleNext}
            disabled={!selectedValue}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLastStep ? "Generate Center Profile" : "Continue Scan"}
          </button>
        </div>
      </div>
    </PageShell>
  );
}
