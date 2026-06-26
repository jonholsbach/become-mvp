import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell
      title="Mission"
      subtitle="Mechanical by Nature — reprogramming the human body through awareness, signal, and intentional movement."
      maxWidth="4xl"
    >
      <div className="space-y-8">
        <div className="glass-panel p-8">
          <p className="leading-relaxed text-mbn-steel">
            We believe the body is the most powerful biological system on earth — and that most
            people have never learned to operate it consciously. Become is the software layer of
            that journey.
          </p>
        </div>
        <div className="wilderness-panel p-8">
          <p className="font-display text-xl text-mbn-white">The map has always been there.</p>
          <p className="mt-4 text-mbn-steel">Our work is to help you see it.</p>
        </div>
        <Link href="/join" className="btn-secondary inline-flex">
          Join the journey →
        </Link>
      </div>
    </PageShell>
  );
}
