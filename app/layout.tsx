import type { Metadata, Viewport } from "next";
import { Funnel_Display } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import MotionProvider from "@/components/layout/MotionProvider";
import Analytics from "@/components/layout/Analytics";
import { SITE_URL } from "@/lib/constants";

const funnelDisplay = Funnel_Display({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-funnel",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Imaginary Space",
  title: {
    default: "Imaginary Space — AI & Automation Consulting",
    template: "%s | Imaginary Space",
  },
  description:
    "We don't just talk AI. We deliver it. Enterprise AI consulting that moves from strategy to production — without the pilot purgatory.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    siteName: "Imaginary Space",
    title: "Imaginary Space — AI & Automation Consulting",
    description:
      "Enterprise AI consulting that moves from strategy to production — without the pilot purgatory.",
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Imaginary Space — AI & Automation Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imaginary Space — AI & Automation Consulting",
    description: "We don't just talk AI. We deliver it.",
    images: ["/twitter-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={funnelDisplay.variable}
    >
      <body className="antialiased">
        <a href="#main-content" className="skip-nav">
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <PageWrapper>
            <main id="main-content">{children}</main>
          </PageWrapper>
          <Footer />
          <Analytics />
        </MotionProvider>
      </body>
    </html>
  );
}
