"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { normalizeCertificateId } from "@/lib/certificate-utils";

export default function VerifyForm() {
  const router = useRouter();
  const [certificateId, setCertificateId] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedId = normalizeCertificateId(certificateId);

    if (!normalizedId) {
      return;
    }

    // Keep routing predictable by always redirecting with a normalized ID format.
    router.push(`/verify/${encodeURIComponent(normalizedId)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label
        htmlFor="certificate-id"
        className="block text-sm font-semibold text-ink"
      >
        Certificate of Completion ID
      </label>
      <input
        id="certificate-id"
        name="certificateId"
        type="text"
        required
        value={certificateId}
        onChange={(event) => setCertificateId(event.target.value)}
        placeholder="ADV-MS-2026-0001"
        className="w-full rounded-2xl border border-line px-4 py-3 text-sm text-ink outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/25"
      />
      <p className="text-sm text-slate">
        Enter the ID exactly as shown on the Certificate of Completion and click
        verify.
      </p>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-dark sm:w-auto"
      >
        Verify
      </button>
    </form>
  );
}
