import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import { SeoAuditForm } from "@/components/seo-audit-form";

export const metadata: Metadata = {
  title: "Local SEO & Google Maps Growth for Local Service Businesses",
  description:
    "Adventise helps contractors, plumbers, accountants, and other local businesses get more calls from Google Search and Maps.",
};

type SearchParamValue = string | string[] | undefined;

function getSearchParam(value: SearchParamValue) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

const businessTypes = [
  "Contractors",
  "Plumbers",
  "Accountants",
  "Electricians",
  "Roofers",
  "Home service teams",
];

const painPoints = [
  {
    title: "You are missing from the map pack",
    text: "When people search for your service in your area, the calls go to competitors because your Google Business Profile is weak, incomplete, or unclaimed.",
  },
  {
    title: "Your website is not helping enough",
    text: "Even when people do find you, the site often lacks focused service pages, trust signals, and clear calls to action that turn visitors into leads.",
  },
  {
    title: "Your local signals are inconsistent",
    text: "Categories, reviews, citations, service areas, and on-page location signals do not line up, so Google has less confidence in showing you.",
  },
];

const pathways = [
  {
    title: "You have a website and a GBP",
    text: "We tighten the foundations, improve local relevance, and turn what you already have into a stronger lead engine.",
  },
  {
    title: "You have a website but no GBP",
    text: "We help you launch, verify, and optimize your Google Business Profile so you can compete in Maps as well as organic search.",
  },
  {
    title: "You have a GBP but no website",
    text: "We build a simple, conversion-focused website or landing pages that support rankings and give customers somewhere credible to convert.",
  },
  {
    title: "You have neither yet",
    text: "We can build the whole local foundation: Google Business Profile, a lean website, core pages, and the first visibility sprint.",
  },
];

const auditIncludes = [
  "Google Business Profile review",
  "Local keyword and map-pack benchmark",
  "Website and service-page review",
  "Citation and consistency check",
  "Competitor gap snapshot",
  "A practical priority list for the next 30 to 90 days",
];

const process = [
  {
    title: "1. Diagnose the local demand gap",
    text: "We review your market, service area, current visibility, and where local leads are leaking right now.",
  },
  {
    title: "2. Fix the foundation first",
    text: "We focus on the changes with the fastest payoff, from GBP optimization to location pages, internal links, and conversion upgrades.",
  },
  {
    title: "3. Build repeatable local momentum",
    text: "Once the base is solid, we expand into review acquisition, citation cleanup, content, and market-by-market growth.",
  },
];

const offers = [
  {
    title: "Google Business Profile optimization",
    text: "Category strategy, service setup, offer positioning, posting cadence, photo planning, and review workflows.",
  },
  {
    title: "Local SEO and service-area pages",
    text: "Page structure, on-page optimization, internal linking, schema, and location-driven content built around buyer intent.",
  },
  {
    title: "Reviews, citations, and trust signals",
    text: "We strengthen local authority by cleaning up signals that influence both rankings and conversion trust.",
  },
  {
    title: "Simple sites that convert local traffic",
    text: "If you need a website or landing page refresh, we build clean pages that support rankings and drive calls or quote requests.",
  },
];

const differentiators = [
  "Built for local service businesses, not bloated vanity-marketing retainers.",
  "Clear priorities tied to calls, quote requests, and booked jobs.",
  "Practical help whether you already have a website, a GBP, both, or neither.",
];

