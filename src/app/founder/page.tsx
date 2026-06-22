import type { Metadata } from "next";
import { Button, SectionHeading } from "@/components/ui";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Uzair Ahmed Lakho - Founder of Adventise",
  description: "Meet Uzair Ahmed Lakho, the Founder and Lead SEO Specialist at Adventise. Learn about our mission and how to get in touch.",
};

export default function FounderPage() {
  return (
    <div className="relative min-h-screen bg-noise py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        {/* Navigation Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate">
          <a href="/" className="hover:text-ember transition-colors" id="nav-home-link">Home</a>
          <span className="text-line">/</span>
          <a href="/about" className="hover:text-ember transition-colors" id="nav-about-link">About</a>
          <span className="text-line">/</span>
          <span className="text-ink">Uzair Ahmed Lakho</span>
        </nav>

        {/* Profile Card Container */}
        <div className="overflow-hidden rounded-[32px] border border-line bg-white shadow-soft transition-all duration-300 hover:border-ember/40">
          <div className="grid gap-8 p-8 sm:p-12 md:grid-cols-[1.1fr_1.9fr] md:items-start">
            
            {/* Photo Column */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border-4 border-sand shadow-inner bg-sand">
                <Image
                  src="/uzair-photo.png"
                  alt="Uzair Ahmed Lakho - Founder of Adventise"
                  fill
                  sizes="(max-w-768px) 100vw, 300px"
                  priority
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  id="founder-profile-image"
                />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 border border-mint/20 px-4 py-1 text-xs font-semibold text-ink-2">
                <span className="h-2 w-2 rounded-full bg-mint animate-pulse" />
                Active Founder
              </span>
            </div>

            {/* Content Column */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl" id="founder-name">
                  Uzair Ahmed Lakho
                </h1>
                <p className="text-lg font-semibold text-ember mt-1" id="founder-title">
                  Founder & Lead SEO Consultant
                </p>
              </div>

              {/* Bio / Description */}
              <div className="space-y-4 text-sm text-slate leading-relaxed">
                <p>
                  As the founder of <strong>Adventise</strong>, I help local service businesses—such as contractors, plumbers, electricians, and accountants—build strong digital presences that convert search visibility into actual client calls and booked jobs.
                </p>
                <p>
                  My goal is to eliminate the fluff from marketing and deliver clear, actionable results. I oversee our clients' Google Business Profile setups, Map-pack optimizations, citation audits, and lead-generation websites.
                </p>
              </div>

              {/* Contact Grid */}
              <div className="border-t border-line pt-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate mb-4">
                  Direct Verification & Contact Details
                </h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Phone */}
                  <a 
                    href="tel:+923136677628" 
                    className="flex items-center gap-3 rounded-2xl border border-line bg-ivory/50 p-4 transition-all hover:bg-ivory hover:border-ember group"
                    id="contact-phone"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember/10 text-ember transition-colors group-hover:bg-ember group-hover:text-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate">Phone Number</span>
                      <span className="text-sm font-semibold text-ink group-hover:text-ember transition-colors">+92 313 6677628</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:uzairlakho16@gmail.com" 
                    className="flex items-center gap-3 rounded-2xl border border-line bg-ivory/50 p-4 transition-all hover:bg-ivory hover:border-ember group"
                    id="contact-email"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember/10 text-ember transition-colors group-hover:bg-ember group-hover:text-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate">Email Address</span>
                      <span className="text-sm font-semibold text-ink group-hover:text-ember transition-colors">uzairlakho16@gmail.com</span>
                    </div>
                  </a>

                  {/* Social Profile */}
                  <a 
                    href="https://www.facebook.com/UzairAhmed2/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 rounded-2xl border border-line bg-ivory/50 p-4 transition-all hover:bg-ivory hover:border-ember group sm:col-span-2"
                    id="contact-social"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember/10 text-ember transition-colors group-hover:bg-ember group-hover:text-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate">Facebook Business / Social Profile</span>
                      <span className="text-sm font-semibold text-ink group-hover:text-ember transition-colors">facebook.com/UzairAhmed2/</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-line">
                <Button href="/contact" id="founder-contact-btn">
                  Work with Us
                </Button>
                <Button href="/about" variant="secondary" id="founder-about-btn">
                  About Adventise
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
