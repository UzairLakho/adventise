import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adventise.com"),
  title: {
    default: "Adventise | Local SEO & Google Maps Growth",
    template: "%s | Adventise",
  },
  description:
    "Adventise helps contractors, plumbers, accountants, and other local businesses get more calls from Google Search and Maps.",
  keywords: [
    "local SEO",
    "google business profile",
    "google maps seo",
    "seo for plumbers",
    "seo for contractors",
    "local lead generation",
    "service business marketing",
  ],
  openGraph: {
    title: "Adventise | Local SEO & Google Maps Growth",
    description:
      "Local SEO, Google Business Profile optimization, and conversion-focused websites for service businesses.",
    type: "website",
    url: "https://adventise.com",
    siteName: "Adventise",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adventise | Local SEO & Google Maps Growth",
    description:
      "Local SEO, Google Business Profile optimization, and conversion-focused websites for service businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Adventise",
  url: "https://adventise.com",
  logo: "https://adventise.com/favicon.ico",
  email: "hello@adventise.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${manrope.variable} antialiased`}>
        <div className="min-h-screen bg-ivory text-ink">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