const faqs = [
  {
    question: "Can you help if I do not have a website yet?",
    answer:
      "Yes. We can start with your Google Business Profile and build a simple website or landing pages when that becomes the next bottleneck.",
  },
  {
    question: "What if I have a website but no Google Business Profile?",
    answer:
      "That is common. We can help you create, verify, and optimize your profile so you can compete in Maps as well as organic search.",
  },
  {
    question: "Do you only work with one-location businesses?",
    answer:
      "No. We can help single-location businesses, home-service businesses with broad service areas, and multi-location companies.",
  },
  {
    question: "How quickly can local SEO or Maps improve?",
    answer:
      "Some foundational fixes can improve visibility quickly, while stronger local authority and rankings usually build over several months.",
  },
  {
    question: "Will the audit still help if I am not sure what I need?",
    answer:
      "Yes. The audit is designed to clarify whether your biggest issue is Google Maps visibility, your website, local SEO signals, or a missing foundation.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "Usually just your business name, primary city or service area, your website or GBP link if you have one, and what kind of leads you want more of.",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<Record<string, SearchParamValue>>;
}) {
  const params = searchParams ? await searchParams : {};
  const status = getSearchParam(params.status);
  const errorMessage = getSearchParam(params.errorMessage);
  const company = getSearchParam(params.company);
  const email = getSearchParam(params.email);
  const location = getSearchParam(params.location);
  const auditType = getSearchParam(params.auditType);
  const website = getSearchParam(params.website);
  const goals = getSearchParam(params.goals);

  return (
    <div>
      <section className="relative overflow-hidden bg-noise">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-ember/20 blur-3xl" />
        <div className="absolute -right-16 top-8 h-80 w-80 rounded-full bg-mint/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent" />
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 lg:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                Local SEO + Google Maps
              </span>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
                  Get more local calls from Google Search and Maps.
                </h1>
                <p className="max-w-2xl text-lg text-slate sm:text-xl">
                  Adventise helps contractors, plumbers, accountants, and other
                  local businesses show up where customers are already looking.
                  Whether you already have a website, a Google Business
                  Profile, both, or neither, we build the path to more calls,
                  quote requests, and booked jobs.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  "Google Business Profile growth",
                  "Local service-area SEO",
                  "Websites that convert local traffic",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-line bg-white/90 px-4 py-4 text-sm font-semibold text-ink shadow-soft"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Button href="/#audit-form">Get a free audit</Button>
                <Button href="/#how-it-works" variant="secondary">
                  See how it works
                </Button>
              </div>
              <div className="rounded-[28px] border border-line bg-white/90 p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                  Best fit
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-ink">
                  {businessTypes.map((type) => (
                    <span key={type} className="rounded-full bg-sand px-4 py-2">
                      {type}
                    </span>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 text-sm text-slate sm:grid-cols-2">
                  <div className="rounded-2xl border border-line bg-ivory px-4 py-3">
                    No website yet? We can still start with Google Maps and build the right pages after.
                  </div>
                  <div className="rounded-2xl border border-line bg-ivory px-4 py-3">
                    No GBP yet? We can create, verify, and optimize it from scratch.
                  </div>
                </div>
              </div>
            </div>

            <SeoAuditForm
              status={status}
              errorMessage={errorMessage}
              defaults={{ company, email, location, auditType, website, goals }}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
            Built for service businesses that need local demand, not vanity traffic
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-ink">
            <span className="rounded-full bg-ivory px-4 py-2">Calls</span>
            <span className="rounded-full bg-ivory px-4 py-2">Quote requests</span>
            <span className="rounded-full bg-ivory px-4 py-2">Booked jobs</span>
            <span className="rounded-full bg-ivory px-4 py-2">Map visibility</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-6 py-20">
        <SectionHeading
          eyebrow="Why local leads stall"
          title="Most local businesses do not need more random traffic. They need better visibility and a clearer path to contact."
          description="If customers cannot find you in Maps, trust what they see, or land on pages built for their location and service, the lead goes elsewhere."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {painPoints.map((item) => (
            <div key={item.title} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm text-slate">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand" id="starting-point">
        <div className="mx-auto max-w-6xl space-y-12 px-6 py-20">
          <SectionHeading
            eyebrow="Start Where You Are"
            title="Whether you already have a website, a GBP, both, or neither, there is a fastest path forward."
            description="The right plan depends on what is already in place and what is holding back visibility in your market."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {pathways.map((item) => (
              <div key={item.title} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-slate">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionHeading
            eyebrow="Free Audit"
            title="What you get in your SEO and Maps audit"
            description="The audit is built to show you where local visibility is leaking, what matters first, and where the fastest wins usually live."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {auditIncludes.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-line bg-white px-5 py-5 text-sm font-medium text-ink shadow-soft"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory" id="how-it-works">
        <div className="mx-auto max-w-6xl space-y-12 px-6 py-20">
          <SectionHeading
            eyebrow="How It Works"
            title="A simple local-growth funnel from visibility to booked work"
            description="We keep the strategy practical: diagnose the leak, fix the bottleneck, then expand what is already producing calls."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {process.map((item) => (
              <div key={item.title} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-slate">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl space-y-12 px-6 py-20">
          <SectionHeading
            eyebrow="What We Help With"
            title="Hands-on work for the channels local customers actually use"
            description="After the audit, we can support the pieces that move the phone: Google Maps, local SEO, reviews, and conversion-focused pages."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {offers.map((item) => (
              <div key={item.title} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-slate">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 rounded-[32px] border border-line bg-ink p-8 text-white shadow-soft sm:p-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Why Adventise
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Local growth without bloated retainers or vague reporting.
            </h2>
            <div className="space-y-3 text-sm text-white/80">
              {differentiators.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Button href="/#audit-form" className="w-full justify-center">
              Request your free audit
            </Button>
            <Button href="/contact" variant="secondary" className="w-full justify-center">
              Talk about your market
            </Button>
            <p className="text-xs text-white/70">
              Good fit if you want more qualified local leads, not just more impressions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl space-y-10 px-6 py-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions from local-business owners"
            description="Straight answers on websites, Google Business Profiles, and what the audit is meant to uncover."
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
