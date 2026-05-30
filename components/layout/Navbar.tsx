"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 lg:h-[4.5rem] flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-9 lg:gap-10 ml-auto">
            <nav className="flex items-center gap-9 lg:gap-10">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`font-sans text-sm transition-colors ${
                    pathname.startsWith(href)
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <Link href="/work-with-us">
              <Button variant="light" size="sm" className="gap-1.5">
                Get in Touch
                <ChevronRight size={14} strokeWidth={2.5} aria-hidden />
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-text-primary p-1 -mr-1 ml-auto"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-bg-primary flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16">
              <Logo onClick={() => setMobileOpen(false)} />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="text-text-primary p-1 -mr-1"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.08 }}
                >
                  <Link
                    href={href}
                    className="font-serif text-5xl text-text-primary hover:text-accent transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + NAV_LINKS.length * 0.08 }}
              >
                <Link href="/work-with-us" onClick={() => setMobileOpen(false)}>
                  <Button variant="light" size="md" className="gap-1.5">
                    Get in Touch
                    <ChevronRight size={16} strokeWidth={2.5} aria-hidden />
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
