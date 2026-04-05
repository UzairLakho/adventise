import { Button } from "@/components/ui";

export default function ServicesNotFound() {
  return (
    <div className="bg-noise">
      <section className="mx-auto flex min-h-[calc(100vh-220px)] max-w-5xl items-center px-6 py-16">
        <div className="grid w-full gap-8 rounded-[32px] border border-line bg-white p-8 shadow-soft sm:p-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              Service Not Found
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
                That service page is not available.
              </h1>
              <p className="text-sm text-slate sm:text-base">
                You may have opened an older service link or typed the URL
                incorrectly. Adventise currently focuses on local SEO, Google
                Maps optimization, websites for local leads, and review and
                citation work for service businesses.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/services">View all services</Button>
              <Button href="/#audit-form" variant="secondary">
                Request a free audit
              </Button>
            </div>
          </div>

          <div className="rounded-[28px] border border-line bg-sand p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              Best next step
            </p>
            <div className="mt-4 space-y-3 text-sm text-ink">
              <p>
                If you are not sure which service fits your business, the audit
                is the quickest way to figure out whether you need Google Maps
                work, local SEO, website help, or a stronger trust layer first.
              </p>
              <p>
                That works whether you already have a website, a Google
                Business Profile, both, or neither yet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
