export type WizardStep = 1 | 2 | 3 | 4 | 5;

export type WizardFormData = {
  email: string;
  kidsCount?: number;
  kidsAges?: number[];
  games?: string[];
  concerns?: string[];
};

export type WaitlistRecord = {
  id: string;
  fields: {
    Email?: string;
    "Kids Count"?: number;
    "Kids Ages"?: string;
    Games?: string[];
    Concerns?: string;
    Position?: number;
    "Paid Skip"?: boolean;
    "Premium Position"?: number;
    "Stripe Session ID"?: string;
    "Quiz Answers"?: string;
  };
};

export type CreateWaitlistResponse = {
  recordId: string;
  position: number;
};
