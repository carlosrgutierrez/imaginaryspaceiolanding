import Link from "next/link";
import FadeInView from "@/components/animations/FadeInView";
import Button from "@/components/ui/Button";

export default function CTAFooter() {
  return (
    <section
      className="py-32 lg:py-40"
      style={{ background: "var(--gradient-cta)" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 text-center">
        <FadeInView className="mb-7">
          <h2 className="font-serif text-4xl lg:text-[40px] text-text-primary leading-[1.1]">
            Let&apos;s build something
            <br />
            that actually ships.
          </h2>
        </FadeInView>

        <FadeInView delay={0.15}>
          <Link href="/work-with-us">
            <Button variant="outline" size="lg">
              Get in Touch &rarr;
            </Button>
          </Link>
        </FadeInView>
      </div>
    </section>
  );
}
