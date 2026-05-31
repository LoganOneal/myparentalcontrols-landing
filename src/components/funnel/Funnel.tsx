"use client";

import { useCallback, useState } from "react";
import type {
  FunnelAnswers,
  FunnelCompletion,
  FunnelConfig,
  FunnelStep,
} from "@/types/funnel";
import type { CreateWaitlistResponse } from "@/types/wizard";
import { KodaLogo } from "@/components/icons";
import { FunnelProgress } from "./FunnelProgress";
import { StepSingleSelect } from "./StepSingleSelect";
import { StepMultiSelect } from "./StepMultiSelect";
import { StepLoadingInterstitial } from "./StepLoadingInterstitial";
import { StepEmailCapture } from "./StepEmailCapture";
import { StepSummary } from "./StepSummary";
import { StepValueProp } from "./StepValueProp";
import { StepCoverageExplainer } from "./StepCoverageExplainer";
import { StepProductShowcase } from "./StepProductShowcase";
import { ArrowLeft } from "lucide-react";

function shouldShowStep(step: FunnelStep, answers: FunnelAnswers): boolean {
  if (step.showIf) {
    const answered = answers[step.showIf.stepId] ?? [];
    const hasMatch = step.showIf.selectedIds.some((id) => answered.includes(id));
    if (!hasMatch) return false;
  }
  if (step.skipIf) {
    const answered = answers[step.skipIf.stepId] ?? [];
    const hasMatch = step.skipIf.selectedIds.some((id) => answered.includes(id));
    if (hasMatch) return false;
  }
  return true;
}

function getVisibleSteps(config: FunnelConfig, answers: FunnelAnswers): FunnelStep[] {
  return config.steps.filter((step) => shouldShowStep(step, answers));
}

