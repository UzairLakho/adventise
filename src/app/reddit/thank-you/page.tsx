import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Request Received",
  description: "Thanks for requesting your free Google Maps and website audit.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RedditThankYouPage() {
  return (
    <div className="bg-noise">
      <section className="mx-auto flex min-h-[calc(100vh-220px)] max-w-5xl items-center px-6 py-16">
        <div className="grid w-full gap-8 rounded-[32px] border border-line bg-white p-8 shadow-soft sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              Audit request received
            </p>
            <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
              We got it.
            </h1>
            <div className="space-y-4 text-sm text-slate sm:text-base">
              <p>
                Thanks for sending your info over. We will review your Google
                Maps presence, your website, and where the biggest leaks are
                likely happening first.
              </p>
              <p>
                If you want to speed this up and turn it into a quick discovery
                call, email <span className="font-semibold text-ink">hello@adventise.com</span> with
                your phone number, your business name, and two time windows
                that work for you. Put <span className="font-semibold text-ink">Reddit Audit Call</span> in
                the subject line.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-line bg-sand p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              30-second follow-up script
            </p>
            <div className="mt-4 space-y-3 text-sm text-ink">
              <p>
                “Appreciate you sending that over. We are going to look at your
                Google Maps setup, your website, and where competitors are
                beating you right now. If there is a real opportunity, we will
                show you the leak first, then the fastest fix. If you want to
                walk through it live, send us your number and two time windows
                and we will try to line up a quick call.” 
              </p>
            </div>
            <a
              href="mailto:hello@adventise.com?subject=Reddit%20Audit%20Call"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-dark"
            >
              Email to set up a call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
