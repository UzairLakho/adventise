import certificates from "../../data/certificates.json";
import { normalizeCertificateId } from "@/lib/certificate-utils";

export type CertificateRecord = {
  id: string;
  name: string;
  course: string;
  courseCode: string;
  issueDate: string;
  duration: string;
  trainingLocation: string;
  status: string;
};

export const allCertificates = certificates as CertificateRecord[];

export function findCertificateById(certificateId: string) {
  const normalizedId = normalizeCertificateId(certificateId);

  // Normalize IDs for case-insensitive matching from form input and URL params.
  return allCertificates.find(
    (certificate) => normalizeCertificateId(certificate.id) === normalizedId
  );
}
