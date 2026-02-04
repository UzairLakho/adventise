import Link from "next/link";
import { services } from "@/lib/site-data";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember text-white">
              A
            </span>
            <span className="font-display">Adventise</span>
          </div>
          <p className="text-sm text-slate">
            Adventise is a performance marketing agency helping ambitious brands
            compound revenue through strategy, creative, and media.
          </p>
          <div className="text-sm font-semibold text-ink">
            hello@adventise.com
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
            Services
          </p>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="block hover:text-ember"
            >
              {service.title}
            </Link>
          ))}
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
            Company
          </p>
          <Link href="/about" className="block hover:text-ember">
            About
          </Link>
          <Link href="/results" className="block hover:text-ember">
            Results
          </Link>
          <Link href="/careers" className="block hover:text-ember">
            Careers
          </Link>
          <Link href="/contact" className="block hover:text-ember">
            Contact
          </Link>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
            Resources
          </p>
          <Link href="/resources" className="block hover:text-ember">
            Insights
          </Link>
          <Link href="/case-studies" className="block hover:text-ember">
            Case Studies
          </Link>
          <Link href="/testimonials" className="block hover:text-ember">
            Testimonials
          </Link>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
          <span>(c) 2026 Adventise. All rights reserved.</span>
          <span>Privacy - Terms - Accessibility</span>
        </div>
      </div>
    </footer>
  );
}


