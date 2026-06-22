"use client";

import { useState, type ReactNode } from "react";

export function Accordion({
  question,
  answer,
}: {
  question: string;
  answer: string | ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-line bg-white transition-all duration-300 hover:border-ember/40">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-ink focus:outline-none"
      >
        <span className="text-base sm:text-lg">{question}</span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-xs transition-transform duration-300 ${
            isOpen ? "rotate-180 border-ember text-ember bg-ember/5" : "text-slate"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 text-sm text-slate leading-relaxed border-t border-line/40 pt-4">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
