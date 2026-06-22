"use client";

import Link from "next/link";
import { navLinks } from "@/lib/site-data";
import { Button } from "@/components/ui";
import { useState, useEffect } from "react";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on key down (Escape)
  useEffect(() => {
    if (!isOpen) return;
    const handleClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleClose);
    return () => window.removeEventListener("keydown", handleClose);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/90 backdrop-blur-md">
      <div className="bg-ink text-ivory">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
          <span className="tracking-[0.2em] uppercase text-mint">Local SEO</span>
          <span className="text-ivory/80">
            Free SEO and Maps audits for local service businesses.
          </span>
          <Link href="/#audit-form" className="text-ivory underline">
            Request free audit
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
            <Link key={link.href} href={link.href} className="hover:text-ember transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button href="/#audit-form" variant="secondary">
            Free Audit
          </Button>
          <Button href="/contact">Talk to Us</Button>
        </div>
        
        {/* Interactive Mobile Menu Toggle */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer select-none rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ember hover:text-ember focus:outline-none"
            id="mobile-menu-btn"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
          
          {isOpen && (
            <>
              {/* Overlay backdrop to close menu when tapping outside */}
              <div 
                className="fixed inset-0 z-10 bg-black/5 md:hidden" 
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 z-20 mt-3 w-56 origin-top-right rounded-2xl border border-line bg-white p-4 shadow-soft animate-reveal animate-[reveal_0.2s_ease_forwards]">
                <div className="flex flex-col gap-3 text-sm font-medium">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="hover:text-ember transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link 
                    href="/#audit-form" 
                    onClick={() => setIsOpen(false)}
                    className="hover:text-ember transition-colors"
                  >
                    Free Audit
                  </Link>
                  <Link 
                    href="/contact" 
                    onClick={() => setIsOpen(false)}
                    className="hover:text-ember transition-colors"
                  >
                    Talk to Us
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
