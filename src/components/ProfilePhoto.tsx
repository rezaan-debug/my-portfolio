import { UserRound } from "lucide-react";

/**
 * Professional profile area with a subtle, slowly spinning dashed ring.
 * Until a real photo is provided, this shows a clearly marked placeholder.
 */
export function ProfilePhoto({ size = 260 }: { size?: number }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label="Placeholder for Rezaan Achmat Fredericks' profile photo — photo coming soon"
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

      {/* Placeholder portrait */}
      <div className="glass absolute inset-4 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-full">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal/15 via-transparent to-primary/15">
          <UserRound
            className="h-1/3 w-1/3 text-muted-foreground/70"
            aria-hidden="true"
          />
        </div>
        <span className="absolute bottom-6 rounded-full bg-background/80 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Photo coming soon
        </span>
      </div>
    </div>
  );
}
