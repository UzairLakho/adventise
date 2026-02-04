import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import { values } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Adventise and how we partner with growth teams.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="About"
            title="We build performance engines with heart"
            description="Adventise is a senior team of strategists, creatives, and performance marketers. We value clarity, speed, and measurable outcomes."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 text-sm text-slate">
            <p>
              We partner with ambitious brands to align marketing with revenue.
              Our approach blends insight, creative craft, and performance rigor
              so growth feels predictable, not chaotic.
            </p>
            <p>
              From strategy sprints to ongoing optimization, we build systems
              that scale with your team. We are hands-on, direct, and committed
              to doing the work that moves the needle.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              Core disciplines
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                Strategy, insights, and forecasting
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                Creative direction and production
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                Paid media, SEO, and CRO
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                Analytics, dashboards, and experimentation
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl space-y-10 px-6 py-20">
          <SectionHeading
            eyebrow="Values"
            title="What keeps our work honest"
            description="These principles guide every engagement."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm text-slate">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 rounded-[32px] border border-line bg-ink p-12 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Work with us
            </p>
            <h2 className="text-3xl font-semibold">Let's build your growth engine.</h2>
            <p className="text-sm text-white/80">
              Talk to our team about your goals, channels, and next milestones.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/contact" className="w-full justify-center">
              Start a conversation
            </Button>
            <Button href="/careers" variant="secondary" className="w-full justify-center">
              View careers
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

