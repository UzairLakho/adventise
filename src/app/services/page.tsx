import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card, SectionHeading } from "@/components/ui";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Adventise services for Google Maps, local SEO, service-area websites, reviews, and local trust signals.",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Services"
            title="Local growth services built around how customers actually find service businesses"
            description="We focus on the channels and assets that shape local demand: Google Maps, local SEO, service-area pages, reviews, and conversion-focused websites."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
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
              How we scope work
            </p>
            <h2 className="text-3xl font-semibold text-ink">
              Start with the bottleneck that is costing you the most local demand
            </h2>
            <p className="text-sm text-slate">
              Some businesses need Google Business Profile help first. Others
              need service pages, review systems, or a better website. We keep
              the plan tight around what is most likely to improve visibility
              and calls.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/#audit-form" className="w-full justify-center">
              Get a free audit
            </Button>
            <Button href="/results" variant="secondary" className="w-full justify-center">
              See how we frame results
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
