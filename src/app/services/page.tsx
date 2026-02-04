import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card, SectionHeading } from "@/components/ui";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Adventise services across SEO, paid media, social growth, web design, CRO, and creative.",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Services"
            title="Pick the growth levers that matter most"
            description="From foundational SEO to full-funnel performance media, we build a plan aligned to revenue, CAC, and LTV."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Card key={service.slug} title={service.title} description={service.summary}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm font-semibold text-ember"
                >
                  View service
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 rounded-[32px] border border-line bg-white p-12 shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              Engagement model
            </p>
            <h2 className="text-3xl font-semibold text-ink">
              Strategy sprint + execution pods
            </h2>
            <p className="text-sm text-slate">
              Every engagement starts with a strategy sprint, then we deploy a
              pod built around your goals: media, creative, and optimization.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/contact" className="w-full justify-center">
              Build my plan
            </Button>
            <Button
              href="/results"
              variant="secondary"
              className="w-full justify-center"
            >
              See results
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
