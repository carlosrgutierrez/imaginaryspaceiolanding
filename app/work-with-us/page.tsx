import type { Metadata } from "next";
import ContactSplit from "@/components/sections/ContactSplit";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Ready to transform your business with AI? Tell us about your project and we'll get back to you within one business day. No obligations, no sales pressure.",
  openGraph: {
    title: "Work With Us — Start Your AI Journey",
    description:
      "No obligations, no sales pressure. Just an honest conversation about whether we're the right fit.",
  },
};

export default function WorkWithUsPage() {
  return <ContactSplit />;
}
