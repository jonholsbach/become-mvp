interface ProfileCardProps {
  label: string;
  value: string;
  description?: string;
  accent?: boolean;
}

export function ProfileCard({ label, value, description, accent }: ProfileCardProps) {
  return (
    <div
      className={`glass-panel p-5 sm:p-6 ${
        accent ? "border-electric-primary/30 bg-electric-glow/5 shadow-glow-sm" : ""
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-mbn-steel-dim">{label}</p>
      <p className="mt-2 font-display text-xl text-mbn-white sm:text-2xl">{value}</p>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-mbn-steel">{description}</p>
      )}
    </div>
  );
}
