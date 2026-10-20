import type { ReactNode } from "react";

import { SectionHeading } from "./SectionHeading";

export function LegalPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} />
      <div className="mt-12 space-y-10 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-copper/50 pl-5">
      <h2 className="font-serif text-xl text-foreground md:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}
