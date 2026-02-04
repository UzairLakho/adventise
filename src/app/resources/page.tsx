import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import { resourcePosts } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Resources",
  description: "Insights on performance marketing, conversion, and growth strategy.",
};

export default function ResourcesPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Resources"
            title="Insights for growth teams"
            description="Tactical playbooks, conversion ideas, and performance notes from the Adventise team."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {resourcePosts.map((post) => (
            <div key={post.title} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                {post.label} - {post.date}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-ink">{post.title}</h3>
              <p className="mt-3 text-sm text-slate">
                A concise summary of the insights and actionable takeaways for growth teams.
              </p>
              <div className="mt-4 text-sm font-semibold text-ember">Read more</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 rounded-[32px] border border-line bg-ink p-12 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Newsletter
            </p>
            <h2 className="text-3xl font-semibold">Get the monthly growth brief.</h2>
            <p className="text-sm text-white/80">
              One email. Tactical playbooks and benchmarks from the Adventise team.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/contact" className="w-full justify-center">
              Join the list
            </Button>
            <p className="text-xs text-white/70">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

