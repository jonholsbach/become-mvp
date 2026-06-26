import Link from "next/link";
import { FogLayer } from "@/components/atmosphere/FogLayer";
import { LogoWatermark } from "@/components/atmosphere/LogoWatermark";
import { SignalFlow } from "@/components/atmosphere/SignalFlow";
import { WildernessBackdrop } from "@/components/atmosphere/WildernessBackdrop";
import { UnknownMetric } from "@/components/member/FogReveal";

export default function EnterPage() {
  return (
    <WildernessBackdrop variant="forest" className="min-h-[80vh]">
      <LogoWatermark opacity={0.04} />
      <FogLayer density={0.85} />
      <SignalFlow intensity="subtle" />

      <div className="relative mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.25em] text-mbn-steel-dim">
          Mechanical by Nature
        </p>
        <p className="mt-4 text-center font-display text-5xl tracking-tight text-mbn-white sm:text-6xl">
          BECOME
        </p>

        <div className="mt-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-electric-bright">Mission #1</p>
          <h1 className="mt-3 font-display text-3xl text-mbn-white sm:text-4xl">Enter the Body</h1>
          <p className="mt-4 text-lg text-mbn-steel">Push back the fog.</p>
        </div>

        <p className="mx-auto mt-10 max-w-md text-center text-sm leading-relaxed text-mbn-steel-dim">
          Everything is fog. Nothing is known yet. The scan is not a form — it is your first step
          through the territory beneath your skin.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <UnknownMetric label="Center Score" />
          <UnknownMetric label="Current Vector" />
          <UnknownMetric label="Red Territory" />
          <UnknownMetric label="Blue Territory" />
          <UnknownMetric label="Primary Mission" />
        </div>

        <div className="mt-12 text-center">
          <Link href="/assessment" className="btn-primary inline-flex px-10 py-4 text-base">
            Step into the fog
          </Link>
          <p className="mt-4 text-xs text-mbn-steel-dim">11 observations · ~4 minutes · The map forms as you walk</p>
        </div>
      </div>
    </WildernessBackdrop>
  );
}
