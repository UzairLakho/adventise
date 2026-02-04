import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, SectionHeading } from "@/components/ui";
import { services } from "@/lib/site-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) {
    return { title: "Service" };
  }
  return {
    title: service.title,
    description: service.summary,
  };
}

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) {
    notFound();
  }

  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Service"
                title={service.hero.title}
                description={service.hero.subtitle}
              />
              <p className="text-base text-slate">{service.summary}</p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contact">Book a strategy call</Button>
                <Button href="/results" variant="secondary">
                  See results
                </Button>
              </div>
            </div>
            <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                Typical outcomes
              </p>
              <ul className="mt-4 space-y-3 text-sm text-ink">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Deliverables"
              title="What you get in the first 90 days"
              description="A focused set of improvements and launches to create momentum quickly."
            />
          </div>
          <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
            <ul className="space-y-3 text-sm text-ink">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-mint" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Process"
            title="A sprint-based delivery model"
            description="We organize every engagement around clear outcomes, learnings, and next best actions."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Diagnose",
                text: "Audit performance, align on goals, and map conversion priorities.",
              },
              {
                title: "Build",
                text: "Launch campaigns, creative, and conversion upgrades with tracking in place.",
              },
              {
                title: "Scale",
                text: "Iterate weekly, shift budgets, and expand what is working.",
              },
            ].map((step) => (
              <div key={step.title} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-slate">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 rounded-[32px] border border-line bg-ink p-12 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Ready to move
            </p>
            <h2 className="text-3xl font-semibold">
              Let us build your {service.title.toLowerCase()} roadmap.
            </h2>
            <p className="text-sm text-white/80">
              We start with a strategy sprint and launch quickly with measurable
              outcomes.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/contact" className="w-full justify-center">
              Request a proposal
            </Button>
            <Button
              href="/services"
              variant="secondary"
              className="w-full justify-center"
            >
              Back to services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
