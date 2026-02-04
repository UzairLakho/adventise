import Link from "next/link";
import type { ReactNode } from "react";

const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200";

const variants = {
  primary:
    "bg-ember text-white shadow-soft hover:-translate-y-0.5 hover:bg-ember-dark",
  secondary:
    "border border-line bg-white text-ink hover:-translate-y-0.5 hover:border-ember hover:text-ember",
  ghost: "text-ink hover:text-ember",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link href={href} className={`${baseButton} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <Badge>{eyebrow}</Badge>
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
        {description ? (
          <p className="text-base text-slate sm:text-lg">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

export function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-ink">{title}</h3>
        {description ? <p className="text-sm text-slate">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
