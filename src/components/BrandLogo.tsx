const LOGO_SRC = "/images/mbn-logo.png";

type BrandLogoSize = "header" | "brand";

const sizeClasses: Record<BrandLogoSize, string> = {
  header: "h-8 w-auto sm:h-9",
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
      className={`flex shrink-0 items-center rounded-lg border border-electric-primary/25 bg-mbn-panel/90 px-2 py-1 shadow-[0_0_18px_rgba(0,174,239,0.1)] ${
        size === "brand" ? "px-3 py-1.5" : ""
      }`}
    >
      {image}
    </div>
  );
}
