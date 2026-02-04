import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import { careers } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Adventise team and help build modern growth systems.",
};

export default function CareersPage() {
  return (
    <div>
      <section className="bg-noise">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Careers"
            title="Build the future of performance marketing"
            description="We are a lean, senior team focused on craft, momentum, and client impact."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="space-y-6">
          {careers.map((role) => (
            <div
              key={role.role}
              className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-ink">{role.role}</h3>
                <p className="text-sm text-slate">
                  {role.location} - {role.type}
                </p>
              </div>
              <Button href="/contact" variant="secondary">
                Apply now
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 rounded-[32px] border border-line bg-ink p-12 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Not seeing a fit?
            </p>
            <h2 className="text-3xl font-semibold">We still want to meet you.</h2>
            <p className="text-sm text-white/80">
              Send us a note with your portfolio or background and we will keep in touch.
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

