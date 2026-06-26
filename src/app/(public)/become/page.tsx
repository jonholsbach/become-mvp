import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function BecomePage() {
  return (
    <PageShell
      title="Become"
      subtitle="The body navigation system. Fitness is the interface. Awareness is the engine."
      maxWidth="4xl"
    >
      <div className="wilderness-panel space-y-6 p-8">
        <p className="text-lg leading-relaxed text-mbn-steel">
          Become is not a fitness application. It is a way of exploring yourself — where exercises
          are roads, signal is the steering wheel, and center is the compass.
        </p>
        <p className="text-mbn-steel-dim">
          You do not complete workouts. You discover territory. Each mission reveals something that
          was hidden in fog.
        </p>
        <Link href="/enter" className="btn-primary inline-flex">
          Mission #1 · Enter the Body
        </Link>
      </div>
    </PageShell>
  );
}
