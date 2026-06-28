"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { useMemberSession } from "@/hooks/useMemberSession";
import {
  getUnlockHref,
  getUnlockLabel,
  isUnlocked,
  MEMBER_NAV_ORDER,
  type ProgressionState,
  type UnlockId,
} from "@/lib/domain/progression";
import { routePath } from "@/lib/domain/routes";

export function MemberShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { progression } = useMemberSession();

  const isScanning = progression.stage === "scanning";
  const hasProfile = progression.stage !== "visitor" && !isScanning;
  const navItems = MEMBER_NAV_ORDER;
  const homeHref = progression.universeHome
    ? routePath("universe")
    : hasProfile
      ? routePath("dashboard")
      : routePath("enter");

  return (
    <div className="member-world min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-mbn-bg/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link href={homeHref} className="flex shrink-0 items-center gap-2">
              <BrandLogo size="header" />
              {(hasProfile || isScanning) && (
                <div className="hidden sm:block">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-mbn-steel-dim">Become</p>
                  <p className="text-xs font-medium text-electric-bright">
                    {isScanning ? "Mission 0" : "Your world"}
                  </p>
                </div>
              )}
            </Link>
            <Link
              href="/"
              className="text-xs text-mbn-steel transition-colors hover:text-mbn-white"
            >
              ← Public World
            </Link>
          </div>

          {hasProfile && (
            <>
              <nav className="hidden items-center gap-1 lg:flex">
                <MemberNavLink
                  id="dashboard"
                  pathname={pathname}
                  progression={progression}
                  label="Home"
                />
                {navItems.map((id) => (
                  <MemberNavLink key={id} id={id} pathname={pathname} progression={progression} />
                ))}
              </nav>
              <Link
                href={progression.nextStep.href}
                className="btn-primary hidden px-4 py-2 text-xs sm:inline-flex sm:text-sm"
              >
                {progression.nextStep.cta}
              </Link>
            </>
          )}

          {isScanning && (
            <Link
              href={routePath("assessment")}
              className="btn-primary px-4 py-2 text-xs sm:text-sm"
            >
              Continue scan
            </Link>
          )}
        </div>

        {hasProfile && (
          <div className="border-t border-white/5 bg-mbn-panel/30 lg:hidden">
            <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 py-2">
              <MobileNavPill
                href={routePath("dashboard")}
                label="Home"
                active={
                  pathname === routePath("dashboard") || pathname === routePath("universe")
                }
              />
              {navItems.map((id) => {
                const unlocked = isUnlocked(progression, id);
                const href = getUnlockHref(id);
                return (
                  <MobileNavPill
                    key={id}
                    href={unlocked ? href : routePath("dashboard")}
                    label={getUnlockLabel(id)}
                    active={pathname === href}
                    locked={!unlocked}
                  />
                );
              })}
            </div>
          </div>
        )}
      </header>

      <div className="threshold-enter">{children}</div>

      {hasProfile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-mbn-bg/95 p-3 backdrop-blur-md md:hidden">
          <Link href={progression.nextStep.href} className="btn-primary w-full text-center text-sm">
            {progression.nextStep.cta}
          </Link>
          <p className="mt-1.5 text-center text-[10px] text-mbn-steel-dim">
            {progression.nextStep.description}
          </p>
        </div>
      )}
    </div>
  );
}

function MemberNavLink({
  id,
  pathname,
  progression,
  label,
}: {
  id: UnlockId;
  pathname: string;
  progression: ProgressionState;
  label?: string;
}) {
  const unlocked = isUnlocked(progression, id);
  const href = getUnlockHref(id);
  const active = pathname === href || pathname.startsWith(`${href}/`);
  const displayLabel = label ?? getUnlockLabel(id);

  if (!unlocked) {
    return (
      <span className="cursor-not-allowed rounded-full px-3 py-1.5 text-xs text-mbn-steel-dim/50">
        {displayLabel}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
        active
          ? "bg-electric-glow/15 text-electric-bright"
          : "text-mbn-steel hover:bg-mbn-panel hover:text-mbn-white"
      }`}
    >
      {displayLabel}
    </Link>
  );
}

function MobileNavPill({
  href,
  label,
  active,
  locked,
}: {
  href: string;
  label: string;
  active?: boolean;
  locked?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
        locked
          ? "text-mbn-steel-dim/40"
          : active
            ? "bg-electric-primary/20 text-electric-bright"
            : "text-mbn-steel hover:text-mbn-white"
      }`}
    >
      {label}
    </Link>
  );
}
