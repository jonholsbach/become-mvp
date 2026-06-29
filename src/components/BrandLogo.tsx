import { NAV_LOGO } from "@/lib/brand-assets";

const LOGO_SRC = NAV_LOGO.path;

type BrandLogoSize = "header" | "brand";

const sizeClasses: Record<BrandLogoSize, string> = {
  header: "h-9 w-auto sm:h-10",
  brand: "h-12 w-auto sm:h-14",
};

interface BrandLogoProps {
  size?: BrandLogoSize;
  framed?: boolean;
  priority?: boolean;
  className?: string;
}

export function BrandLogo({
  size = "header",
  framed = true,
  priority = false,
  className = "",
}: BrandLogoProps) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="Mechanical by Nature"
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={`object-contain ${sizeClasses[size]} ${className}`}
    />
  );

  if (!framed) {
    return image;
  }

  return (
    <div
      className={`flex shrink-0 items-center rounded-lg border border-electric-primary/25 bg-transparent px-2.5 py-1.5 ${
        size === "brand" ? "px-3 py-1.5" : ""
      }`}
    >
      {image}
    </div>
  );
}
