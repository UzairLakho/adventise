import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import { values } from "@/lib/site-data";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how Adventise helps local businesses grow through Google Maps, local SEO, and better websites.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="About"
            title="Local growth help for businesses that need more calls, not more fluff"
            description="Adventise is focused on local visibility, Google Business Profile optimization, and conversion-focused websites for service businesses."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 text-sm text-slate">
            <p>
              We built Adventise around a simple idea: most local businesses do
              not need a bloated marketing plan. They need to show up when the
              right people search, earn trust quickly, and make it easy for
              those people to call or request a quote.
            </p>
            <p>
              That is why our work stays centered on Google Maps, local SEO,
              service-area pages, reviews, and websites that support real local
              demand. Whether you already have a website, a Google Business
              Profile, both, or neither, we focus on the clearest next step.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              What we help with
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                Google Business Profile setup and optimization
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                Local SEO and service-area content planning
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                Websites and landing pages built for local conversion
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                Reviews, citations, and trust-signal improvements
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl space-y-10 px-6 py-20">
          <SectionHeading
            eyebrow="Values"
            title="How we keep the work useful"
            description="These principles help us stay practical, honest, and focused on what matters."
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

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
          <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[32px] border-4 border-line bg-white shadow-soft">
            <Image
              src="/uzair-photo.png"
              alt="Uzair Ahmed Lakho"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 280px"
              id="about-founder-image"
            />
          </div>
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Founder"
              title="Uzair Ahmed Lakho"
              description="Founder & Lead SEO Consultant"
            />
            <p className="text-sm text-slate leading-relaxed">
              Uzair Ahmed Lakho founded Adventise to bridge the gap between service-based businesses and their local customers. Under his leadership, Adventise simplifies local search strategy, helping service providers get real phone calls and quote requests.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div className="rounded-2xl border border-line bg-white p-4">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate">Direct Phone</span>
                <a href="tel:+923136677628" className="font-semibold text-ink hover:text-ember transition-colors" id="about-founder-phone">+92 313 6677628</a>
              </div>
              <div className="rounded-2xl border border-line bg-white p-4">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate">Direct Email</span>
                <a href="mailto:uzairlakho16@gmail.com" className="font-semibold text-ink hover:text-ember transition-colors" id="about-founder-email">uzairlakho16@gmail.com</a>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/founder" id="about-founder-profile-btn">View Founder Profile</Button>
              <a 
                href="https://www.facebook.com/UzairAhmed2/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:-translate-y-0.5 hover:border-ember hover:text-ember transition-all"
                id="about-founder-facebook"
              >
                Facebook Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 rounded-[32px] border border-line bg-ink p-12 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Start here
            </p>
            <h2 className="text-3xl font-semibold">
              Tell us where local visibility is breaking down.
            </h2>
            <p className="text-sm text-white/80">
              We will review your setup and point you toward the clearest next
              step, whether that is Maps, website SEO, or a stronger local
              funnel.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/#audit-form" className="w-full justify-center">
              Request a free audit
            </Button>
            <Button href="/contact" variant="secondary" className="w-full justify-center">
              Talk through your market
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
