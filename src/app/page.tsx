import Link from "next/link";
import { Button, Card, SectionHeading } from "@/components/ui";
import { caseStudies, faqs, services, stats, testimonials } from "@/lib/site-data";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-noise">
        <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-ember/20 blur-3xl" />
        <div className="absolute -right-10 top-10 h-72 w-72 rounded-full bg-mint/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              Performance Growth Partner
            </span>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
                Marketing built for measurable revenue.
              </h1>
              <p className="text-lg text-slate sm:text-xl">
                Adventise combines strategy, creative, and performance media to
                help ambitious brands build predictable demand and compounding
                growth.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact">Book a strategy call</Button>
              <Button href="/case-studies" variant="secondary">
                View case studies
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate">
              <div>
                <p className="text-lg font-semibold text-ink">4.8/5</p>
                <p>Client satisfaction</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-ink">150+</p>
                <p>Brands served</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-ink">92%</p>
                <p>Retention rate</p>
              </div>
            </div>
          </div>
          <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                  Growth Plan Snapshot
                </p>
                <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                  90 days
                </span>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-line bg-sand p-4">
                  <p className="text-sm font-semibold text-ink">
                    Funnel conversion lift
                  </p>
                  <p className="text-3xl font-semibold text-ink">+38%</p>
                </div>
                <div className="rounded-2xl border border-line bg-ivory p-4">
                  <p className="text-sm font-semibold text-ink">
                    CAC improvement
                  </p>
                  <p className="text-3xl font-semibold text-ink">-24%</p>
                </div>
                <div className="rounded-2xl border border-line bg-ivory p-4">
                  <p className="text-sm font-semibold text-ink">
                    Qualified pipeline
                  </p>
                  <p className="text-3xl font-semibold text-ink">2.6x</p>
                </div>
              </div>
              <p className="text-xs text-slate">
                Benchmarks are illustrative. We align targets to your unit
                economics in week one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ivory">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-12 text-sm text-slate">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">
            Trusted by growth teams
          </p>
          <div className="flex flex-wrap gap-6 text-sm font-semibold text-ink">
            <span>Northwind Labs</span>
            <span>Ironclad Health</span>
            <span>Brightlane</span>
            <span>SignalBeam</span>
            <span>Atlas Peak</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-6 py-20">
        <SectionHeading
          eyebrow="Services"
          title="Full-funnel marketing for modern growth teams"
          description="Strategy, creative, and media built to move revenue. Choose a focused engagement or a full growth partnership."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card key={service.slug} title={service.title} description={service.summary}>
              <div className="mt-auto">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm font-semibold text-ember"
                >
                  Explore {service.title}
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionHeading
            eyebrow="How we work"
            title="A clear cadence for compounding growth"
            description="We move in focused sprints so you always know what we are shipping, testing, and learning."
          />
          <div className="space-y-6">
            {[
              {
                title: "Sprint 1: Diagnose + Align",
                text: "We clarify goals, audit current performance, and map the fastest path to impact.",
              },
              {
                title: "Sprint 2: Build + Launch",
                text: "Creative, landing pages, and campaigns go live with tracking and dashboards.",
              },
              {
                title: "Sprint 3: Optimize + Scale",
                text: "Weekly tests, budget shifts, and CRO turn early wins into long-term gains.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-slate">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 rounded-[32px] border border-line bg-white p-10 shadow-soft lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-3xl font-semibold text-ink">{stat.value}</p>
              <p className="text-sm text-slate">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl space-y-12 px-6 py-20">
          <SectionHeading
            eyebrow="Case studies"
            title="Proof across B2B, DTC, and multi-location brands"
            description="A glimpse at the outcomes we deliver with aligned strategy, creative, and performance media."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.slice(0, 4).map((study) => (
              <div
                key={study.title}
                className="rounded-3xl border border-line bg-white p-6 shadow-soft"
              >
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
          <Button href="/case-studies" variant="secondary">
            See all case studies
          </Button>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionHeading
            eyebrow="Client voice"
            title="Partners who feel the momentum"
            description="We work like an extension of your team, with accountability and a clear plan every week."
          />
          <div className="space-y-6">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-3xl border border-line bg-white p-6">
                <p className="text-sm text-ink">"{item.quote}"</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                  {item.name} - {item.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 rounded-[32px] border border-line bg-ink p-12 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Growth partnership
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Ready for a marketing engine that compounds?
            </h2>
            <p className="text-sm text-white/80">
              We build an accountable growth plan, execute across channels, and
              report on the outcomes that matter.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/contact" className="w-full justify-center">
              Start your growth plan
            </Button>
            <Button
              href="/services"
              variant="secondary"
              className="w-full justify-center"
            >
              Explore our services
            </Button>
            <p className="text-xs text-white/70">
              Typical launch timeline: 2-4 weeks.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl space-y-10 px-6 py-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers to common growth questions"
            description="Straightforward guidance from our strategy team."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="text-base font-semibold text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm text-slate">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

