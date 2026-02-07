import type { Metadata } from "next";
import Link from "next/link";
import { allCertificates, findCertificateById } from "@/lib/certificate-data";
import { formatIssueDate, normalizeCertificateId } from "@/lib/certificate-utils";
import DownloadCertificateButton from "./download-certificate-button";

export const metadata: Metadata = {
  title: "Certificate Verification",
  description:
    "Validate Adventise Certificate of Completion records for issued trainees.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export function generateStaticParams() {
  return allCertificates.map((certificate) => ({ id: certificate.id }));
}

export default async function VerifyCertificateResult({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const { id } = await params;
  const requestedId = normalizeCertificateId(id);
  const certificate = findCertificateById(requestedId);
  const isCertificateValid = Boolean(certificate && certificate.status === "Valid");

  return (
    <div className="bg-noise">
      <section className="mx-auto flex min-h-[calc(100vh-220px)] max-w-3xl items-center px-6 py-16">
        <div className="w-full rounded-[32px] border border-line bg-white p-8 shadow-soft sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
            Certificate of Completion Verification
          </p>

          {isCertificateValid && certificate ? (
            <div className="mt-4">
              <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
                Certificate Verified
              </h1>
              <p className="mt-3 text-sm text-slate">
                This Certificate of Completion is valid and recorded by Adventise.
              </p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-ivory p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    Student Name
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-ink">
                    {certificate.name}
                  </dd>
                </div>
                <div className="rounded-2xl border border-line bg-ivory p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    Course Name
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-ink">
                    {certificate.course}
                  </dd>
                </div>
                <div className="rounded-2xl border border-line bg-ivory p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    Issue Date
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-ink">
                    {formatIssueDate(certificate.issueDate)}
                  </dd>
                </div>
                <div className="rounded-2xl border border-line bg-ivory p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    Status
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-ink">
                    {certificate.status}
                  </dd>
                </div>
                <div className="rounded-2xl border border-line bg-ivory p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    Duration
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-ink">
                    {certificate.duration}
                  </dd>
                </div>
                <div className="rounded-2xl border border-line bg-ivory p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    Course Code
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-ink">
                    {certificate.courseCode}
                  </dd>
                </div>
                <div className="rounded-2xl border border-line bg-ivory p-4 sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    Training Location
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-ink">
                    {certificate.trainingLocation}
                  </dd>
                </div>
                <div className="rounded-2xl border border-line bg-ivory p-4 sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    Issued By
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-ink">Adventise</dd>
                </div>
              </dl>
            </div>
          ) : certificate ? (
            <div className="mt-4">
              <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
                Certificate Record Unavailable
              </h1>
              <p className="mt-3 text-sm text-slate">
                The certificate record for{" "}
                <span className="font-semibold text-ink">{certificate.id}</span>{" "}
                is currently not valid for verification.
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
                Certificate Not Found
              </h1>
              <p className="mt-3 text-sm text-slate">
                We could not find a Certificate of Completion for ID{" "}
                <span className="font-semibold text-ink">
                  {requestedId || "Unknown ID"}
                </span>
                . Please check the ID and try again.
              </p>
            </div>
          )}

          {isCertificateValid && certificate ? (
            <div className="mt-8">
              <DownloadCertificateButton certificate={certificate} />
            </div>
          ) : null}

          <div className="mt-6">
            <Link
              href="/verify"
              className="inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ember hover:text-ember"
            >
              Verify Another Certificate of Completion
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
