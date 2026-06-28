import Link from "next/link";
import { VolumetricFog } from "@/components/atmosphere/VolumetricFog";
import { ViewportSection } from "@/components/layout/ViewportSection";

export function HeroBecomeSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-white/5 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-mbn-bg/70 to-mbn-bg" aria-hidden />
      <VolumetricFog mode="journey" focalY="50%" />

      <ViewportSection snap={false} className="relative min-h-[100svh]">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-8 h-px w-24 bg-gradient-to-r from-transparent via-electric-primary/40 to-transparent" />
          <h1 className="font-display text-6xl tracking-tight text-mbn-white sm:text-7xl lg:text-8xl">
            BECOME
          </h1>
          <p className="mt-8 max-w-lg font-display text-2xl leading-snug text-mbn-white sm:text-3xl">
            Enter the Body.
            <br />
            <span className="gradient-text">Push Back the Fog.</span>
          </p>
          <Link
            href="/enter"
            className="btn-primary mt-10 inline-flex px-10 py-4 text-base shadow-glow-sm"
          >
            Enter the Body
          </Link>
        </div>
      </ViewportSection>
    </section>
  );
}
