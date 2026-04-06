import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Adventise about local SEO, Google Maps, and lead generation for your business.",
};

type SearchParamValue = string | string[] | undefined;

function getSearchParam(value: SearchParamValue) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, SearchParamValue>>;
}) {
  const params = searchParams ? await searchParams : {};
  const intent = getSearchParam(params.intent);
  const status = getSearchParam(params.status);
  const errorMessage = getSearchParam(params.errorMessage);
  const email = getSearchParam(params.email);
  const company = getSearchParam(params.company);
  const location = getSearchParam(params.location);
  const auditType = getSearchParam(params.auditType);
  const goals = getSearchParam(params.goals);
  const website = getSearchParam(params.website);
  const firstName = getSearchParam(params.firstName);
  const lastName = getSearchParam(params.lastName);
  const isLocalAudit = intent === "seo-audit" || intent === "local-audit";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Contact"
            title={isLocalAudit ? "Claim your free local SEO audit" : "Tell us about your local growth goals"}
            description={
              isLocalAudit
                ? "We already have your audit request. Add any extra context below and we will tailor the review to your market, service area, and offer."
                : "Share your business details, service area, and goals. We will come back with the clearest path to more local calls and leads."
            }
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            action="/api/contact"
            method="post"
            className="rounded-3xl border border-line bg-white p-8 shadow-soft"
          >
            <input type="hidden" name="intent" value={isLocalAudit ? "local-audit" : "contact"} />
            <input type="hidden" name="source" value="contact-page" />
            <input type="hidden" name="redirectTo" value="/contact" />
            <input type="text" name="faxNumber" className="hidden" tabIndex={-1} autoComplete="off" />

            {isSuccess ? (
              <div className="mb-6 rounded-2xl border border-mint/40 bg-mint/10 px-4 py-3 text-sm text-ink">
                {isLocalAudit
                  ? "Your local SEO and Maps audit request is in. We will review your setup and email you shortly."
                  : "Your request has been sent. We will get back to you within 1-2 business days."}
              </div>
            ) : null}

            {isError ? (
              <div className="mb-6 rounded-2xl border border-ember/30 bg-sand px-4 py-3 text-sm text-ink">
                {errorMessage ||
                  "We could not send your request just yet. Please review the form and try again."}
              </div>
            ) : null}

            {isLocalAudit && !isSuccess ? (
              <div className="mb-6 rounded-2xl border border-ember/30 bg-sand px-4 py-3 text-sm text-ink">
                Audit request noted. Tell us a bit more about your service area,
                website, or Google Business Profile and we will tailor the
                review to your local market.
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                First name
                <input
                  type="text"
                  name="firstName"
                  defaultValue={firstName}
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="Jordan"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                Last name
                <input
                  type="text"
                  name="lastName"
                  defaultValue={lastName}
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="Lee"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
                Work email
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={email}
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="you@company.com"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
                Business name
                <input
                  type="text"
                  name="company"
                  required
                  defaultValue={company}
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="Company name"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
                Primary city or service area
                <input
                  type="text"
                  name="location"
                  defaultValue={location}
                  required={isLocalAudit}
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="Dallas, Fort Worth, or North Dallas"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
                Main focus
                <select
                  name="auditType"
                  defaultValue={auditType || "both"}
                  required={isLocalAudit}
                  className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
                >
                  <option value="google-maps-gbp">Google Maps / Google Business Profile</option>
                  <option value="local-seo-website">Local SEO / website leads</option>
                  <option value="both">Both SEO and Maps</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
                Website or Google Business Profile URL
                <input
                  type="text"
                  name="website"
                  inputMode="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  defaultValue={website}
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="yourcompany.com or your Google profile link"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
                What do you want more of?
                <textarea
                  name="goals"
                  rows={4}
                  required
                  defaultValue={goals}
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="More calls, more map visibility, more quote requests, better reviews, or a better website"
                />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-dark"
              >
                Submit request
              </button>
              <p className="text-xs text-slate">
                We will reply with the clearest next steps for your market.
              </p>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                Contact
              </p>
              <p className="mt-3 text-sm text-ink">hello@adventise.com</p>
              <p className="mt-2 text-sm text-slate">(555) 210-4888</p>
            </div>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                Best fit
              </p>
              <p className="mt-3 text-sm text-ink">
                Contractors, plumbers, accountants, home-service teams, and
                other local businesses that want more qualified calls and leads.
              </p>
              <p className="mt-2 text-sm text-slate">
                We can help whether you have a website, a Google Business
                Profile, both, or neither yet.
              </p>
            </div>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                What happens next
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  We review your visibility in search and Google Maps
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  We identify the fastest wins for your market and service area
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  We recommend the next sprint, whether that is GBP, SEO, website work, or all three
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
