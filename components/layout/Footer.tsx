import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-primary">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
          <Logo size="sm" showText={false} />
          <span className="font-sans text-sm text-text-muted">
            &copy; 2025 Imaginary Space. All rights reserved.
          </span>
        </div>

        <nav className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...("external" in link && link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="font-sans text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
