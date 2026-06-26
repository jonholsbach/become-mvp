import type { SkillPath } from "@/lib/domain/skills";

const STATUS_LABELS: Record<SkillPath["status"], string> = {
  locked: "Locked",
  approaching: "Approaching",
  ready: "Ready",
  active: "Active",
};

const STATUS_COLORS: Record<SkillPath["status"], string> = {
  locked: "border-white/5 text-mbn-steel-dim",
  approaching: "border-electric-glow/20 text-electric-bright",
  ready: "border-electric-primary/40 text-electric-bright",
  active: "border-electric-primary/50 text-mbn-white",
};

interface SkillPathCardProps {
  skill: SkillPath;
}

export function SkillPathCard({ skill }: SkillPathCardProps) {
  return (
    <div className={`glass-panel border p-5 ${STATUS_COLORS[skill.status]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-mbn-steel-dim">{skill.category}</p>
          <h3 className="mt-1 font-semibold text-mbn-white">{skill.name}</h3>
        </div>
        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium">
          {STATUS_LABELS[skill.status]}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-mbn-steel-dim">
          <span>Readiness</span>
          <span>{skill.readiness}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mbn-navy">
          <div
            className="h-full rounded-full bg-gradient-to-r from-electric-glow to-electric-bright transition-all"
            style={{ width: `${skill.readiness}%` }}
          />
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs">
        <p>
          <span className="text-electric-bright">Territory: </span>
          <span className="text-mbn-steel">{skill.requiredTerritory.join(" · ")}</span>
        </p>
        <p>
          <span className="text-electric-bright">Tradeoff: </span>
          <span className="text-mbn-steel-dim">{skill.tradeoffs}</span>
        </p>
        {skill.futureUnlocks.length > 0 && (
          <p>
            <span className="text-electric-bright">Unlocks: </span>
            <span className="text-mbn-steel">{skill.futureUnlocks.join(", ")}</span>
          </p>
        )}
      </div>
    </div>
  );
}
