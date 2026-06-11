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
      className="group relative flex min-h-[22rem] flex-1 flex-col justify-between border border-white/10 bg-bg-card/60 px-7 py-7 transition-all duration-500 hover:border-accent/60 hover:bg-bg-card focus:outline-none focus-visible:border-accent sm:min-h-[24rem] sm:px-8 sm:py-8 lg:min-h-[26rem] lg:px-10 lg:py-10"
      aria-label={`${step.title}, view on Services`}
    >
      {/* Top — number + icon, always visible */}
      <div className="flex items-start justify-between">
        <div
          className="process-step-number select-none font-serif text-[3.5rem] tabular leading-none lg:text-[4.5rem]"
          aria-hidden
        >
          {step.number}
        </div>
        <Icon className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
      </div>

      {/* Bottom — title visible, description expands below on hover */}
      <div className="mt-auto">
        <h3 className="font-sans text-xl font-normal tracking-tight text-text-primary sm:text-2xl">
          {step.title}
        </h3>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-5 font-sans text-sm leading-relaxed text-text-secondary/80 sm:text-base">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProcessSteps() {
  return (
    <section className="relative border-b border-t border-white/10 bg-bg-primary pb-[7.5rem] pt-[7.5rem]">

      {/* Full-height column dividers — spans entire section top-to-bottom */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="mx-auto flex h-full max-w-screen-xl px-6 lg:px-8">
            <div className="mx-auto flex h-full w-full max-w-6xl border-l border-r border-white/10">
            <div className="flex-1 border-r border-white/10" />
            <div className="flex-1 border-r border-white/10" />
            <div className="flex-1" />
          </div>
        </div>
      </div>

      {/* Heading row — padded */}
      <div className="relative mx-auto max-w-screen-xl px-6 lg:px-8">
        <FadeInView className="mx-auto flex max-w-6xl items-center justify-between py-10">
          <RevealHeading
            nowrap
            className="font-serif text-2xl tracking-[-0.01em] text-text-primary sm:text-[2rem]"
          >
            {PROCESS_SECTION.title}
          </RevealHeading>
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
      </div>

      {/* Full-width horizontal divider between heading and cards */}
      <div className="border-b border-white/10" />

      {/* Cards — padded */}
      <div className="relative mx-auto max-w-screen-xl px-6 lg:px-8">
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

      {/* Full-width horizontal divider below cards */}
      <div className="border-b border-white/10" />
    </section>
  );
}
