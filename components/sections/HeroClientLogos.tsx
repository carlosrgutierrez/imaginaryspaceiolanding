import Image from "next/image";
import type { HeroClient } from "@/lib/constants";

export default function HeroClientLogos({
  clients,
}: {
  clients: readonly HeroClient[];
}) {
  return (
    <ul
      className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:flex-nowrap sm:justify-between"
      aria-label="Trusted by"
    >
      {clients.map((client) => (
        <li
          key={client.slug}
          className="flex shrink-0 items-center justify-center"
        >
          <Image
            src={client.logo}
            alt={client.name}
            width={200}
            height={64}
            className={`w-auto object-contain opacity-35 transition-opacity duration-300 hover:opacity-60 ${
              client.logoClass ?? "h-6 max-w-[7rem] sm:h-7 sm:max-w-[8rem]"
            }`}
            unoptimized
          />
        </li>
      ))}
    </ul>
  );
}
