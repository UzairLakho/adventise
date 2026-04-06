import type { Metadata } from "next";

type SearchParamValue = string | string[] | undefined;

export const metadata: Metadata = {
  title: "Free Google Maps & Website Audit for Contractors",
  description:
    "A Reddit-first audit for contractors who want more calls from Google Maps and a website that stops leaking jobs.",
  robots: {
    index: false,
    follow: false,
  },
};

function getSearchParam(value: SearchParamValue) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

const painBullets = [
  "You know competitors with worse crews, worse websites, and worse reviews are still showing up above you.",
  "Your trucks should be on the road because phones are ringing, not because a weaker company won the Google Maps spot.",
  "If someone clicks through to your site and still does not call, there is usually a fixable leak in the page, message, or call path.",
  "This audit is built to show where jobs are slipping away before you spend money on the wrong thing.",
];

const auditValue = [
  {
    title: "Map-pack breakdown",
    text: "We show where you are losing ground in Google Maps, what competitors are doing better, and what is suppressing your visibility.",
  },
  {
    title: "Google Business Profile teardown",
    text: "We review categories, services, service areas, reviews, photos, and profile strength so you know what needs to be fixed first.",
  },
  {
    title: "Website conversion check",
    text: "We look at whether your site makes it easy for a homeowner or buyer to trust you, understand the offer, and call.",
  },
  {
    title: "Straight priority list",
    text: "You get the next moves in order, so you know what is worth doing now versus what can wait.",
  },
];

const trustPoints = [
  {
    title: "Built for contractors, not marketing tourists",
    text: "This page is for contractors who are busy, skeptical, and tired of vague marketing talk. The goal is simple: show you what is costing you calls.",
  },
  {
    title: "No generic tool printout",
    text: "The audit is meant to be useful. You should come away knowing what is broken, what a competitor is doing better, and what to fix first.",
  },
  {
    title: "Works even if your setup is messy",
    text: "No website yet? Weak GBP? Old site? Thin service pages? We can still tell you where the real bottleneck is and what the smartest next move looks like.",
  },
];

const auditAssets = [
  {
    title: "Geo-grid visibility snapshot",
    text: "A visual look at where you show up, where you disappear, and how patchy your Maps visibility is around your service area.",
  },
  {
    title: "Google Maps competitor comparison",
    text: "A side-by-side look at what the companies above you are doing better in their profile, reviews, or local setup.",
  },
  {
    title: "Website call-path check",
    text: "A quick review of where your site is making people hesitate, bounce, or fail to call on mobile.",
  },
  {
    title: "Fix-first action list",
    text: "A straight list of what to do first, what can wait, and where you are most likely to get the next lift in calls.",
  },
];

const quickTrust = [
  "Built for contractors",
];

