import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { MemberPreview } from "@/components/atmosphere/MemberPreview";

export default function MapPreviewPage() {
  return (
    <PageShell
      title="The Map"
      subtitle="Fragments visible through the fog — a glimpse of what members discover."
      maxWidth="4xl"
    >
      <MemberPreview />
      <p className="mt-8 text-center text-sm text-mbn-steel">
        The full map reveals itself only after you walk the path.
      </p>
      <div className="mt-6 text-center">
        <Link href="/enter" className="btn-primary inline-flex">
          Enter the Body
        </Link>
      </div>
    </PageShell>
  );
}
