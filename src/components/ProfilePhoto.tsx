import photo from "@/assets/professional-photo.jpg.asset.json";

/**
 * Professional profile area with a subtle, slowly spinning dashed ring.
 * Displays Rezaan's supplied professional photo.
 */
export function ProfilePhoto({ size = 260 }: { size?: number }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Spinning dashed ring */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="spin-slow absolute inset-0 h-full w-full"
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="0.7"
          strokeDasharray="3.2 2.4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-teal)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
      </svg>

      <img
        src={photo.url}
        alt="Rezaan Achmat Fredericks"
        width={size}
        height={size}
        className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-full border border-border/60 object-cover object-center shadow-lg"
      />
    </div>
  );
}
