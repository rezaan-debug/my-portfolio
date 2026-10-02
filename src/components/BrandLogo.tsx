/**
 * Temporary RA Fredericks emblem placeholder — gold circular border,
 * blue-to-pink gradient disc, interlocking RA monogram.
 * To be replaced with the official brand asset when provided.
 */
export function BrandLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="RA Fredericks emblem"
    >
      <defs>
        <linearGradient id="raf-gradient" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E63C4" />
          <stop offset="55%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#E24BA6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30.5" fill="url(#raf-gradient)" />
      <circle cx="32" cy="32" r="30.5" stroke="#C9A84C" strokeWidth="3" fill="none" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="1"
        fill="#FFFFFF"
      >
        RA
      </text>
    </svg>
  );
}
