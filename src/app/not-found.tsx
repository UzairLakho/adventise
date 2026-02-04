import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center gap-6 px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">404</p>
      <h1 className="text-4xl font-semibold text-ink">Page not found</h1>
      <p className="text-sm text-slate">
        The page you are looking for does not exist. Let us get you back to the
        main site.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-soft"
      >
        Back to home
      </Link>
    </div>
  );
}
