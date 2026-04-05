import Link from "next/link";

export default function VerifyNotFound() {
  return (
    <div className="bg-noise">
      <section className="mx-auto flex min-h-[calc(100vh-220px)] max-w-4xl items-center px-6 py-16">
        <div className="w-full rounded-[32px] border border-line bg-white p-8 shadow-soft sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
            Verification 404
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
            Certificate record not found
          </h1>
          <p className="mt-3 text-sm text-slate sm:text-base">
            We could not find a matching Certificate of Completion for the link
            you opened. The certificate ID may be incorrect, incomplete, or no
            longer available in this verification portal.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href="/verify"
              className="inline-flex items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-dark"
            >
              Verify another certificate
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ember hover:text-ember"
            >
              Contact Adventise
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-ivory p-5 text-sm text-slate">
            Please check the certificate ID exactly as shown on the document.
            If you still cannot verify it, contact Adventise and include the
            trainee name, course name, and certificate ID if available.
          </div>
        </div>
      </section>
    </div>
  );
}
