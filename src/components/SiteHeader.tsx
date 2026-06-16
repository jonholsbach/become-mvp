import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/assessment", label: "System Scan" },
  { href: "/coach", label: "Mission Control" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-mbn-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <BrandLogo size="header" priority />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-wide text-mbn-white transition-colors group-hover:text-electric-bright">
              Mechanical by Nature
            </p>
            <p className="text-xs text-mbn-steel">Become</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-mbn-steel transition-colors hover:bg-mbn-panel hover:text-mbn-white sm:px-4 sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
