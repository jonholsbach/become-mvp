"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";

const PUBLIC_LINKS = [
  { href: "/become", label: "Become" },
  { href: "/be", label: "Be" },
  { href: "/map", label: "Map" },
  { href: "/about", label: "Mission" },
  { href: "/join", label: "Join" },
];

export function PublicHeader() {
  const pathname = usePathname();

  if (pathname === "/enter") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-mbn-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="group flex items-center gap-2 sm:gap-3">
          <BrandLogo size="header" priority />
          <div className="hidden sm:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-mbn-steel-dim">
              Mechanical by Nature
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {PUBLIC_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-mbn-steel transition-colors hover:bg-mbn-panel hover:text-mbn-white sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/enter" className="btn-primary px-4 py-2 text-xs sm:px-5 sm:text-sm">
          Enter the Body
        </Link>
      </div>
    </header>
  );
}
