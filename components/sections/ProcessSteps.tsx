"use client";

import Link from "next/link";
import FadeInView from "@/components/animations/FadeInView";
import RevealHeading from "@/components/animations/RevealHeading";
import Button from "@/components/ui/Button";
import { PROCESS_SECTION } from "@/lib/constants";
import { IsoIdentify } from "@/components/icons/IsoIdentify";
import { IsoDevelop } from "@/components/icons/IsoDevelop";
import { IsoAdopt } from "@/components/icons/IsoAdopt";

type IsoIcon = ({ className }: { className?: string }) => React.ReactElement;
const STEP_ICONS: IsoIcon[] = [IsoIdentify, IsoDevelop, IsoAdopt];

function ProcessStepCard({
  step,
  icon: Icon,
  index,
}: {
  step: (typeof PROCESS_SECTION.steps)[number];
  icon: IsoIcon;
  index: number;
}) {
  const href = `/services#${step.serviceTab}`;

  return (
    <Link
      href={href}
      className="group flex flex-1 flex-col border border-white/10 bg-bg-card/60 p-7 transition-all duration-300 hover:border-accent/60 hover:bg-bg-card focus:outline-none focus-visible:border-accent sm:p-8 lg:p-10"
      aria-label={`${step.title} — view on Services`}
    >
      {/* Number + icon row */}
      <div className="mb-6 flex items-start justify-between">
        <div
          className="process-step-number select-none font-serif text-[3.5rem] tabular leading-none lg:text-[4.5rem]"
          aria-hidden
        >
          {step.number}
        </div>
        <Icon className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
      </div>

      {/* Title */}
      <h3 className="font-sans text-xl font-normal tracking-tight text-text-primary sm:text-2xl">
        {step.title}
        <span
          className="ml-1.5 inline-block text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        >
          &gt;
        </span>
      </h3>

      {/* Description */}
      <p className="mt-4 font-sans text-sm leading-relaxed text-text-secondary/80 sm:text-base">
        {step.description}
      </p>
    </Link>
  );
}

export default function ProcessSteps() {
  return (
    <section className="relative bg-bg-primary pb-[7.5rem] pt-[5.5rem] sm:pt-[6.5rem] lg:pt-[7.5rem]">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        <FadeInView className="mx-auto mb-14 flex max-w-6xl items-center justify-between gap-6 lg:mb-20">
          <RevealHeading
            lines={["Three things. Every time."]}
            className="font-serif text-3xl text-text-primary sm:text-4xl"
          />
          <Link href={PROCESS_SECTION.ctaHref} className="shrink-0">
            <Button
              variant="ghost"
              size="lg"
              className="bg-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary"
            >
              Explore services &rarr;
            </Button>
          </Link>
        </FadeInView>

        {/* 3-column row — no gap so borders collapse into dividers */}
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row">
          {PROCESS_SECTION.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <FadeInView key={step.number} delay={i * 0.1} className="flex flex-1">
                <ProcessStepCard step={step} icon={Icon} index={i} />
              </FadeInView>
            );
          })}
        </div>

      </div>
    </section>
  );
}
