"use client";

import { useState, type FormEvent } from "react";

type AuditFormDefaults = {
  auditType?: string;
  company?: string;
  email?: string;
  goals?: string;
  location?: string;
  website?: string;
};

const fieldClasses =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate/70 focus:border-ember";

const selectClasses =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ember";

export function SeoAuditForm({
  defaults,
  errorMessage: initialErrorMessage,
  status: initialStatus,
}: {
  defaults?: AuditFormDefaults;
  errorMessage?: string;
  status?: string;
}) {
  const [status, setStatus] = useState<string | null>(initialStatus || null);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialErrorMessage || null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setStatus(null);
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.errorMessage || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("A network error occurred. Please verify your connection.");
    } finally {
      setIsPending(false);
    }
  }

  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div
      id="audit-form"
      className="rounded-[32px] border border-line bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              Free SEO + Maps Audit
            </p>
            <span className="rounded-full bg-mint/20 px-3 py-1 text-xs font-semibold text-ink">
              Built for local businesses
            </span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
              Find the fastest way to get more local calls.
            </h2>
            <p className="text-sm text-slate">
              Contractors, plumbers, accountants, and other service businesses
              can request a focused audit for Google Maps, local SEO, or both.
              No website or Google Business Profile yet? That is okay.
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="rounded-2xl border border-mint/40 bg-mint/10 px-4 py-3 text-sm text-ink animate-reveal">
            Your audit request is in. We will review your setup and email the
            next steps shortly.
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-2xl border border-ember/30 bg-sand px-4 py-3 text-sm text-ink animate-reveal">
            {errorMessage ||
              "We could not send your request just yet. Please review the form and try again."}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="intent" value="local-audit" />
          <input type="hidden" name="source" value="homepage-local-audit" />
          <input type="hidden" name="redirectTo" value="/#audit-form" />
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
              defaultValue={defaults?.company}
              placeholder="North Dallas Plumbing"
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
                defaultValue={defaults?.email}
                placeholder="you@company.com"
                className={fieldClasses}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
              Primary city or service area
              <input
                type="text"
                name="location"
                required
                defaultValue={defaults?.location}
                placeholder="Dallas or DFW metro"
                className={fieldClasses}
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            What should we audit first?
            <select
              name="auditType"
              defaultValue={defaults?.auditType || "both"}
              required
              className={selectClasses}
            >
              <option value="google-maps-gbp">Google Maps / Google Business Profile</option>
              <option value="local-seo-website">Website SEO and local landing pages</option>
              <option value="both">Both SEO and Maps</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            Website or Google Business Profile URL
            <input
              type="text"
              name="website"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              defaultValue={defaults?.website}
              placeholder="yourcompany.com or your Google profile link"
              className={fieldClasses}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            What do you want more of?
            <textarea
              name="goals"
              rows={3}
              required
              defaultValue={defaults?.goals}
              placeholder="More calls, more quote requests, stronger map visibility, or better local rankings"
              className={fieldClasses}
            />
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-dark disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? "Requesting audit..." : "Request my free audit"}
          </button>
        </form>

        <div className="grid gap-3 text-xs text-slate sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-ivory px-4 py-3">
            Google Maps visibility gaps
          </div>
          <div className="rounded-2xl border border-line bg-ivory px-4 py-3">
            Service-area SEO opportunities
          </div>
          <div className="rounded-2xl border border-line bg-ivory px-4 py-3">
            Quick wins for more calls
          </div>
        </div>
      </div>
    </div>
  );
}
