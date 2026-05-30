"use client";

import Link from "next/link";
import FadeInView from "@/components/animations/FadeInView";
import Button from "@/components/ui/Button";
import { CTA_SECTION } from "@/lib/constants";

const LINE_TONE: Record<
  (typeof CTA_SECTION.lines)[number]["tone"],
  string
> = {
  primary: "text-text-primary",
  mid: "text-accent-light",
  accent: "text-accent",
};

export default function CTAFooter() {
  return (
    <section
      className="py-32 lg:py-40"
      style={{ background: "var(--gradient-cta)" }}
    >
      <div className="mx-auto max-w-screen-xl px-6 text-center lg:px-8">
        <div className="mb-10 flex flex-col items-center gap-1 sm:gap-2">
          {CTA_SECTION.lines.map((line, i) => (
            <FadeInView
              key={line.text}
              delay={i * 0.1}
              duration={0.75}
              distance={32}
              className="w-full"
            >
              <p
                className={`font-serif text-3xl leading-[1.2] sm:text-4xl lg:text-[2.75rem] ${LINE_TONE[line.tone]}`}
              >
                {line.text}
              </p>
            </FadeInView>
          ))}
        </div>

        <FadeInView delay={0.28} duration={0.8} distance={32}>
          <Link href={CTA_SECTION.ctaHref}>
            <Button variant="light" size="lg">
              {CTA_SECTION.ctaLabel} &rarr;
            </Button>
          </Link>
        </FadeInView>
      </div>
    </section>
  );
}
