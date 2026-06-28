interface ViewportSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  align?: "center" | "start";
  snap?: boolean;
}

export function ViewportSection({
  children,
  id,
  className = "",
  align = "center",
  snap = true,
}: ViewportSectionProps) {
  return (
    <section
      id={id}
      className={`flex min-h-[100svh] flex-col justify-center px-6 py-24 ${
        align === "center" ? "items-center text-center" : "items-start"
      } ${snap ? "snap-start snap-always" : ""} ${className}`}
    >
      <div className={`mx-auto w-full ${align === "center" ? "max-w-3xl" : "max-w-4xl"}`}>
        {children}
      </div>
    </section>
  );
}
