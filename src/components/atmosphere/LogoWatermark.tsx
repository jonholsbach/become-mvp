import { BrandLogo } from "@/components/BrandLogo";

interface LogoWatermarkProps {
  className?: string;
  opacity?: number;
}

export function LogoWatermark({ className = "", opacity = 0.06 }: LogoWatermarkProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="relative" style={{ opacity }}>
        <BrandLogo size="brand" framed={false} className="!h-48 !w-auto sm:!h-72 lg:!h-96" />
        <div className="absolute inset-0 bg-glow-radial blur-2xl" />
      </div>
    </div>
  );
}
