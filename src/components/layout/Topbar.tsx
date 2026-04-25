"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import tgsLogo from "@/assets/images/tgs-logo.png";
import {
  Info, Calendar, MapPin, FileText, Box, Grid3x3,
  Truck, CreditCard, Globe, Menu, X, ChevronDown,
  Bell, Volume2, Plane, Stamp,
} from "lucide-react";

interface NavItem {
  labelKey: string;
  subKey: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavGroup {
  key: string;
  labelKey: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    key: "gettingStarted",
    labelKey: "nav.gettingStarted",
    items: [
      { labelKey: "navItems.generalInfo",         subKey: "navItems.generalInfoTh",         href: "/getting-started/general-info",           icon: <Info     size={14} /> },
      { labelKey: "navItems.rules",               subKey: "navItems.rulesTh",               href: "/getting-started/rules",                  icon: <FileText size={14} /> },
      { labelKey: "navItems.contacts",            subKey: "navItems.contactsTh",            href: "/getting-started/contacts",               icon: <Globe    size={14} /> },
    ],
  },
  {
    key: "scheduleVenue",
    labelKey: "nav.scheduleVenue",
    items: [
      { labelKey: "navItems.exhibitionSchedule",  subKey: "navItems.exhibitionScheduleTh",  href: "/schedule-venue/exhibition-schedule",     icon: <Calendar size={14} /> },
      { labelKey: "navItems.soundSchedule",       subKey: "navItems.soundScheduleTh",       href: "/schedule-venue/sound-schedule",          icon: <Volume2  size={14} />, badge: "B2C" },
      { labelKey: "navItems.venueInfo",           subKey: "navItems.venueInfoTh",           href: "/schedule-venue/venue",                   icon: <MapPin   size={14} /> },
      { labelKey: "navItems.travel",              subKey: "navItems.travelTh",              href: "/schedule-venue/travel",                  icon: <Plane    size={14} /> },
    ],
  },
  {
    key: "boothSetup",
    labelKey: "nav.boothSetup",
    items: [
      { labelKey: "navItems.rawSpace",            subKey: "navItems.rawSpaceTh",            href: "/booth-setup/raw-space",                  icon: <Box      size={14} /> },
      { labelKey: "navItems.shellScheme",         subKey: "navItems.shellSchemeTh",         href: "/booth-setup/shell-scheme",               icon: <Grid3x3  size={14} /> },
    ],
  },
  {
    key: "logistics",
    labelKey: "nav.logistics",
    items: [
      { labelKey: "navItems.freight",             subKey: "navItems.freightTh",             href: "/logistics/freight",                      icon: <Truck    size={14} />, badge: "Due soon" },
    ],
  },
  {
    key: "adminForms",
    labelKey: "nav.adminForms",
    items: [
      { labelKey: "navItems.visa",                subKey: "navItems.visaTh",                href: "/admin/visa",                             icon: <Stamp    size={14} />, badge: "Action" },
      { labelKey: "navItems.billing",             subKey: "navItems.billingTh",             href: "/admin/billing",                          icon: <CreditCard size={14} /> },
    ],
  },
];

