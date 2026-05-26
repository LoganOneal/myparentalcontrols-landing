export type EditorialContributorType = "Person" | "Organization";

export type EditorialContributorId =
  | "koda-editorial-staff"
  | "koda-trust-safety-review";

export type EditorialContributor = {
  id: EditorialContributorId;
  type: EditorialContributorType;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  url?: string;
  sameAs: string[];
};

export const EDITORIAL_CONTRIBUTORS: Record<
  EditorialContributorId,
  EditorialContributor
> = {
  "koda-editorial-staff": {
    id: "koda-editorial-staff",
    type: "Organization",
    name: "Koda Editorial Staff",
    role: "Family safety research and editorial",
    credentials:
      "Research team focused on parental controls, PC gaming safety, platform policies, and parent-facing safety workflows.",
    bio: "The Koda editorial staff reviews platform help centers, safety policies, child-safety guidance, and parent-facing setup flows before publishing Koda Gaming Parental Controls guides.",
    url: "/blog",
    sameAs: [
      "https://www.linkedin.com/company/kodasafety/",
      "https://www.instagram.com/kodasafety/",
      "https://www.tiktok.com/@kodasafety",
    ],
  },
  "koda-trust-safety-review": {
    id: "koda-trust-safety-review",
    type: "Organization",
    name: "Koda Trust & Safety Review",
    role: "Editorial review",
    credentials:
      "Internal review for safety claims, privacy language, product limitations, and parent-facing recommendations.",
    bio: "Koda Trust & Safety Review checks each guide for clear sourcing, balanced limitations, and advice that supports parent-child conversations instead of secretive monitoring.",
    url: "/safety-privacy",
    sameAs: [
      "https://www.linkedin.com/company/kodasafety/",
      "https://www.instagram.com/kodasafety/",
      "https://www.tiktok.com/@kodasafety",
    ],
  },
};

export function getEditorialContributor(
  id: EditorialContributorId
): EditorialContributor {
  return EDITORIAL_CONTRIBUTORS[id];
}
