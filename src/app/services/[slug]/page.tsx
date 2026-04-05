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
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Service"
                title={service.hero.title}
                description={service.hero.subtitle}
              />
              <p className="text-base text-slate">{service.summary}</p>
              <div className="flex flex-wrap gap-4">
                <Button href="/#audit-form">Get a free audit</Button>
                <Button href="/contact" variant="secondary">
                  Talk through your setup
                </Button>
              </div>
            </div>
            <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                What this service is built to improve
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
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow="Deliverables"
              title="What a focused local sprint usually includes"
              description="The work stays practical and tied to the actual bottleneck, not a bloated checklist."
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
            title="A local-growth workflow built around the next bottleneck"
            description="We start by identifying where visibility or trust is leaking, then concentrate the work there first."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Audit",
                text: "Review your profile, website, service-area signals, and local competitors to see what is suppressing visibility or conversion.",
              },
              {
                title: "Fix",
                text: "Implement the changes most likely to improve your local presence, trust signals, and ability to turn visits into calls.",
              },
              {
                title: "Expand",
                text: "Once the base is stronger, extend what is working into more services, more cities, and better long-term local authority.",
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
              Let&apos;s figure out whether {service.title.toLowerCase()} is your next best move.
            </h2>
            <p className="text-sm text-white/80">
              We will look at your market, your current setup, and what is most
              likely to improve local visibility and lead flow first.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/#audit-form" className="w-full justify-center">
              Request a free audit
            </Button>
            <Button href="/services" variant="secondary" className="w-full justify-center">
              Back to services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
