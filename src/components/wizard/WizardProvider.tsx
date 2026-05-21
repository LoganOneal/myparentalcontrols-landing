"use client";

import { Suspense, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { WaitlistWizard } from "./WaitlistWizard";
import type { WizardStep } from "@/types/wizard";

type WizardContextValue = {
  open: boolean;
  initialStep: WizardStep;
  openWizard: (step?: WizardStep) => void;
  closeWizard: () => void;
};

const WizardContext = createContext<WizardContextValue | null>(null);

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside <WizardProvider>");
  return ctx;
}

function WizardProviderInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [initialStep, setInitialStep] = useState<WizardStep>(1);

  useEffect(() => {
    if (searchParams.get("wizard") === "open") {
      const stepParam = Number(searchParams.get("step") ?? 1);
      const step = (stepParam >= 1 && stepParam <= 5 ? stepParam : 1) as WizardStep;
      setInitialStep(step);
      setOpen(true);
    }
  }, [searchParams]);

  const openWizard = useCallback((step: WizardStep = 1) => {
    setInitialStep(step);
    setOpen(true);
  }, []);

  const closeWizard = useCallback(() => setOpen(false), []);

  return (
    <WizardContext.Provider value={{ open, initialStep, openWizard, closeWizard }}>
      {children}
      <WaitlistWizard
        open={open}
        initialStep={initialStep}
        onClose={closeWizard}
      />
    </WizardContext.Provider>
  );
}

export function WizardProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <WizardProviderInner>{children}</WizardProviderInner>
    </Suspense>
  );
}
