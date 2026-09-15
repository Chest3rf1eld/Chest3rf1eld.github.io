export type Language = 'en' | 'ru';

export type WorkItem = {
  slug: string;
  title: string;
  priority: string;
  url: string;
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
  stack: { title: string; html: string };
  contact: { title: string; html: string };
  work: readonly WorkItem[];
};
