import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import { testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Hear from growth leaders who partner with Adventise.",
};

export default function TestimonialsPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Testimonials"
            title="Partnerships built on trust and results"
            description="We embed with your team, move quickly, and report the metrics that matter."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
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
              Ready to start
            </p>
            <h2 className="text-3xl font-semibold">Let's map your growth plan.</h2>
            <p className="text-sm text-white/80">
              Book a strategy call and we will outline the fastest path to impact.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/contact" className="w-full justify-center">
              Book a strategy call
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