export default async function RedditAuditPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, SearchParamValue>>;
}) {
  const params = searchParams ? await searchParams : {};
  const status = getSearchParam(params.status);
  const errorMessage = getSearchParam(params.errorMessage);
  const company = getSearchParam(params.company);
  const trade = getSearchParam(params.trade);
  const location = getSearchParam(params.location);
  const website = getSearchParam(params.website);
  const email = getSearchParam(params.email);
  const isError = status === "error";

  return (
    <div className="bg-noise">
      <section className="relative overflow-hidden">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-ember/20 blur-3xl" />
        <div className="absolute -right-12 top-0 h-72 w-72 rounded-full bg-mint/20 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-10 lg:pb-20 lg:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div
              id="reddit-audit-form"
              className="rounded-[32px] border border-line bg-white p-6 shadow-soft sm:p-8 lg:order-2"
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                    Free Google Maps & Website Audit
                  </p>
                  <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
                    We will show you where jobs are leaking.
                  </h2>
                  <p className="text-sm text-slate">
                    Quick, straight, and built for contractors. We look at your
                    Google Maps position, your profile, your website, and where
                    the next calls are being lost.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-semibold text-ink">
                  {quickTrust.map((item) => (
                    <span key={item} className="rounded-full bg-ivory px-3 py-2">
                      {item}
                    </span>
                  ))}
                </div>

                {isError ? (
                  <div className="rounded-2xl border border-ember/30 bg-sand px-4 py-3 text-sm text-ink">
                    {errorMessage ||
                      "We could not submit your audit request just yet. Please review the form and try again."}
                  </div>
                ) : null}

                <form action="/api/contact" method="post" className="space-y-4">
                  <input type="hidden" name="intent" value="local-audit" />
                  <input type="hidden" name="source" value="reddit-contractorsus" />
                  <input type="hidden" name="auditType" value="both" />
                  <input
                    type="hidden"
                    name="goals"
                    value="Reddit free Google Maps and website audit request"
                  />
                  <input type="hidden" name="redirectTo" value="/reddit" />
                  <input type="hidden" name="successRedirectTo" value="/reddit/thank-you" />
                  <input
                    type="text"
                    name="faxNumber"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                    Business name
                    <input
                      type="text"
                      name="company"
                      required
                      defaultValue={company}
                      placeholder="North Dallas Roofing"
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate/70 focus:border-ember"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                    What trade are you in?
                    <input
                      type="text"
                      name="trade"
                      required
                      defaultValue={trade}
                      placeholder="Roofing, HVAC, plumbing, electrical"
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate/70 focus:border-ember"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                    Main city or service area
                    <input
                      type="text"
                      name="location"
                      required
                      defaultValue={location}
                      placeholder="Dallas, Fort Worth, Plano"
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate/70 focus:border-ember"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                    Website or Google Business Profile link
                    <input
                      type="url"
                      name="website"
                      defaultValue={website}
                      placeholder="Optional if you have one"
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate/70 focus:border-ember"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                    Best email for the audit
                    <input
                      type="email"
                      name="email"
                      required
                      defaultValue={email}
                      placeholder="you@company.com"
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate/70 focus:border-ember"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-dark"
                  >
                    Show Me What&apos;s Costing Me Jobs
                  </button>
                  <p className="text-center text-xs text-slate">
                    Takes about 30 seconds. No cold-call circus. No generic
                    PDF dump. If we do not see real upside, we will tell you.
                  </p>
                </form>
              </div>
            </div>

            <div className="space-y-8 lg:order-1">
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                  For r/contractorsUS members
                </span>
                <h1 className="max-w-3xl text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
                  Worse contractors are beating you on Google and taking the
                  calls.
                </h1>
                <p className="max-w-2xl text-lg text-slate sm:text-xl">
                  We do a free Google Maps, Google Business Profile, and
                  website audit for contractors so you can see exactly why
                  weaker competitors are outranking you, why phones are not
                  ringing enough, and what to fix first.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  "Google Maps and GBP review",
                  "Website call-path teardown",
                  "Straight fix-first action list",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-line bg-white/90 px-4 py-4 text-sm font-semibold text-ink shadow-soft"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="rounded-[28px] border border-line bg-white/90 p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                  What this is really for
                </p>
                <ul className="mt-4 space-y-3 text-sm text-ink">
                  {painBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                Why this converts better than a normal contact form
              </p>
              <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
                The free audit is the product.
              </h2>
              <p className="text-sm text-slate sm:text-base">
                Busy contractors do not want a pitch disguised as help. This
                works because the audit itself has value: it shows where the
                leak is, what a competitor is doing better, and what should be
                fixed first if you want more calls.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {auditValue.map((item) => (
                <div key={item.title} className="rounded-3xl border border-line bg-ivory p-5">
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl space-y-10 px-6 py-20">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              Trust and proof
            </p>
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
              Why this offer makes sense for contractors
            </h2>
            <p className="max-w-3xl text-sm text-slate sm:text-base">
              This is meant to feel like a useful field check, not a polished
              sales trap. The audit should leave you with a clear read on where
              jobs are slipping away.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {trustPoints.map((item) => (
              <div key={item.title} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-slate">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              What you should expect inside the audit
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {auditAssets.map((item) => (
                <div key={item.title} className="rounded-2xl border border-line bg-ivory px-5 py-5">
                  <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              What we are looking for
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Why a weaker competitor is showing up above you in Google Maps",
                "Why your profile is not turning views into calls",
                "Why your website is leaking mobile leads",
                "Why your service pages are not backing up the markets you want to win",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-line bg-ivory px-5 py-5">
                  <p className="text-sm font-semibold text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 rounded-[32px] border border-line bg-ink p-8 text-white shadow-soft sm:p-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              For busy contractors
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              If you want more calls, start with the leak.
            </h2>
            <p className="text-sm text-white/80">
              We are not going to bury you in jargon. We will show you where a
              worse competitor is beating you and what should be fixed first.
            </p>
          </div>
          <div className="space-y-4">
            <a
              href="#reddit-audit-form"
              className="inline-flex w-full items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-dark"
            >
              Get My Free Audit
            </a>
            <p className="text-xs text-white/70">
              Built specifically for r/contractorsUS members.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
