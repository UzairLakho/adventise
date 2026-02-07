import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";
import VerifyForm from "./verify-form";

export const metadata: Metadata = {
  title: "Certificate Verification",
  description:
    "Verify Adventise Certificate of Completion records using a certificate ID.",
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

export default function VerifyPage() {
  return (
    <div className="bg-noise">
      <section className="mx-auto flex min-h-[calc(100vh-220px)] max-w-3xl items-center px-6 py-16">
        <div className="w-full rounded-[32px] border border-line bg-white p-8 shadow-soft sm:p-10">
          <SectionHeading
            eyebrow="Verification Portal"
            title="Certificate of Completion Verification"
            description="Use this official Adventise portal to verify a Certificate of Completion by ID."
            align="center"
          />
          <div className="mt-8">
            <VerifyForm />
          </div>
          <p className="mt-6 text-xs text-slate">
            Adventise Training Records and Certificate Verification Portal.
          </p>
        </div>
      </section>
    </div>
  );
}
