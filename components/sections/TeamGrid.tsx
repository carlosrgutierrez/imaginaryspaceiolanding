import Image from "next/image";
import FadeInView from "@/components/animations/FadeInView";
import SectionLabel from "@/components/ui/SectionLabel";
import { TEAM_MEMBERS } from "@/lib/constants";

export default function TeamGrid() {
  return (
    <section className="py-[7.5rem] border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <FadeInView className="mb-14">
          <SectionLabel>The Team</SectionLabel>
        </FadeInView>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {TEAM_MEMBERS.map((member, i) => (
            <FadeInView key={member.name} delay={i * 0.08}>
              <div className="flex flex-col gap-4">
                <div
                  className={`relative aspect-[3/4] rounded-card overflow-hidden bg-gradient-to-br ${member.gradient}`}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                <div>
                  <p className="font-sans font-semibold text-text-primary text-sm">
                    {member.name}
                  </p>
                  <p className="font-sans text-text-muted text-xs mt-0.5">
                    {member.title}
                  </p>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
