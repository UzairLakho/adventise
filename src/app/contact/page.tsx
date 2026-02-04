import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Adventise about your growth goals.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Contact"
            title="Tell us where you want to grow"
            description="Share a few details and we will come back with a tailored plan."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <form className="rounded-3xl border border-line bg-white p-8 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                First name
                <input
                  type="text"
                  name="firstName"
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="Jordan"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                Last name
                <input
                  type="text"
                  name="lastName"
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="Lee"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
                Work email
                <input
                  type="email"
                  name="email"
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="you@company.com"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
                Company
                <input
                  type="text"
                  name="company"
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="Company name"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
                What are you focused on?
                <textarea
                  name="goals"
                  rows={4}
                  className="rounded-2xl border border-line px-4 py-3 text-sm"
                  placeholder="Pipeline growth, CAC targets, launch timeline"
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
                We will reply within 1-2 business days.
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
                Locations
              </p>
              <p className="mt-3 text-sm text-ink">New York - Austin - Remote</p>
              <p className="mt-2 text-sm text-slate">Serving clients worldwide.</p>
            </div>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                What happens next
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  Discovery call and goal alignment
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  Strategy sprint and roadmap
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                  Launch plan and timeline
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

