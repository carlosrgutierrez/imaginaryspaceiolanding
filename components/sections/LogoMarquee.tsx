import { MARQUEE_CLIENTS } from "@/lib/constants";

const doubled = [...MARQUEE_CLIENTS, ...MARQUEE_CLIENTS];

export default function LogoMarquee() {
  return (
    <section className="py-16 border-y border-white/5 overflow-hidden">
      <p className="font-sans text-text-muted text-[10px] uppercase tracking-[0.28em] text-center mb-10">
        Trusted by innovative companies
      </p>

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div className="flex animate-marquee w-max gap-16 items-center">
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap select-none"
            >
              <div className="w-5 h-5 rounded-sm bg-white/10 shrink-0" />
              <span className="font-sans font-semibold text-xl text-text-muted/55 tracking-[0.01em]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
