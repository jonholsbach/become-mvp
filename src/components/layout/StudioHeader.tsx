import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export function StudioHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-500/10 bg-[#0a0806]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <BrandLogo size="header" framed={false} />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-amber-200/60">
              Mechanical by Nature Studio
            </p>
            <p className="text-xs text-amber-100/80">Internal · Coaches & Administrators</p>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <Link
            href="/studio/mission-control"
            className="text-xs font-medium text-amber-100/90 hover:text-amber-50 sm:text-sm"
          >
            Mission Control
          </Link>
          <Link href="/" className="text-xs text-mbn-steel-dim hover:text-mbn-steel sm:text-sm">
            Public site →
          </Link>
        </nav>
      </div>
    </header>
  );
}
