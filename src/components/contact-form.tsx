"use client";

import { useState, type FormEvent } from "react";

type ContactFormProps = {
  isLocalAudit: boolean;
  initialValues: {
    firstName?: string;
    lastName?: string;
    email?: string;
    company?: string;
    location?: string;
    auditType?: string;
    website?: string;
    goals?: string;
  };
  initialStatus?: string;
  initialErrorMessage?: string;
};

export default function ContactForm({
  isLocalAudit,
  initialValues,
  initialStatus,
  initialErrorMessage,
}: ContactFormProps) {
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
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-white p-8 shadow-soft"
    >
      <input type="hidden" name="intent" value={isLocalAudit ? "local-audit" : "contact"} />
      <input type="hidden" name="source" value="contact-page" />
      <input type="hidden" name="redirectTo" value="/contact" />
      <input type="text" name="faxNumber" className="hidden" tabIndex={-1} autoComplete="off" />

      {isSuccess ? (
        <div className="mb-6 rounded-2xl border border-mint/40 bg-mint/10 px-4 py-3 text-sm text-ink animate-reveal">
          {isLocalAudit
            ? "Your local SEO and Maps audit request is in. We will review your setup and email you shortly."
            : "Your request has been sent. We will get back to you within 1-2 business days."}
        </div>
      ) : null}

      {isError ? (
        <div className="mb-6 rounded-2xl border border-ember/30 bg-sand px-4 py-3 text-sm text-ink animate-reveal">
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
            defaultValue={initialValues.firstName}
            className="rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:border-ember transition-colors"
            placeholder="Jordan"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
          Last name
          <input
            type="text"
            name="lastName"
            defaultValue={initialValues.lastName}
            className="rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:border-ember transition-colors"
            placeholder="Lee"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
          Work email
          <input
            type="email"
            name="email"
            required
            defaultValue={initialValues.email}
            className="rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:border-ember transition-colors"
            placeholder="you@company.com"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
          Business name
          <input
            type="text"
            name="company"
            required
            defaultValue={initialValues.company}
            className="rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:border-ember transition-colors"
            placeholder="Company name"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
          Primary city or service area
          <input
            type="text"
            name="location"
            defaultValue={initialValues.location}
            required={isLocalAudit}
            className="rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:border-ember transition-colors"
            placeholder="Dallas, Fort Worth, or North Dallas"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
          Main focus
          <select
            name="auditType"
            defaultValue={initialValues.auditType || "both"}
            required={isLocalAudit}
            className="rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ember transition-colors"
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
            defaultValue={initialValues.website}
            className="rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:border-ember transition-colors"
            placeholder="yourcompany.com or your Google profile link"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
          What do you want more of?
          <textarea
            name="goals"
            rows={4}
            required
            defaultValue={initialValues.goals}
            className="rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:border-ember transition-colors"
            placeholder="More calls, more map visibility, more quote requests, better reviews, or a better website"
          />
        </label>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-dark disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? "Submitting..." : "Submit request"}
        </button>
        <p className="text-xs text-slate">
          We will reply with the clearest next steps for your market.
        </p>
      </div>
    </form>
  );
}
