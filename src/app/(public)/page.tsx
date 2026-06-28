import Link from "next/link";
import { JourneyMap } from "@/components/JourneyMap";
import { HomeCinematic } from "@/components/home/HomeCinematic";
import { FogLayer } from "@/components/atmosphere/FogLayer";
import { MemberPreview } from "@/components/atmosphere/MemberPreview";
import { SignalFlow } from "@/components/atmosphere/SignalFlow";
import { WildernessBackdrop } from "@/components/atmosphere/WildernessBackdrop";
import { ViewportSection } from "@/components/layout/ViewportSection";

export default function LandingPage() {
  return (
    <div className="bg-mbn-bg">
      <HomeCinematic />

      {/* Viewport 3 — The question */}
      <section className="relative border-b border-white/5 bg-mbn-bg">
        <FogLayer density={0.35} />
        <ViewportSection snap={false} className="relative">
          <h2 className="font-display text-3xl leading-snug text-mbn-white sm:text-4xl lg:text-5xl">
            What if your body is actually a map?
          </h2>
          <p className="mt-10 text-lg leading-relaxed text-mbn-steel sm:text-xl">
            Every position you repeat becomes a path. Every path shapes the landscape beneath your
            skin. Most people never realize they are walking the same roads — until the fog begins
            to lift.
          </p>
          <div className="mt-12">
            <MemberPreview />
          </div>
        </ViewportSection>
      </section>

      {/* Viewport 3 — This isn't fitness */}
      <section className="border-b border-white/5 bg-mbn-bg-alt/40">
        <ViewportSection snap={false}>
          <p className="font-display text-3xl leading-snug text-mbn-white sm:text-4xl lg:text-5xl">
            This is not fitness.
          </p>
          <p className="mt-10 text-lg leading-relaxed text-mbn-steel sm:text-xl">
            This is human calibration. Push back the fog. Learn to read the signal. Positions are
            coordinates — and awareness is the compass.
          </p>
        </ViewportSection>
      </section>

      {/* Viewport 4 — Six Pillars */}
      <section className="border-b border-white/5 bg-mbn-bg">
        <ViewportSection snap={false} align="start">
          <p className="text-xs uppercase tracking-widest text-mbn-steel-dim">The journey inward</p>
          <h2 className="mt-4 font-display text-3xl text-mbn-white sm:text-4xl">
            Six pillars. One path.
          </h2>
          <p className="mt-6 max-w-xl text-mbn-steel">
            Each pillar is a lens for reading your body. Together they form the map.
          </p>
          <div className="mt-10 w-full">
            <JourneyMap />
          </div>
        </ViewportSection>
      </section>

      {/* Viewport 5 — Something Hidden Awaits */}
      <WildernessBackdrop variant="forest" className="relative border-b border-white/5">
        <FogLayer density={0.5} />
        <ViewportSection snap={false} className="relative">
          <h2 className="font-display text-3xl text-mbn-white sm:text-4xl lg:text-5xl">
            Something Hidden Awaits
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-mbn-steel sm:text-xl">
            <p>Every path you&apos;ve repeated has shaped the landscape beneath your feet.</p>
            <p>Most people never realize they&apos;re walking the same roads.</p>
            <p className="text-mbn-white">There is another way.</p>
          </div>
        </ViewportSection>
      </WildernessBackdrop>

      {/* Viewport 6 — Invitation */}
      <section className="relative bg-mbn-navy/20">
        <FogLayer density={0.3} />
        <ViewportSection snap={false} className="relative">
          <p className="text-xs uppercase tracking-widest text-electric-bright">Mission 0</p>
          <h2 className="mt-4 font-display text-4xl text-mbn-white sm:text-5xl">
            The System Scan
          </h2>
          <p className="mx-auto mt-8 max-w-md text-lg text-mbn-steel">
            Not a questionnaire. Your first lesson in observation. The map forms as you notice.
          </p>
          <Link href="/enter" className="btn-primary mt-12 inline-flex px-10 py-4 text-base">
            Begin the scan
          </Link>
        </ViewportSection>
      </section>
    </div>
  );
}
