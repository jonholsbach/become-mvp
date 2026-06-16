import Link from "next/link";

interface PageShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  maxWidth?: "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl";
}

const maxWidthClasses = {
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
};

export function PageShell({
  children,
  title,
  subtitle,
  backHref,
  backLabel = "Back",
  maxWidth = "4xl",
}: PageShellProps) {
  return (
    <div className={`mx-auto px-6 py-10 sm:py-14 ${maxWidthClasses[maxWidth]}`}>
      {backHref && (
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-1 text-sm text-mbn-steel transition-colors hover:text-electric-bright"
        >
          <span aria-hidden>←</span> {backLabel}
        </Link>
      )}
      {(title || subtitle) && (
        <header className="mb-8 sm:mb-10">
          {title && (
            <h1 className="font-display text-3xl tracking-tight text-mbn-white sm:text-4xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-mbn-steel sm:text-lg">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  );
}
