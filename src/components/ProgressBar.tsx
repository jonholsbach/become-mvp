interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex justify-between text-xs text-mbn-steel-dim">
          <span>{label}</span>
          <span>
            {current} of {total}
          </span>
        </div>
      )}
      <div className="h-1.5 overflow-hidden rounded-full bg-mbn-navy">
        <div
          className="h-full rounded-full bg-gradient-to-r from-electric-glow to-electric-bright transition-all duration-500 ease-out shadow-glow-sm"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
