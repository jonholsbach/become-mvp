import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { JourneyMap } from "@/components/JourneyMap";
import { FogLayer } from "@/components/atmosphere/FogLayer";
import { LogoWatermark } from "@/components/atmosphere/LogoWatermark";
import { MemberPreview } from "@/components/atmosphere/MemberPreview";
import { SignalFlow } from "@/components/atmosphere/SignalFlow";
import { WildernessBackdrop } from "@/components/atmosphere/WildernessBackdrop";

const PRINCIPLES = [
  "This is not fitness. This is human calibration.",
  "Push back the fog.",
  "Your body is the map.",
  "Positions are coordinates.",
  "Learn to read the signal.",
];

export default function LandingPage() {
  return (
    <>
      <WildernessBackdrop variant="forest" className="border-b border-white/5">
        <LogoWatermark />
        <FogLayer density={0.5} />
        <SignalFlow intensity="subtle" />

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pb-32 sm:pt-16">
          <div className="flex flex-col items-center text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-mbn-steel-dim">
              Mechanical by Nature
            </p>

            <h1 className="mt-4 font-display text-6xl tracking-tight text-mbn-white sm:text-7xl lg:text-8xl">
              BECOME
            </h1>

            <p className="mt-8 max-w-lg font-display text-2xl leading-snug text-mbn-white sm:text-3xl">
              Enter the Body.
              <br />
              <span className="gradient-text">Push Back the Fog.</span>
            </p>

            <div className="mt-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-electric-bright">
                Mission #1
              </p>
              <Link
                href="/enter"
                className="btn-primary mt-4 inline-flex px-10 py-4 text-base shadow-glow-sm"
              >
                Enter the Body
              </Link>
            </div>
          </div>
        </div>
      </WildernessBackdrop>

      <section className="border-b border-white/5 bg-mbn-bg-alt/50">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="space-y-6">
            {PRINCIPLES.map((line, i) => (
              <p
                key={line}
                className={`font-display leading-relaxed ${
                  i === 0 ? "text-xl text-mbn-white sm:text-2xl" : "text-lg text-mbn-steel sm:text-xl"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl text-mbn-white sm:text-4xl">Something Hidden Awaits</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-mbn-steel sm:text-lg">
                <p>Every path you&apos;ve repeated has shaped the landscape beneath your feet.</p>
                <p>Most people never realize they&apos;re walking the same roads.</p>
                <p className="text-mbn-white">There is another way.</p>
                <p className="font-display text-xl text-electric-bright">Step into the fog.</p>
              </div>
            </div>
            <MemberPreview />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-center text-sm text-mbn-steel-dim">The map has always been there.</p>
        <h2 className="mt-2 text-center font-display text-2xl text-mbn-white sm:text-3xl">
          Six pillars. One journey inward.
        </h2>
        <div className="mt-10">
          <JourneyMap />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 bg-mbn-navy/20">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
          <BrandLogo size="brand" framed={false} className="!h-64 !w-auto" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
          <p className="text-xs uppercase tracking-widest text-electric-bright">Mission #1</p>
          <h2 className="mt-4 font-display text-4xl text-mbn-white sm:text-5xl">Enter the Body</h2>
          <p className="mx-auto mt-6 max-w-md text-mbn-steel">
            Everything you need is already within you. The first mission is not a workout — it is
            crossing the threshold.
          </p>
          <Link href="/enter" className="btn-primary mt-10 inline-flex px-10 py-4 text-base">
            Begin
          </Link>
        </div>
      </section>
    </>
  );
}
