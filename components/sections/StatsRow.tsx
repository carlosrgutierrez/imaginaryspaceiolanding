import FadeInView from "@/components/animations/FadeInView";
import CountUp from "@/components/animations/CountUp";
import { STATS } from "@/lib/constants";

export default function StatsRow() {
  return (
    <section className="border-hatch border-hatch-bottom">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch md:grid-cols-3">
          {STATS.map((stat, i) => (
            <FadeInView
              key={stat.label}
              delay={i * 0.1}
              className={`flex flex-col items-center justify-center py-16 text-center ${
                i > 0 ? "md:border-l md:border-white/10 max-md:border-t max-md:border-white/10" : ""
              }`}
            >
              <div className="font-serif text-[52px] leading-none text-text-primary tabular">
                {"display" in stat ? (
                  stat.display
                ) : (
                  <CountUp target={stat.target} suffix={stat.suffix} />
                )}
              </div>
              <div className="font-sans text-xs text-text-muted uppercase tracking-[0.14em] mt-3.5">
                {stat.label}
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
