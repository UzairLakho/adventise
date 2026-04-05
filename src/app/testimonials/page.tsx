import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import { testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Client Concerns",
  description: "Common issues local-business owners bring to Adventise before a local SEO or Maps cleanup.",
};

export default function TestimonialsPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="What owners say"
            title="The common problems local businesses mention before they ask for help"
            description="These are recurring themes we hear from service businesses before the cleanup starts."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <p className="text-sm text-ink">&ldquo;{item.quote}&rdquo;</p>
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
              Ready to fix yours?
            </p>
            <h2 className="text-3xl font-semibold">
              Let&apos;s figure out what is suppressing your local visibility.
            </h2>
            <p className="text-sm text-white/80">
              We will review your market, profile, website, and trust signals
              so you can see what matters most first.
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
