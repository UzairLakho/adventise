import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import { resourcePosts } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Resources",
  description: "Local SEO, Google Maps, and conversion insights for service businesses.",
};

export default function ResourcesPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Resources"
            title="Practical local-growth notes for service businesses"
            description="Short, tactical content around Google Maps, local SEO, reviews, and websites that convert local traffic."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resourcePosts.map((post) => (
            <div key={post.title} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                {post.label} - {post.date}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-ink">{post.title}</h3>
              <p className="mt-3 text-sm text-slate">
                A practical breakdown of what matters, what is usually missed,
                and what local business owners should fix first.
              </p>
              <div className="mt-4 text-sm font-semibold text-ember">Coming soon</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 rounded-[32px] border border-line bg-ink p-12 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Want the short version?
            </p>
            <h2 className="text-3xl font-semibold">Skip the reading and request the audit.</h2>
            <p className="text-sm text-white/80">
              We can look at your actual business, your local market, and where
              visibility is leaking instead of giving you generic advice.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/#audit-form" className="w-full justify-center">
              Request free audit
            </Button>
            <p className="text-xs text-white/70">
              Best for businesses that want a clearer next step, not more theory.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
