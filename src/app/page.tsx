import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { JourneyMap } from "@/components/JourneyMap";

const LOOP = [
  { num: "01", label: "System Scan", detail: "Map the internal landscape and positional sphere." },
  { num: "02", label: "Center Profile", detail: "Distortion, drift, signal map, and direction." },
  { num: "03", label: "First Mission", detail: "One precise recalibration assignment." },
  { num: "04", label: "Map Update", detail: "Update the territory with awareness and signal." },
];

const SECTIONS = [
  {
    title: "This is not fitness. This is human calibration.",
    copy: "Most programs give you exercises. Become gives you a map. You learn where signal is distorted, where awareness is missing, which positions your body has forgotten, and which direction brings the system back online.",
  },
  {
    title: "Push back the fog.",
    copy: "At first, the body feels like unknown territory. Breath becomes your light. Movement becomes exploration. Reflection updates the map. Each mission reveals more of the system — until the body becomes something you can consciously operate.",
  },
  {
    title: "Positions are coordinates.",
    copy: "Your body adapts to the positions it spends the most time in. Sit long enough and the system organizes around flexed hips, rounded shoulders, shortened front tissue, and a forward-shifted center. Other positions fade into fog. Become turns exercise into positional exploration — structured time in the coordinates your body has forgotten.",
  },
  {
    title: "The body as a sphere.",
    copy: "Imagine your body inside a three-dimensional sphere. Center is balanced access. Modern life pulls many people forward — hips flexed, shoulders forward, chest shortened. The back of the sphere becomes difficult to feel, access, and control. Each mission helps you reclaim another direction — not by forcing range, but by spending time with awareness in positions that restore signal.",
  },
  {
    title: "Reps are not the point.",
    copy: "Reps, sets, and time under tension are tools. The real goal is to spend enough quality time in a new position that the nervous system stops treating it as foreign. Familiarity creates safety. Safety creates access. Access creates strength.",
  },
  {
    title: "Learn to read the signal.",
    copy: "You are not here to obey the program blindly. You are here to learn how to read the signal. Guidance can take you to the edge of the map — but the user must learn to navigate by feeling: restriction, space, force, compensation, and the direction that brings you toward center.",
  },
];

export default function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="biomechanical-glow -right-32 top-20 h-96 w-96 bg-electric-glow/10" />
        <div className="biomechanical-glow -left-32 bottom-0 h-64 w-64 bg-electric-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-electric-glow/5 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-mbn-panel/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-electric-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-primary shadow-glow-sm" />
              Opening mission · Mechanical by Nature
            </p>

            <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="gradient-text">Enter the body.</span>
              <br />
              <span className="text-mbn-white">Push back the fog.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mbn-steel">
              Become is the first step into a guided journey through your own system — a mechanical
              and electrical recalibration of the body you live inside.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-mbn-steel-dim">
              Your body is not broken. It has adapted. Every repeated position, avoided range,
              compensation, injury, and stress pattern changes the map. Become helps you scan the
              system, identify distorted signal, reclaim forgotten positions, and take the next
              precise mission back toward center.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/assessment" className="btn-primary px-8 py-4 text-base">
                Begin System Scan
              </Link>
              <Link href="/coach" className="btn-secondary px-8 py-4 text-base">
                View Mission Control
              </Link>
            </div>

            <p className="mt-6 text-sm text-mbn-steel-dim">
              11 scan points · ~4 minutes · No account required · First playable mission
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-mbn-bg-alt/40">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <h2 className="font-display text-2xl text-mbn-white sm:text-3xl">The opening loop</h2>
          <p className="mt-3 max-w-2xl text-mbn-steel">
            Scan → map → mission → map update → coach action. This MVP proves the core loop of a
            much larger human calibration platform.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LOOP.map((step) => (
              <div key={step.num} className="glass-panel p-5">
                <span className="font-display text-3xl text-electric-primary/40">{step.num}</span>
                <h3 className="mt-3 font-semibold text-mbn-white">{step.label}</h3>
                <p className="mt-1 text-sm text-mbn-steel-dim">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="font-display text-2xl text-mbn-white sm:text-3xl">Your body is the map.</h2>
        <p className="mt-3 max-w-2xl text-mbn-steel">
          Six pillars. Six mission regions. One journey from fog to coherence.
        </p>
        <div className="mt-10">
          <JourneyMap />
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className={`mx-auto max-w-6xl px-6 py-12 ${section.title.includes("signal") ? "pb-20" : ""}`}
        >
          <div className="glass-panel border-white/5 p-8 sm:p-10">
            <h2 className="font-display text-xl text-mbn-white sm:text-2xl">{section.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-mbn-steel">{section.copy}</p>
          </div>
        </section>
      ))}

      <section className="border-t border-white/5 bg-mbn-navy/20">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <BrandLogo size="brand" framed />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">
                Investor framing
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mbn-steel">
                Become starts as a guided system scan and first mission. The larger platform expands
                into a full body map, unlockable missions, adaptive coaching, physical tools, program
                pathways, and human calibration protocols. The long-term product is not a workout
                library — it is an interactive map of the body where users explore positions, clear fog,
                unlock access, and learn to navigate by signal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
          <h2 className="font-display text-3xl text-mbn-white sm:text-4xl">
            Mission 01 awaits. Enter the territory.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-mbn-steel">
            Scan the system. Read the map. Take the first mission. Push back the fog.
          </p>
          <Link href="/assessment" className="btn-primary mt-8 inline-flex px-8 py-4 text-base">
            Begin System Scan
          </Link>
        </div>
      </section>
    </>
  );
}
