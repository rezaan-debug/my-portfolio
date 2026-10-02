import brandLogo from "@/assets/brand-logo.png.asset.json";

export function BrandLogo({ size = 40 }: { size?: number }) {
  return (
    <img
      src={brandLogo.url}
      width={size}
      height={size}
      alt="RA Fredericks logo"
      className="shrink-0 object-contain"
    />
  );
}
