import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import { caseStudies, stats, testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Results",
  description: "See how Adventise drives measurable growth for modern brands.",
};

export default function ResultsPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Results"
            title="Evidence-backed growth across industries"
            description="We focus on revenue metrics: pipeline, CAC, LTV, and conversion lift. Here are the outcomes we are proud of."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 rounded-[32px] border border-line bg-white p-10 shadow-soft lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-3xl font-semibold text-ink">{stat.value}</p>
              <p className="text-sm text-slate">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl space-y-10 px-6 py-20">
          <SectionHeading
            eyebrow="Case studies"
            title="Strategic wins with measurable impact"
            description="Composite case studies reflecting real engagement patterns and performance improvements."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((study) => (
              <div key={study.title} className="rounded-3xl border border-line bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                  {study.industry}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{study.title}</h3>
                <p className="mt-2 text-sm text-slate">{study.summary}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-ink">
                  {study.results.map((result) => (
                    <span key={result} className="rounded-full bg-sand px-3 py-1">
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Testimonials"
          title="Teams that feel the lift"
          description="We work side-by-side with leadership teams to drive growth that sticks."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-3xl border border-line bg-white p-6">
              <p className="text-sm text-ink">"{item.quote}"</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                {item.name} - {item.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 rounded-[32px] border border-line bg-ink p-12 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Your turn
            </p>
            <h2 className="text-3xl font-semibold">
              Let's map your next growth win.
            </h2>
            <p className="text-sm text-white/80">
              We will build a roadmap aligned to your goals and launch quickly.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/contact" className="w-full justify-center">
              Book a strategy call
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

