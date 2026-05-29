import FadeInView from "@/components/animations/FadeInView";
import SectionLabel from "@/components/ui/SectionLabel";
import BrandMark from "@/components/ui/BrandMark";
import { Search, Wrench, Users } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Identify",
    description:
      "We audit your operations and map every workflow where AI can create measurable leverage. No guesswork — just a ranked list of opportunities by impact and feasibility.",
    detail: [
      "Current-state process mapping",
      "AI opportunity prioritisation",
      "ROI modelling per use case",
      "Executive alignment workshop",
    ],
  },
  {
    number: "02",
    icon: Wrench,
    title: "Develop",
    description:
      "We build the solution — whether that's a custom AI agent, an automation pipeline, or an LLM integration — using the best available tools for your specific context.",
    detail: [
      "Rapid prototyping in 2-week sprints",
      "Custom model fine-tuning where needed",
      "Integration with your existing stack",
      "Security and compliance review",
    ],
  },
  {
    number: "03",
    icon: Users,
    title: "Adopt",
    description:
      "We don't hand you a tool and disappear. We train your team, measure usage, iterate on feedback, and stay until the solution is embedded in your daily operations.",
    detail: [
      "Team onboarding and change management",
      "Usage dashboards and success metrics",
      "Ongoing iteration and improvement",
      "Dedicated support post-launch",
    ],
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-[7.5rem] border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <FadeInView className="flex items-center gap-4 mb-6">
          <BrandMark size="sm" />
          <div className="h-px flex-1 bg-white/8" />
          <SectionLabel>Our Process</SectionLabel>
          <div className="h-px flex-1 bg-white/8" />
        </FadeInView>

        <FadeInView delay={0.1} className="text-center mb-20">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-text-primary">
            Our days consist of three things.
          </h2>
        </FadeInView>

        {/* Steps — each flies in from the right with stagger */}
        <div className="flex flex-col gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeInView
                key={step.number}
                direction="left"
                distance={80}
                delay={i * 0.18}
              >
                <div className="flex gap-3 sm:gap-6 lg:gap-10 items-start">
                  {/* Fixed-width number column — tabular-nums prevents per-digit width drift */}
                  <div
                    className="shrink-0 w-12 sm:w-16 lg:w-24 text-right font-serif text-5xl sm:text-6xl lg:text-8xl leading-none select-none tabular"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(96,165,250,0.3)",
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-bg-card border border-white/8 rounded-card-lg p-7 lg:p-10 hover:border-white/16 transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} className="text-accent" />
                      </div>
                      <h3 className="font-serif text-2xl lg:text-3xl text-text-primary pt-0.5">
                        {step.title}
                      </h3>
                    </div>

                    <p className="font-sans text-text-secondary text-base leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <ul className="grid sm:grid-cols-2 gap-2">
                      {step.detail.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 font-sans text-sm text-text-muted"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
