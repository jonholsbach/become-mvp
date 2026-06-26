import Link from "next/link";
import { FogLayer } from "./FogLayer";

export function MemberPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5">
      <div className="relative bg-mbn-panel/60 p-6 sm:p-8">
        <div className="grid gap-3 opacity-40 blur-[1px] sm:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-mbn-navy/50 p-4">
            <p className="text-xs text-mbn-steel">Body Map</p>
            <div className="mt-2 flex gap-1">
              <span className="h-2 w-8 rounded-full bg-red-500/40" />
              <span className="h-2 w-8 rounded-full bg-electric-primary/40" />
              <span className="h-2 w-8 rounded-full bg-electric-bright/30" />
            </div>
          </div>
          <div className="rounded-xl border border-electric-primary/20 bg-electric-glow/5 p-4">
            <p className="text-xs text-electric-bright">Territory</p>
            <p className="mt-1 font-display text-lg text-mbn-white">Unknown paths</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-mbn-panel/40 p-4 sm:col-span-2">
            <p className="text-xs text-mbn-steel">Mission #1</p>
            <p className="mt-1 text-sm text-mbn-white">Enter the Body — signal forming</p>
          </div>
        </div>
        <FogLayer density={0.75} animated />
        <div className="relative mt-6 text-center">
          <p className="text-sm text-mbn-steel">Step into the fog.</p>
          <Link href="/enter" className="btn-primary mt-4 inline-flex text-sm">
            Enter the Body
          </Link>
        </div>
      </div>
    </div>
  );
}
