export type Language = 'en' | 'ru';

export type WorkItem = {
  slug: string;
  title: string;
  priority: string;
  order: number;
  url?: string;
  caseUrl?: string;
  redditUrl?: string;
  stack: string;
  html: string;
};

export type CaseItem = {
  slug: string;
  title: string;
  summary: string;
  relatedWorkSlug: string;
  stack: string;
  html: string;
};

export type PageContent = {
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    ctaLabel: string;
    secondaryLabel: string;
    html: string;
  };
  proof: { title: string; html: string };
  freelance: { title: string; html: string };
  stack: { title: string; html: string };
  contact: { title: string; html: string };
  work: readonly WorkItem[];
  cases: readonly CaseItem[];
};