export function Funnel({
  config,
  onComplete,
}: {
  config: FunnelConfig;
  onComplete: (completion: FunnelCompletion) => void;
}) {
  const [answers, setAnswers] = useState<FunnelAnswers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [waitlistRecord, setWaitlistRecord] =
    useState<CreateWaitlistResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const visibleSteps = getVisibleSteps(config, answers);
  const currentStep = visibleSteps[currentIndex];
  const NON_QUESTION_TYPES = ["loading-interstitial", "value-prop", "coverage-explainer", "product-showcase", "summary"];
  const totalQuestionSteps = visibleSteps.filter(
    (s) => !NON_QUESTION_TYPES.includes(s.type)
  ).length;
  const currentQuestionIndex = visibleSteps
    .slice(0, currentIndex)
    .filter((s) => !NON_QUESTION_TYPES.includes(s.type))
    .length;

  const goNext = useCallback(
    (stepId: string, selected: string[]) => {
      const nextAnswers = { ...answers, [stepId]: selected };
      setAnswers(nextAnswers);
      const nextVisible = getVisibleSteps(config, nextAnswers);
      const currentIdx = nextVisible.findIndex((s) => s.id === stepId);
      if (currentIdx < nextVisible.length - 1) {
        setCurrentIndex(currentIdx + 1);
        window.scrollTo(0, 0);
      }
    },
    [answers, config]
  );

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleInterstitialComplete = useCallback(() => {
    if (!currentStep) return;
    const nextVisible = getVisibleSteps(config, answers);
    const currentIdx = nextVisible.findIndex((s) => s.id === currentStep.id);
    if (currentIdx < nextVisible.length - 1) {
      setCurrentIndex(currentIdx + 1);
      window.scrollTo(0, 0);
    }
  }, [answers, config, currentStep]);

  const handleEmailSubmit = async (emailValue: string) => {
    setEmail(emailValue);
    setSubmitting(true);
    setError(null);
    try {
      const { joinWaitlist } = await import("@/lib/waitlist-client");
      const result = await joinWaitlist(emailValue);
      setWaitlistRecord(result);
      if (!currentStep) return;
      const nextVisible = getVisibleSteps(config, answers);
      const currentIdx = nextVisible.findIndex((s) => s.id === currentStep.id);
      if (currentIdx < nextVisible.length - 1) {
        setCurrentIndex(currentIdx + 1);
        window.scrollTo(0, 0);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGetStarted = () => {
    if (!waitlistRecord) {
      setError("Please enter your email before continuing.");
      return;
    }
    onComplete({
      answers,
      email,
      recordId: waitlistRecord.recordId,
      position: waitlistRecord.position,
      completedAt: new Date().toISOString(),
    });
  };

  if (!currentStep) return null;

  const showBackButton = currentIndex > 0 && !["loading-interstitial", "value-prop", "summary"].includes(currentStep.type);
  const showProgress = !["loading-interstitial", "value-prop", "coverage-explainer", "product-showcase"].includes(currentStep.type);
  const gameOptions =
    config.steps.find((step) => step.id === "online-spaces")?.options ?? [];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FAFBFC]">
      <header className="sticky top-0 z-10 bg-[#FAFBFC]/90 backdrop-blur-md border-b border-gray-100/80">
        <div className="max-w-[640px] mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-[44px]">
            {showBackButton ? (
              <button
                type="button"
                onClick={goBack}
                aria-label="Back"
                className="-ml-2 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <KodaLogo height={28} />
            )}
          </div>
          <div className="flex-1 flex justify-center">
            {showProgress && (
              <FunnelProgress
                current={currentQuestionIndex + 1}
                total={totalQuestionSteps}
                brandColor={config.brandColor}
              />
            )}
          </div>
          <div className="min-w-[44px]" aria-hidden />
        </div>
      </header>

      <main className="flex-1 flex items-stretch sm:items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-[520px] flex flex-col min-h-[480px]">
          {currentStep.type === "single-select" && (
            <StepSingleSelect
              key={currentStep.id}
              title={currentStep.title}
              subtitle={currentStep.subtitle}
              tip={currentStep.tip}
              footer={currentStep.footer}
              options={currentStep.options ?? []}
              defaultValue={answers[currentStep.id]?.[0]}
              brandColor={config.brandColor}
              onNext={(selected) => goNext(currentStep.id, selected)}
            />
          )}
          {currentStep.type === "multi-select" && (
            <StepMultiSelect
              key={currentStep.id}
              title={currentStep.title}
              subtitle={currentStep.subtitle}
              options={currentStep.options ?? []}
              defaultValue={answers[currentStep.id]}
              min={currentStep.min}
              brandColor={config.brandColor}
              onNext={(selected) => goNext(currentStep.id, selected)}
            />
          )}
          {currentStep.type === "value-prop" && (
            <StepValueProp
              key={currentStep.id}
              brandColor={config.brandColor}
              onNext={handleInterstitialComplete}
            />
          )}
          {currentStep.type === "coverage-explainer" && (
            <StepCoverageExplainer
              key={currentStep.id}
              answers={answers}
              gameOptions={gameOptions}
              brandColor={config.brandColor}
              onNext={handleInterstitialComplete}
            />
          )}
          {currentStep.type === "product-showcase" && (
            <StepProductShowcase
              key={currentStep.id}
              answers={answers}
              gameOptions={gameOptions}
              brandColor={config.brandColor}
              onNext={handleInterstitialComplete}
            />
          )}
          {currentStep.type === "loading-interstitial" && (
            <StepLoadingInterstitial
              key={currentStep.id}
              title={currentStep.title}
              messages={currentStep.interstitialMessages}
              duration={currentStep.interstitialDuration}
              brandColor={config.brandColor}
              onComplete={handleInterstitialComplete}
            />
          )}
          {currentStep.type === "email-capture" && (
            <StepEmailCapture
              key={currentStep.id}
              title={currentStep.title}
              subtitle={currentStep.subtitle}
              defaultValue={email}
              brandColor={config.brandColor}
              submitting={submitting}
              error={error}
              onSubmit={handleEmailSubmit}
            />
          )}
          {currentStep.type === "summary" && (
            <StepSummary
              key={currentStep.id}
              title={currentStep.title}
              subtitle={currentStep.subtitle}
              answers={answers}
              steps={config.steps}
              brandColor={config.brandColor}
              onGetStarted={handleGetStarted}
              submitting={submitting}
            />
          )}
        </div>
      </main>
    </div>
  );
}
