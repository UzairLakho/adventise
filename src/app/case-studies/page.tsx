import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import { caseStudies } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore representative local SEO and Google Maps scenarios for service businesses.",
};

export default function CaseStudiesPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Case studies"
            title="Representative local-business scenarios, not padded agency theater"
            description="These composite examples show the kinds of local visibility issues we help solve and the types of outcomes local businesses usually care about most."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 py-20">
        {caseStudies.map((study) => (
          <div
            key={study.title}
            className="grid gap-6 rounded-3xl border border-line bg-white p-8 shadow-soft lg:grid-cols-[1.08fr_0.92fr]"
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
                Typical engagement focus
              </p>
              <ul className="mt-4 space-y-3 text-sm text-ink">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  Local search and map visibility review
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  Website, service-page, and conversion improvements
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  Trust-signal, review, and profile optimization
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
              Next step
            </p>
            <h2 className="text-3xl font-semibold">
              Let&apos;s identify which local scenario your business is closest to.
            </h2>
            <p className="text-sm text-white/80">
              We will look at your market, your current presence, and the first
              changes that are most likely to improve local lead flow.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/#audit-form" className="w-full justify-center">
              Request a free audit
            </Button>
            <Button href="/services" variant="secondary" className="w-full justify-center">
              Explore services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
