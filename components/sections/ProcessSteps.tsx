"use client";

import Link from "next/link";
import { CircleDot, Layers, Hexagon, type LucideIcon } from "lucide-react";
import FadeInView from "@/components/animations/FadeInView";
import BrandMark from "@/components/ui/BrandMark";
import Button from "@/components/ui/Button";
import { PROCESS_SECTION } from "@/lib/constants";

const STEP_ICONS: LucideIcon[] = [CircleDot, Layers, Hexagon];

function ProcessStepCard({
  step,
  icon: Icon,
}: {
  step: (typeof PROCESS_SECTION.steps)[number];
  icon: LucideIcon;
}) {
  const href = `/services#${step.serviceTab}`;

  return (
    <Link
      href={href}
      className="group flex-1 rounded-card-lg border border-accent/25 bg-bg-card/90 p-6 transition-all duration-300 hover:border-accent hover:shadow-[0_0_28px_rgba(96,165,250,0.14)] focus:outline-none focus-visible:border-accent sm:p-8 lg:p-10"
      aria-label={`${step.title} — view on Services`}
    >
      <div className="flex gap-5 sm:gap-6 lg:gap-8">
        <Icon
          strokeWidth={1}
          className="mt-0.5 h-10 w-10 shrink-0 text-white/85 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
          aria-hidden
        />

        <div className="min-w-0 flex-1">
          <h3 className="font-sans text-xl font-normal tracking-tight text-text-primary sm:text-2xl lg:text-[1.75rem]">
            {step.title}
            <span
              className="ml-1.5 inline-block text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            >
              &gt;
            </span>
          </h3>

          <p className="mt-4 font-sans text-sm leading-relaxed text-text-secondary/90 sm:mt-5 sm:text-base">
            {step.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function ProcessSteps() {
  return (
    <section className="scroll-process-handoff relative bg-bg-primary pb-[7.5rem] pt-[5.5rem] sm:pt-[6.5rem] lg:pt-[7.5rem]">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        <FadeInView className="mb-14 flex flex-col items-center text-center lg:mb-20">
          <h2 className="max-w-3xl font-serif text-4xl text-text-primary sm:text-5xl lg:text-6xl">
            {PROCESS_SECTION.title}
          </h2>

          <div className="mt-8 flex w-full max-w-md items-center gap-4 sm:mt-10">
            <div className="h-px flex-1 bg-white/10" aria-hidden />
            <BrandMark size="sm" />
            <div className="h-px flex-1 bg-white/10" aria-hidden />
          </div>
        </FadeInView>

        <div className="mx-auto flex max-w-5xl flex-col gap-12 sm:gap-14 lg:max-w-6xl lg:gap-20">
          {PROCESS_SECTION.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];

            return (
              <FadeInView key={step.number} delay={i * 0.12}>
                <div className="flex items-center gap-5 sm:gap-6 lg:gap-8">
                  <div
                    className="process-step-number w-14 shrink-0 select-none text-center font-serif text-[4.5rem] tabular sm:w-16 sm:text-[5.5rem] lg:w-20 lg:text-[7rem]"
                    aria-hidden
                  >
                    {step.number}
                  </div>

                  <ProcessStepCard step={step} icon={Icon} />
                </div>
              </FadeInView>
            );
          })}
        </div>

        <FadeInView delay={0.35} className="mt-16 flex justify-center lg:mt-24">
          <Link href={PROCESS_SECTION.ctaHref}>
            <Button variant="light" size="lg">
              {PROCESS_SECTION.ctaLabel} &rarr;
            </Button>
          </Link>
        </FadeInView>
      </div>
    </section>
  );
}
