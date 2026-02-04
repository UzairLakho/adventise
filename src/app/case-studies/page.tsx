import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import { caseStudies } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore composite case studies and growth outcomes from Adventise engagements.",
};

export default function CaseStudiesPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Case studies"
            title="Growth outcomes backed by measurable wins"
            description="A snapshot of how our strategy, creative, and media programs unlock revenue."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 py-20">
        {caseStudies.map((study) => (
          <div
            key={study.title}
            className="grid gap-6 rounded-3xl border border-line bg-white p-8 shadow-soft lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                {study.industry}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">{study.title}</h3>
              <p className="mt-3 text-sm text-slate">{study.summary}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-ink">
                {study.results.map((result) => (
                  <span key={result} className="rounded-full bg-sand px-3 py-1">
                    {result}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-sand p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                Engagement focus
              </p>
              <ul className="mt-4 space-y-3 text-sm text-ink">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  Channel strategy and budget planning
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  Landing page and CRO upgrades
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  Weekly performance optimization
                </li>
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 rounded-[32px] border border-line bg-ink p-12 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Next steps
            </p>
            <h2 className="text-3xl font-semibold">
              Let's build a case study with your brand.
            </h2>
            <p className="text-sm text-white/80">
              Share your goals and we will put a measurable plan together.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/contact" className="w-full justify-center">
              Start the conversation
            </Button>
            <Button
              href="/services"
              variant="secondary"
              className="w-full justify-center"
            >
              Explore services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

