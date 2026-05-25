export type FunnelStepType =
  | "single-select"
  | "multi-select"
  | "age-select"
  | "email-capture"
  | "loading-interstitial"
  | "summary";

export type FunnelOption = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  emoji?: string;
};

export type FunnelCondition = {
  stepId: string;
  selectedIds: string[];
};

export type FunnelStep = {
  id: string;
  type: FunnelStepType;
  title: string;
  subtitle?: string;
  tip?: string;
  footer?: "reviews";
  options?: FunnelOption[];
  min?: number;
  max?: number;
  showIf?: FunnelCondition;
  skipIf?: FunnelCondition;
  interstitialMessages?: string[];
  interstitialDuration?: number;
};

export type FunnelAnswers = Record<string, string[]>;

export type FunnelConfig = {
  steps: FunnelStep[];
  brandColor: string;
  brandColorHover: string;
};
