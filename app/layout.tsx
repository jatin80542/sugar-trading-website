import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company } from "@/lib/company";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${company.name} — International Sugar Trading & Supply`,
    template: `%s | ${company.name}`,
  },
  description: company.shortBlurb,
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_GB",
    images: [{ url: "/images/hero-supply.svg", width: 1920, height: 1080, alt: "Refined sugar crystal detail" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
