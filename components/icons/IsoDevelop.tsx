export function IsoDevelop({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Stacked layers — isometric */}
      {/* Bottom layer */}
      <path d="M8 44 L32 57 L56 44 L32 31 Z" fill="#1e3a5f" />
      <path d="M8 44 L8 50 L32 63 L32 57 Z" fill="#1d4ed8" />
      <path d="M56 44 L56 50 L32 63 L32 57 Z" fill="#3b82f6" />
      {/* Middle layer */}
      <path d="M8 34 L32 47 L56 34 L32 21 Z" fill="#2563eb" />
      <path d="M8 34 L8 40 L32 53 L32 47 Z" fill="#1d4ed8" />
      <path d="M56 34 L56 40 L32 53 L32 47 Z" fill="#60a5fa" />
      {/* Top layer */}
      <path d="M8 24 L32 37 L56 24 L32 11 Z" fill="#93c5fd" />
      <path d="M8 24 L8 30 L32 43 L32 37 Z" fill="#3b82f6" />
      <path d="M56 24 L56 30 L32 43 L32 37 Z" fill="#bfdbfe" />
    </svg>
  );
}
