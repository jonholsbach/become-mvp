import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function BePage() {
  return (
    <PageShell
      title="Be"
      subtitle="Presence before performance. Orientation before intensity."
      maxWidth="4xl"
    >
      <div className="glass-panel space-y-6 p-8">
        <p className="leading-relaxed text-mbn-steel">
          Before you build, burn, or boost — you breathe. Before you move through the world, you learn
          to feel where you are in it.
        </p>
        <Link href="/enter" className="btn-primary inline-flex">
          Enter the Body
        </Link>
      </div>
    </PageShell>
  );
}
