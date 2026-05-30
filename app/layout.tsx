import type { Metadata, Viewport } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import MotionProvider from "@/components/layout/MotionProvider";
import Analytics from "@/components/layout/Analytics";
import { SITE_URL } from "@/lib/constants";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
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
  title: {
    default: "Imaginary Space — AI & Automation Consulting",
    template: "%s | Imaginary Space",
  },
  description:
    "We don't just talk AI. We deliver it. Enterprise AI consulting that moves from strategy to production — without the pilot purgatory.",
  openGraph: {
    type: "website",
    siteName: "Imaginary Space",
    title: "Imaginary Space — AI & Automation Consulting",
    description:
      "Enterprise AI consulting that moves from strategy to production — without the pilot purgatory.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imaginary Space — AI & Automation Consulting",
    description: "We don't just talk AI. We deliver it.",
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
      className={`${poppins.variable} ${plusJakartaSans.variable}`}
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
