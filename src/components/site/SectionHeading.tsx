import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </Heading>
      <hr className={`copper-rule mt-6 ${align === "center" ? "mx-auto" : ""}`} />
      {lead && <p className="mt-6 text-base leading-relaxed text-muted-foreground">{lead}</p>}
    </div>
  );
}
