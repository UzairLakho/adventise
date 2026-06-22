import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";
import ContactForm from "@/components/contact-form";

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
          <ContactForm
            isLocalAudit={isLocalAudit}
            initialValues={{
              firstName,
              lastName,
              email,
              company,
              location,
              auditType,
              website,
              goals,
            }}
            initialStatus={status}
            initialErrorMessage={errorMessage}
          />

          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                Contact
              </p>
              <p className="mt-3 text-sm text-ink font-semibold">
                <a href="mailto:uzairlakho16@gmail.com" className="hover:text-ember transition-colors">uzairlakho16@gmail.com</a>
              </p>
              <p className="mt-2 text-sm text-slate">
                <a href="tel:+923136677628" className="hover:text-ember transition-colors">+92 313 6677628</a>
              </p>
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
