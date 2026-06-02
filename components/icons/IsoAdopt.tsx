export function IsoAdopt({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Ascending steps — isometric (low → mid → high, left to right) */}
      {/* Step 1 (left, lowest) */}
      <path d="M4 42 L20 33 L20 52 L4 61 Z" fill="#1d4ed8" />
      <path d="M20 52 L36 43 L36 52 L20 61 Z" fill="#3b82f6" />
      <path d="M4 42 L20 33 L36 43 L20 52 Z" fill="#60a5fa" />

      {/* Step 2 (mid) */}
      <path d="M20 33 L36 24 L36 43 L20 52 Z" fill="#2563eb" />
      <path d="M36 43 L52 34 L52 43 L36 52 Z" fill="#60a5fa" />
      <path d="M20 33 L36 24 L52 34 L36 43 Z" fill="#93c5fd" />

      {/* Step 3 (right, highest) */}
      <path d="M36 24 L52 15 L52 34 L36 43 Z" fill="#3b82f6" />
      <path d="M52 34 L60 29.5 L60 38.5 L52 43 Z" fill="#60a5fa" />
      <path d="M36 24 L52 15 L60 19.5 L52 24 L44 19.5 L36 24 Z" fill="#bfdbfe" />
    </svg>
  );
}
