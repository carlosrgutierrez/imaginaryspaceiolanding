import Image from "next/image";
import type { HeroClient } from "@/lib/constants";

export default function HeroClientLogos({
  clients,
}: {
  clients: readonly HeroClient[];
}) {
  return (
    <ul
      className="hero-client-logos mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4 sm:gap-x-16 lg:max-w-6xl lg:gap-x-20"
      aria-label="Trusted by"
    >
      {clients.map((client) => (
        <li
          key={client.slug}
          className="flex h-12 items-center justify-center sm:h-14"
        >
          <Image
            src={client.logo}
            alt={client.name}
            width={160}
            height={48}
            className={`hero-client-logo w-auto object-contain ${client.logoClass ?? "h-5 max-w-[6.5rem] sm:h-6 sm:max-w-[7.5rem]"}`}
            unoptimized
          />
        </li>
      ))}
    </ul>
  );
}
