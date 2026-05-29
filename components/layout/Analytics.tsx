"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const CONSENT_KEY = "is-analytics-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const PRIVACY_URL = "https://www.imaginaryspace.ai/privacy-notice";

type Consent = "granted" | "denied";

function readConsent(): Consent | null {
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "granted" || value === "denied") return value;
  return null;
}

export default function Analytics() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setMounted(true);
  }, []);

  function save(next: Consent) {
    localStorage.setItem(CONSENT_KEY, next);
    setConsent(next);
  }

  if (!GA_ID) return null;

  const showBanner = mounted && consent === null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-bg-primary/95 backdrop-blur-md px-6 py-4"
        >
          <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <p className="font-sans text-sm text-text-secondary leading-relaxed flex-1">
              We use analytics cookies to understand how visitors use our site.{" "}
              <Link
                href={PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Privacy notice
              </Link>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => save("denied")}
                className="font-sans text-sm text-text-muted hover:text-text-primary px-4 py-2 rounded-lg border border-white/10 transition-colors"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => save("granted")}
                className="font-sans text-sm font-medium text-bg-primary bg-accent-grad px-4 py-2 rounded-lg transition-[filter] hover:brightness-110"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
