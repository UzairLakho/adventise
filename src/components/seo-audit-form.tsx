const fieldClasses =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate/70 focus:border-ember";

export function SeoAuditForm() {
  return (
    <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              Free SEO Audit
            </p>
            <span className="rounded-full bg-mint/20 px-3 py-1 text-xs font-semibold text-ink">
              Manual review
            </span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
              See what is holding back your organic growth.
            </h2>
            <p className="text-sm text-slate">
              Share a few details and we will prepare a focused audit covering
              technical issues, content gaps, and quick-win SEO opportunities.
            </p>
          </div>
        </div>

        <form action="/api/contact" method="post" className="space-y-4">
          <input type="hidden" name="intent" value="seo-audit" />
          <input type="hidden" name="source" value="homepage-seo-audit" />
          <input type="hidden" name="redirectTo" value="/contact" />

          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            Website URL
            <input
              type="url"
              name="website"
              required
              placeholder="https://yourcompany.com"
              className={fieldClasses}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
              Work email
              <input
                type="email"
                name="email"
                required
                placeholder="you@company.com"
                className={fieldClasses}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
              Company
              <input
                type="text"
                name="company"
                required
                placeholder="Company name"
                className={fieldClasses}
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            What should we audit first?
              <input
                type="text"
                name="goals"
                required
                placeholder="Rankings drop, technical SEO, local visibility, content gaps"
                className={fieldClasses}
              />
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-dark"
          >
            Get my free SEO audit
          </button>
        </form>

        <div className="grid gap-3 text-xs text-slate sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-ivory px-4 py-3">
            Technical crawl issues
          </div>
          <div className="rounded-2xl border border-line bg-ivory px-4 py-3">
            Content and keyword gaps
          </div>
          <div className="rounded-2xl border border-line bg-ivory px-4 py-3">
            Priority quick wins
          </div>
        </div>
      </div>
    </div>
  );
}
