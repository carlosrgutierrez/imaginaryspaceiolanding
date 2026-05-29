import FadeInView from "@/components/animations/FadeInView";
import Card from "@/components/ui/Card";

const TESTIMONIALS = [
  {
    quote:
      "Imaginary Space didn't just build us a tool — they transformed how our entire operations team thinks about automation. The ROI was visible within 60 days.",
    name: "James Thornton",
    role: "Chief Operations Officer",
    company: "Meridian Health Group",
  },
  {
    quote:
      "We'd tried three other AI vendors before Imaginary Space. They were the first team that actually understood our business problem before writing a single line of code.",
    name: "Priya Nair",
    role: "VP of Technology",
    company: "Apex Logistics",
  },
  {
    quote:
      "The level of execution is rare. They delivered in weeks what we were planning to spend a year building. Our team now uses it every single day.",
    name: "Marcus Webb",
    role: "Head of Digital Transformation",
    company: "Sable Financial",
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-[7.5rem]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <FadeInView className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl text-text-primary">
            Don&apos;t just take our word for{" "}
            <span className="italic">it.</span>
          </h2>
        </FadeInView>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeInView key={t.name} delay={i * 0.12}>
              <Card className="p-7 lg:p-8 h-full flex flex-col justify-between gap-8">
                <p className="font-sans text-text-secondary text-[15px] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-white/8 pt-5">
                  <div className="font-sans font-semibold text-text-primary text-sm">
                    {t.name}
                  </div>
                  <div className="font-sans text-text-muted text-xs mt-0.5">
                    {t.role} &mdash; {t.company}
                  </div>
                </div>
              </Card>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
