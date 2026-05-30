import Image from "next/image";
import type { HeroClient } from "@/lib/constants";

export default function HeroClientLogos({
  clients,
}: {
  clients: readonly HeroClient[];
}) {
  return (
    <div className="flex w-full justify-center px-2 sm:px-4">
      <ul
        className="hero-client-logos flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:flex-nowrap sm:justify-between sm:gap-x-0 lg:max-w-7xl xl:max-w-[52rem]"
        aria-label="Trusted by"
      >
        {clients.map((client) => (
          <li
            key={client.slug}
            className="flex shrink-0 items-center justify-center px-1 sm:px-2"
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={200}
              height={64}
              className={`hero-client-logo w-auto object-contain ${client.logoClass ?? "h-6 max-w-[7rem] sm:h-7 sm:max-w-[8rem]"}`}
              unoptimized
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
