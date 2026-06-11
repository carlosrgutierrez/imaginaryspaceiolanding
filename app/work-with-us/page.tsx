import type { Metadata } from "next";
import ContactSplit from "@/components/sections/ContactSplit";

import { SEO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Work With Us",
  description: SEO.contactDescription,
  openGraph: {
    title: "Work With Us",
    description: SEO.contactDescription,
  },
};

export default function WorkWithUsPage() {
  return <ContactSplit />;
}
