import Link from "next/link";
import { Button } from "@/components/ui";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/contact", label: "Contact" },
  { href: "/verify", label: "Verify Certificate" },
];

export default function NotFound() {
  return (
    <div className="bg-noise">
      <section className="mx-auto flex min-h-[calc(100vh-220px)] max-w-6xl items-center px-6 py-16">
        <div className="grid w-full gap-8 rounded-[32px] border border-line bg-white p-8 shadow-soft sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              404
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
                This page does not exist anymore.
              </h1>
              <p className="max-w-2xl text-sm text-slate sm:text-base">
                The page you were trying to open may have moved, the link may be
                outdated, or the URL may have been typed incorrectly. If you
                were looking for local SEO, Google Maps help, or a certificate
                verification page, the links below should get you back on track.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/">Back to home</Button>
              <Button href="/#audit-form" variant="secondary">
                Request a free audit
              </Button>
            </div>
          </div>

          <div className="rounded-[28px] border border-line bg-ivory p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              Helpful places to go next
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-line bg-white px-4 py-4 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ember hover:text-ember"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate">
              If you landed here from an old link, we can still help. Head to
              the audit form and tell us what you were trying to find.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
