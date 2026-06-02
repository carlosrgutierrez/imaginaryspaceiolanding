export function IsoIdentify({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Magnifying glass — isometric */}
      {/* Lens top face */}
      <ellipse cx="28" cy="20" rx="13" ry="7.5" fill="#bfdbfe" />
      {/* Lens left face */}
      <path d="M15 20 L15 28 L28 35.5 L28 27.5 Z" fill="#60a5fa" />
      {/* Lens right face */}
      <path d="M28 20 L41 12.5 L41 20.5 L28 27.5 Z" fill="#93c5fd" />
      {/* Lens hole top */}
      <ellipse cx="28" cy="20" rx="7.5" ry="4.3" fill="#0a1e3c" />
      {/* Handle — isometric bar */}
      <path d="M38 28 L44 24.5 L50 35 L44 38.5 Z" fill="#93c5fd" />
      <path d="M44 38.5 L44 44 L50 40.5 L50 35 Z" fill="#60a5fa" />
      <path d="M38 28 L44 24.5 L44 38.5 L38 42 Z" fill="#3b82f6" />
    </svg>
  );
}
