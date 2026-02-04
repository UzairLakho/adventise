import Link from "next/link";
import { navLinks } from "@/lib/site-data";
import { Button } from "@/components/ui";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/90 backdrop-blur">
      <div className="bg-ink text-ivory">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
          <span className="tracking-[0.2em] uppercase text-mint">New</span>
          <span className="text-ivory/80">
            Growth sprints now open for Q2 launches.
          </span>
          <Link href="/contact" className="text-ivory underline">
            Book a strategy call
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
  href="/"
  aria-label="Adventise"
  className="group flex items-center gap-3 select-none"
>
  {/* Logo mark */}
  <div
    className="relative flex h-11 w-11 items-center justify-center
               rounded-xl bg-gradient-to-br
               from-amber-500 via-orange-500 to-amber-600
               shadow-lg transition-all duration-300
               group-hover:scale-105"
  >
    {/* Stylized A + forward arrow */}
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20L12 4L20 20" />
      <path d="M12 4V14" />
      <path d="M9 11L12 14L15 11" />
    </svg>

    {/* ember glow */}
    <span className="absolute inset-0 rounded-xl bg-orange-400 opacity-25 blur-lg"></span>
  </div>

  {/* Wordmark */}
  <span
    className="font-display text-xl font-bold tracking-tight
               text-gray-900 transition-colors duration-300
               group-hover:text-amber-600"
  >
    Adventise
  </span>
</Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ember">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button href="/results" variant="secondary">
            See Results
          </Button>
          <Button href="/contact">Get a Growth Plan</Button>
        </div>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-line bg-white p-4 shadow-soft">
            <div className="flex flex-col gap-3 text-sm font-medium">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-ember">
                  {link.label}
                </Link>
              ))}
              <Link href="/results" className="hover:text-ember">
                See Results
              </Link>
              <Link href="/contact" className="hover:text-ember">
                Get a Growth Plan
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
