interface WildernessBackdropProps {
  variant?: "forest" | "mountain" | "river";
  className?: string;
  children?: React.ReactNode;
}

export function WildernessBackdrop({
  variant = "forest",
  className = "",
  children,
}: WildernessBackdropProps) {
  const gradients = {
    forest:
      "from-wilderness-forest/30 via-mbn-bg-alt/50 to-mbn-bg",
    mountain:
      "from-wilderness-mountain/25 via-mbn-navy/40 to-mbn-bg",
    river:
      "from-electric-glow/10 via-wilderness-river/20 to-mbn-bg",
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-b ${gradients[variant]}`} aria-hidden />
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(11, 40, 28, 0.4) 0%, transparent 70%)",
        }}
      />
      <div className="biomechanical-glow left-1/4 top-0 h-64 w-96 bg-electric-glow/8" aria-hidden />
      <div className="biomechanical-glow right-0 top-1/3 h-48 w-48 bg-electric-primary/6" aria-hidden />
      {children}
    </div>
  );
}
