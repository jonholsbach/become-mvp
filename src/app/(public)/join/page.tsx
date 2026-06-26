import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function JoinPage() {
  return (
    <PageShell
      title="Join"
      subtitle="Membership opens the inner world — your personal universe, missions, and map."
      maxWidth="md"
    >
      <div className="glass-panel p-8 text-center">
        <p className="text-mbn-steel">
          Membership is opening in waves. Begin with Mission #1 — no account required for your first
          crossing.
        </p>
        <Link href="/enter" className="btn-primary mt-8 inline-flex w-full justify-center sm:w-auto">
          Enter the Body
        </Link>
      </div>
    </PageShell>
  );
}
