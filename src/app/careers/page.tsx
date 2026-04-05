import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Careers",
  description: "Adventise is not actively hiring right now, but we are open to meeting strong operators and collaborators.",
};

export default function CareersPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Careers"
            title="We are not actively hiring right now"
            description="That said, we are always open to meeting thoughtful local SEO operators, designers, developers, and referral partners."
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-[32px] border border-line bg-white p-10 shadow-soft">
          <p className="text-sm text-slate">
            If you understand local search, Google Business Profile work,
            websites for service businesses, or conversion-focused copy, feel
            free to introduce yourself. We keep our network small and value
            people who care about practical outcomes more than agency theater.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "Local SEO specialists",
              "Designers and developers",
              "Referral and white-label partners",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-line bg-ivory px-4 py-4 text-sm font-semibold text-ink">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 rounded-[32px] border border-line bg-ink p-12 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Reach out
            </p>
            <h2 className="text-3xl font-semibold">Want to stay on our radar?</h2>
            <p className="text-sm text-white/80">
              Send a short note with your background, portfolio, or type of
              collaboration you are interested in.
            </p>
          </div>
          <div className="space-y-4">
            <Button href="/contact" className="w-full justify-center">
              Introduce yourself
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