export function Topbar() {
  const locale = useLocale();
  const t = useTranslations();
  const rawPathname = usePathname();
  // trailingSlash: true adds a trailing slash — normalise for comparison
  const pathname = rawPathname.replace(/\/$/, "") || "/";

  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [desktopGroup,  setDesktopGroup]  = useState<string | null>(null);
  const [mobileGroup,   setMobileGroup]   = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close everything on route change
  useEffect(() => {
    setDesktopGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  // Body scroll-lock while mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ── Desktop hover helpers (with delay to prevent gap flicker) ────────────
  const desktopOpen  = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopGroup(key);
  };
  const desktopClose = () => {
    closeTimer.current = setTimeout(() => setDesktopGroup(null), 140);
  };
  const desktopKeep  = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const switchLocale = (next: string) => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const segs = window.location.pathname.split("/");
    // With a basePath the repo name sits at segs[1], locale at segs[2]
    // Without a basePath locale is at segs[1]
    const localeIdx = base ? 2 : 1;
    segs[localeIdx] = next;
    window.location.href = segs.join("/") || "/";
  };

  return (
    <>
      {/* ── Navigation bar ─────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[var(--nav-h)] flex items-center bg-[#0f0f1a]/95 backdrop-blur-md border-b border-white/[0.07] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_2px_30px_rgba(0,0,0,0.5)]" : ""
        }`}
      >
        {/* Brand logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center px-3 sm:px-5 lg:px-6 border-r border-white/[0.07] h-full shrink-0 hover:opacity-85 transition-opacity"
        >
          <Image src={tgsLogo} alt="GCAxTGS 2026" width={184} height={28} className="h-6 sm:h-7 lg:h-8 w-auto" />
        </Link>

        {/* ── Desktop nav groups ──────────────────────────────────────────── */}
        <div className="hidden lg:flex items-center flex-1 h-full px-1">
          {NAV_GROUPS.map((group) => {
            const groupActive = group.items.some((item) => pathname === `/${locale}${item.href}`);
            const isOpen = desktopGroup === group.key;

            return (
              <div
                key={group.key}
                className="relative h-full"
                onMouseEnter={() => desktopOpen(group.key)}
                onMouseLeave={desktopClose}
              >
                {/* Group trigger button */}
                <button
                  onClick={() => setDesktopGroup(isOpen ? null : group.key)}
                  className={`flex items-center gap-1.5 h-full px-5 font-heading text-[13px] font-bold tracking-[0.04em] uppercase transition-colors border-b-2 -mb-px ${
                    groupActive || isOpen
                      ? "text-white border-[#e4173f]"
                      : "text-white/50 border-transparent hover:text-white/90 hover:border-[#e4173f]/50"
                  }`}
                >
                  {t(group.labelKey)}
                  <ChevronDown
                    size={10}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown panel */}
                {isOpen && (
                  <div
                    className="absolute top-full left-0 min-w-[240px] bg-[#141420] border border-white/[0.1] rounded-b-xl rounded-tr-xl py-2 shadow-[0_20px_60px_rgba(0,0,0,0.65)] z-50"
                    onMouseEnter={desktopKeep}
                    onMouseLeave={desktopClose}
                  >
                    {group.items.map((item) => {
                      const itemActive = pathname === `/${locale}${item.href}`;
                      return (
                        <Link
                          key={item.href}
                          href={`/${locale}${item.href}`}
                          onClick={() => setDesktopGroup(null)}
                          className={`flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl transition-colors group/item ${
                            itemActive
                              ? "bg-[#e4173f]/16 border border-[#e4173f]/25"
                              : "border border-transparent hover:bg-white/[0.05]"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                              itemActive
                                ? "bg-[#e4173f] text-white shadow-[0_0_12px_rgba(228,23,63,0.4)]"
                                : "bg-white/[0.05] text-white/40 group-hover/item:bg-[#e4173f]/15 group-hover/item:text-[#e4173f]"
                            }`}
                          >
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`text-[13px] block leading-tight ${itemActive ? "text-white font-semibold" : "font-medium text-white/80"}`}>
                              {t(item.labelKey)}
                            </span>
                            <span className={`text-[11px] block mt-0.5 ${itemActive ? "text-white/50" : "text-white/30"}`}>
                              {t(item.subKey)}
                            </span>
                          </div>
                          {itemActive && (
                            <span className="w-2 h-2 rounded-full bg-[#e4173f] shrink-0 shadow-[0_0_6px_rgba(228,23,63,0.7)]" />
                          )}
                          {item.badge && !itemActive && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                                item.badge === "B2C"
                                  ? "bg-[#e4173f]/15 text-[#e4173f]"
                                  : "bg-[#c49228]/15 text-[#c49228]"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Right cluster ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 border-l border-white/[0.07] h-full shrink-0 ml-auto">

          {/* Deadlines chip — sm+ only */}
          <Link
            href={`/${locale}#alerts`}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#c49228]/10 border border-[#c49228]/20 rounded-md hover:bg-[#c49228]/18 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c49228] animate-blink shrink-0" />
            <span className="hidden md:block text-[10px] font-bold tracking-widest text-[#c49228] uppercase">
              {t("nav.deadlines")}
            </span>
            <Bell size={11} className="text-[#c49228] md:hidden" />
            <span className="text-[10px] font-bold bg-[#c49228] text-black w-4 h-4 rounded-full flex items-center justify-center shrink-0">
              3
            </span>
          </Link>

          {/* Language switcher — desktop only (mobile has it in the menu overlay) */}
          <div className="hidden lg:flex items-center bg-white/[0.05] border border-white/[0.08] rounded-md overflow-hidden">
            <button
              onClick={() => switchLocale("en")}
              style={{ cursor: "pointer" }} className={`px-2.5 py-1.5 text-[11px] font-bold tracking-widest uppercase transition-all ${
                locale === "en" ? "bg-[#e4173f] text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              EN
            </button>
            <div className="w-px h-4 bg-white/[0.08]" />
            <button
              onClick={() => switchLocale("th")}
              style={{ cursor: "pointer" }} className={`px-2.5 py-1.5 text-[11px] font-bold tracking-widest uppercase transition-all ${
                locale === "th" ? "bg-[#e4173f] text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              TH
            </button>
          </div>

          {/* Avatar — always visible */}
          <div className="relative w-8 h-8 rounded-full bg-[#e4173f]/15 border border-[#e4173f]/30 flex items-center justify-center font-heading text-[11px] font-bold text-[#e4173f] cursor-pointer hover:border-[#e4173f]/70 transition-colors shrink-0">
            TN
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-[#09090f]" />
          </div>

          {/* ── Hamburger — 44×44px touch target ───────────────────────── */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center w-11 h-11 -mr-1 rounded-xl text-white/55 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.1] transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ──────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[var(--nav-h)] z-40 overflow-y-auto lg:hidden bg-[#09090f]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="py-1 pb-safe">
            {NAV_GROUPS.map((group) => {
              const isExpanded = mobileGroup === group.key;
              return (
                <div key={group.key} className="border-b border-white/[0.06] last:border-0">

                  {/* Accordion header — min 56px touch target */}
                  <button
                    onClick={() => setMobileGroup(isExpanded ? null : group.key)}
                    className="flex items-center justify-between w-full px-5 min-h-[56px] text-[11px] font-bold tracking-widest text-white/40 uppercase active:bg-white/[0.04] transition-colors"
                  >
                    <span>{t(group.labelKey)}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#e4173f]" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion body */}
                  {isExpanded && (
                    <div className="pb-1">
                      {group.items.map((item) => {
                        const itemActive = pathname === `/${locale}${item.href}`;
                        return (
                          <Link
                            key={item.href}
                            href={`/${locale}${item.href}`}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-4 px-5 min-h-[60px] py-3 transition-colors border-l-2 ${
                              itemActive
                                ? "bg-[#e4173f]/12 border-[#e4173f]"
                                : "border-transparent active:bg-white/[0.04]"
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                itemActive
                                  ? "bg-[#e4173f] text-white shadow-[0_0_14px_rgba(228,23,63,0.35)]"
                                  : "bg-white/[0.06] text-white/40"
                              }`}
                            >
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className={`text-[14px] block leading-tight ${itemActive ? "text-white font-semibold" : "font-medium text-white/80"}`}>
                                {t(item.labelKey)}
                              </span>
                              <span className={`text-[12px] block mt-0.5 ${itemActive ? "text-white/50" : "text-white/30"}`}>
                                {t(item.subKey)}
                              </span>
                            </div>
                            {itemActive && (
                              <span className="w-2 h-2 rounded-full bg-[#e4173f] shrink-0 shadow-[0_0_6px_rgba(228,23,63,0.7)]" />
                            )}
                            {item.badge && !itemActive && (
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                  item.badge === "B2C"
                                    ? "bg-[#e4173f]/15 text-[#e4173f]"
                                    : "bg-[#c49228]/15 text-[#c49228]"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile footer: language switcher */}
            <div className="px-5 py-5 border-t border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold tracking-widest text-white/30 uppercase">Language</span>
                <div className="flex items-center bg-white/[0.06] border border-white/[0.08] rounded-lg overflow-hidden">
                  <button
                    onClick={() => switchLocale("en")}
                    className={`px-5 min-h-[44px] text-[12px] font-bold tracking-widest uppercase transition-all ${
                      locale === "en" ? "bg-[#e4173f] text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    EN
                  </button>
                  <div className="w-px h-5 bg-white/[0.08]" />
                  <button
                    onClick={() => switchLocale("th")}
                    className={`px-5 min-h-[44px] text-[12px] font-bold tracking-widest uppercase transition-all ${
                      locale === "th" ? "bg-[#e4173f] text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    TH
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
