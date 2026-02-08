import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatIssueDate } from "@/lib/certificate-utils";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#f8f5f0",
    fontFamily: "Times-Roman",
  },
  outerFrame: {
    flex: 1,
    borderWidth: 1.2,
    borderColor: "#0b1f2a",
    padding: 7,
  },
  innerFrame: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d9cbb9",
    paddingHorizontal: 22,
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  logoImage: {
    width: 215,
    height: 54,
  },
  logoFallback: {
    fontFamily: "Times-Bold",
    fontSize: 22,
    color: "#ff6b35",
    letterSpacing: 1.1,
  },
  certificateMeta: {
    alignItems: "flex-end",
    gap: 2,
  },
  metaLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.4,
    color: "#5d6b74",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  metaValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: "#e45521",
  },
  titleBlock: {
    marginTop: 4,
    alignItems: "center",
  },
  title: {
    fontFamily: "Times-Bold",
    fontSize: 30,
    color: "#0b1f2a",
    letterSpacing: 2.5,
  },
  subtitle: {
    marginTop: 2,
    fontFamily: "Helvetica-Bold",
    fontSize: 8.8,
    color: "#5d6b74",
    letterSpacing: 1.2,
  },
  body: {
    marginTop: 8,
    alignItems: "center",
  },
  bodyText: {
    fontSize: 12.5,
    color: "#0f172a",
    lineHeight: 1.45,
    textAlign: "center",
  },
  nameWrapper: {
    marginTop: 7,
    width: "100%",
    alignItems: "center",
  },
  studentName: {
    fontFamily: "Times-Bold",
    fontSize: 30,
    color: "#0f172a",
    textAlign: "center",
  },
  nameLine: {
    marginTop: 4,
    width: 445,
    borderBottomWidth: 1,
    borderBottomColor: "#ff6b35",
  },
  courseText: {
    marginTop: 6,
    fontFamily: "Times-Bold",
    fontSize: 13.1,
    color: "#0f172a",
    lineHeight: 1.48,
    textAlign: "center",
  },
  skillsBox: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#d9cbb9",
    backgroundColor: "#f2e8dc",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  skillsHeading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.3,
    color: "#0b1f2a",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 3,
    textAlign: "center",
  },
  skillsText: {
    fontSize: 10.1,
    color: "#1e293b",
    lineHeight: 1.42,
    textAlign: "center",
  },
  detailsSection: {
    marginTop: 11,
    borderTopWidth: 1,
    borderTopColor: "#d9cbb9",
    paddingTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 7,
  },
  detailItem: {
    width: "33.333%",
    paddingHorizontal: 8,
    alignItems: "center",
  },
  detailLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: "#5d6b74",
    textTransform: "uppercase",
    letterSpacing: 0.72,
    textAlign: "center",
  },
  detailValue: {
    marginTop: 2,
    fontFamily: "Times-Bold",
    fontSize: 11.2,
    color: "#0f172a",
    textAlign: "center",
  },
  bottomSection: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#d9cbb9",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 18,
  },
  signatoryBlock: {
    flex: 1,
  },
  signatureImage: {
    width: 145,
    height: 44,
    marginBottom: 2,
  },
  signatoryLine: {
    width: 190,
    borderBottomWidth: 1,
    borderBottomColor: "#0b1f2a",
    marginBottom: 6,
  },
  signatoryText: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    color: "#0f172a",
    lineHeight: 1.45,
  },
  rightBlock: {
    flex: 1.2,
    alignItems: "flex-end",
  },
  verificationText: {
    fontSize: 10,
    color: "#0f172a",
    textAlign: "right",
    lineHeight: 1.45,
    marginBottom: 4,
  },
  qrBlock: {
    alignItems: "center",
  },
  qrBox: {
    borderWidth: 1,
    borderColor: "#d9cbb9",
    backgroundColor: "#ffffff",
    padding: 5,
  },
  qrImage: {
    width: 70,
    height: 70,
  },
  scanText: {
    marginTop: 4,
    fontSize: 8.2,
    color: "#334155",
    textAlign: "center",
    lineHeight: 1.3,
  },
  legalFooter: {
    marginTop: 6,
    fontSize: 8.4,
    color: "#334155",
    textAlign: "center",
    lineHeight: 1.36,
  },
});

export default function CertificatePDF({
  certificate,
  qrCodeDataUrl,
  logoDataUrl,
  signatureDataUrl,
}) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" wrap={false} style={styles.page}>
        <View style={styles.outerFrame}>
          <View style={styles.innerFrame}>
            <View>
              <View style={styles.headerRow}>
                {logoDataUrl ? (
                  <Image src={logoDataUrl} style={styles.logoImage} alt="Adventise logo" />
                ) : (
                  <Text style={styles.logoFallback}>ADVENTISE</Text>
                )}
                <View style={styles.certificateMeta}>
                  <Text style={styles.metaLabel}>Certificate ID</Text>
                  <Text style={styles.metaValue}>{certificate.id}</Text>
                </View>
              </View>

              <View style={styles.titleBlock}>
                <Text style={styles.title}>CERTIFICATE OF COMPLETION</Text>
                <Text style={styles.subtitle}>
                  P R O F E S S I O N A L  T R A I N I N G  C R E D E N T I A L
                </Text>
              </View>

              <View style={styles.body}>
                <Text style={styles.bodyText}>This is to certify that</Text>
                <View style={styles.nameWrapper}>
                  <Text style={styles.studentName}>{certificate.name}</Text>
                  <View style={styles.nameLine} />
                </View>
                <Text style={styles.bodyText}>has successfully completed the</Text>
                <Text style={styles.courseText}>
                  {certificate.course} Training Program
                </Text>
                <Text style={styles.bodyText}>conducted by Adventise.</Text>
              </View>

              <View style={styles.skillsBox}>
                <Text style={styles.skillsHeading}>Skills Section</Text>
                <Text style={styles.skillsText}>
                  The training focused on practical skills in: Local SEO, Google My Business Optimization & Citations Training.</M>.
                </Text>
              </View>

              <View style={styles.detailsSection}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Issued by</Text>
                  <Text style={styles.detailValue}>Adventise</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Certificate ID</Text>
                  <Text style={styles.detailValue}>{certificate.id}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Course Code</Text>
                  <Text style={styles.detailValue}>{certificate.courseCode}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Issue Date</Text>
                  <Text style={styles.detailValue}>
                    {formatIssueDate(certificate.issueDate)}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{certificate.duration}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Training Location</Text>
                  <Text style={styles.detailValue}>{certificate.trainingLocation}</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.bottomSection}>
                <View style={styles.signatoryBlock}>
                  {signatureDataUrl ? (
                    <Image
                      src={signatureDataUrl}
                      style={styles.signatureImage}
                      alt="Authorized signature Uzair"
                    />
                  ) : null}
                  <View style={styles.signatoryLine} />
                  <Text style={styles.signatoryText}>
                    Authorized Signatory{"\n"}Adventise
                  </Text>
                </View>

                <View style={styles.rightBlock}>
                  <Text style={styles.verificationText}>
                    Online Verification:{"\n"}https://adventise.com/verify
                  </Text>
                  <View style={styles.qrBlock}>
                    <View style={styles.qrBox}>
                      <Image
                        src={qrCodeDataUrl}
                        style={styles.qrImage}
                        alt="Certificate verification QR code"
                      />
                    </View>
                    <Text style={styles.scanText}>(Scan QR for instant verification)</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.legalFooter}>
                Issued by ADVENTISE, having its office at
                Adventise House, M-09, Dolphin Tower, Shalimar Road, Sukkur,
                65200.
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
