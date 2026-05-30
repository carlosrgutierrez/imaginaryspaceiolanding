import Image from "next/image";
import FadeInView from "@/components/animations/FadeInView";
import { TEAM_LEADS } from "@/lib/constants";

export default function LeadershipCards() {
  return (
    <section className="py-[7.5rem] border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {TEAM_LEADS.map((leader, i) => {
            const isEven = i % 2 === 0;
            return (
              <FadeInView key={leader.lastName} delay={0.1}>
                <div
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    !isEven ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  <div className={!isEven ? "lg:[direction:ltr]" : ""}>
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-accent mb-3">
                      {leader.title}
                    </p>
                    <h2 className="font-serif text-4xl lg:text-5xl text-text-primary mb-6">
                      {leader.firstName}{" "}
                      <span className="text-accent">{leader.lastName}</span>
                    </h2>
                    <p className="font-sans text-text-secondary text-[15px] leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>

                  <div
                    className={`relative rounded-card-lg overflow-hidden aspect-[4/5] bg-gradient-to-br ${leader.gradient} ${
                      !isEven ? "lg:[direction:ltr]" : ""
                    }`}
                  >
                    <Image
                      src={leader.photo}
                      alt={`${leader.firstName} ${leader.lastName}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 480px"
                    />
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
