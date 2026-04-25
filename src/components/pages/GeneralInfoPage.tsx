"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  SquareStack,
  Building2,
  Train,
  Car,
  Truck,
  ArrowUpSquare,
  Download,
  FileText,
  Map,
  Package,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// ─── On-this-page sections ───────────────────────────────────────────────────
const SECTIONS = [
  { id: "overview",   labelKey: "sections.overview"   },
  { id: "key-dates",  labelKey: "sections.keyDates"   },
  { id: "venue",      labelKey: "sections.venue"       },
  { id: "organizers", labelKey: "sections.organizers"  },
  { id: "downloads",  labelKey: "sections.downloads"   },
] as const;

// ─── Key date tag styles ──────────────────────────────────────────────────────
const TAG_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  deadline: { color: "#e4173f",  bg: "rgba(228,23,63,0.12)",  border: "rgba(228,23,63,0.25)"  },
  setup:    { color: "#c49228",  bg: "rgba(196,146,42,0.12)", border: "rgba(196,146,42,0.25)" },
  show:     { color: "#22c55e",  bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.25)"  },
  teardown: { color: "#00c4d4",  bg: "rgba(0,196,212,0.12)",  border: "rgba(0,196,212,0.25)"  },
};

// ─── Sticky sidebar nav ───────────────────────────────────────────────────────
function SidebarNav({ labels }: { labels: string[] }) {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="hidden xl:block sticky top-[calc(var(--nav-h)+2rem)] w-52 shrink-0 self-start">
      <div className="text-[10px] font-bold tracking-[0.14em] text-white/35 uppercase mb-3 font-heading">
        On this page
      </div>
      <ul className="space-y-0.5">
        {SECTIONS.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#e4173f]/10 text-[#e4173f] border border-[#e4173f]/20"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                    isActive ? "bg-[#e4173f]" : "bg-white/20"
                  }`}
                />
                {labels[i]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ─── Download button with hover state ────────────────────────────────────────
function DownloadButton({ color, bg, label }: { color: string; bg: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed]  = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-heading text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-150 border"
      style={{
        cursor:       "pointer",
        background:   pressed ? color : hovered ? bg.replace(/[\d.]+\)$/, "0.22)") : bg,
        color:        pressed ? "#fff" : color,
        borderColor:  hovered ? color : `${color}30`,
        transform:    pressed ? "scale(0.97)" : hovered ? "translateY(-1px)" : "none",
        boxShadow:    hovered && !pressed ? `0 4px 16px ${color}30` : "none",
      }}
    >
      <Download size={12} />
      {label}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function GeneralInfoPage() {
  const t  = useTranslations("generalInfo");
  const locale = useLocale();

  const sectionLabels = SECTIONS.map((s) => t(s.labelKey));

  return (
    <div className="min-h-screen bg-[#09090f] text-white">

      {/* ── Page header ───────────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.07] bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-[calc(var(--nav-h)+2.5rem)] pb-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] text-white/35 font-heading font-bold tracking-widest uppercase mb-5">
            <Link href={`/${locale}`} className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white/55">{t("breadcrumb")}</span>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-[#e4173f]">{t("title")}</span>
          </div>

          <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-3">
            <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />
            {t("breadcrumb")}
          </div>

          <h1
            className="font-heading font-extrabold tracking-[-0.02em] text-white leading-none mb-2"
            style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
          >
            {t("title")}
          </h1>
          <p className="text-[15px] text-white/55 mt-2">{t("subtitle")}</p>
        </div>
      </div>

      {/* ── Body: sidebar + content ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex gap-12 items-start">

        <SidebarNav labels={sectionLabels} />

        <div className="flex-1 min-w-0 space-y-20">

          {/* ══════════════════════════════════════════════════════════════════
              1. EVENT OVERVIEW
          ══════════════════════════════════════════════════════════════════ */}
          <section id="overview">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />
                {t("overview.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-3">
                {t("overview.title")}
              </h2>
              <p className="text-[15px] text-white/65 leading-[1.75] max-w-2xl mb-8">
                {t("overview.desc")}
              </p>
            </RevealOnScroll>

            {/* Stat grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { icon: <Calendar size={16} />, value: t("overview.stats.dates"),      label: t("overview.stats.datesLabel"),     color: "#e4173f" },
                { icon: <MapPin size={16} />,   value: t("overview.stats.venue"),      label: t("overview.stats.venueLabel"),     color: "#c49228" },
                { icon: <Building2 size={16}/>, value: t("overview.stats.halls"),      label: t("overview.stats.hallsLabel"),     color: "#00c4d4" },
                { icon: <Users size={16} />,    value: t("overview.stats.visitors"),   label: t("overview.stats.visitorsLabel"),  color: "#22c55e" },
                { icon: <SquareStack size={16}/>,value: t("overview.stats.exhibitors"),label: t("overview.stats.exhibitorsLabel"),color: "#a78bfa" },
                { icon: <Map size={16} />,      value: t("overview.stats.sqm"),        label: t("overview.stats.sqmLabel"),       color: "#f97316" },
              ].map((stat, i) => (
                <RevealOnScroll key={stat.label} animation="scale" delay={i * 55} threshold={0.05}>
                  <div className="bg-[#141420] border border-white/[0.07] rounded-xl px-5 py-4 hover:border-white/15 transition-colors group">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: `${stat.color}18`, color: stat.color }}
                    >
                      {stat.icon}
                    </div>
                    <div className="font-heading text-[20px] font-extrabold text-white leading-none mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-white/45 font-medium tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              2. KEY DATES
          ══════════════════════════════════════════════════════════════════ */}
          <section id="key-dates">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />
                {t("keyDates.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1.5">
                {t("keyDates.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-8">{t("keyDates.subtitle")}</p>
            </RevealOnScroll>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[9rem] top-0 bottom-0 w-px bg-white/[0.07] hidden md:block" />

              <div className="space-y-3">
                {(["formDeadline","visaDeadline","electricalDeadline","setup","show","teardown"] as const).map((key, i) => {
                  const tag = t(`keyDates.items.${key}.tag`);
                  const ts = TAG_STYLE[tag] ?? TAG_STYLE.deadline;
                  return (
                    <RevealOnScroll key={key} animation="left" delay={i * 60} threshold={0.04}>
                      <div className="flex gap-0 md:gap-6 items-stretch">

                        {/* Date column (desktop) */}
                        <div className="hidden md:flex flex-col items-end justify-start pt-4 w-28 shrink-0 pr-6">
                          <span className="font-heading text-[13px] font-bold text-white/70">
                            {t(`keyDates.items.${key}.date`)}
                          </span>
                        </div>

                        {/* Dot */}
                        <div className="hidden md:flex flex-col items-center shrink-0 w-4">
                          <div
                            className="w-3 h-3 rounded-full mt-4 shrink-0 border-2"
                            style={{ background: ts.bg, borderColor: ts.color }}
                          />
                        </div>

                        {/* Card */}
                        <div
                          className="flex-1 rounded-xl border px-5 py-4 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)] transition-all duration-200"
                          style={{ background: ts.bg, borderColor: ts.border }}
                        >
                          <div className="flex items-start gap-3 flex-wrap">
                            {/* Mobile date */}
                            <span className="md:hidden font-heading text-[11px] font-bold text-white/55">
                              {t(`keyDates.items.${key}.date`)}
                            </span>
                            <span
                              className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                              style={{ background: ts.bg, color: ts.color, border: `1px solid ${ts.border}` }}
                            >
                              {tag}
                            </span>
                          </div>
                          <div className="font-heading text-[15px] font-bold text-white mt-1.5 mb-1">
                            {t(`keyDates.items.${key}.title`)}
                          </div>
                          <div className="text-[13px] text-white/60 leading-relaxed">
                            {t(`keyDates.items.${key}.desc`)}
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              3. VENUE
          ══════════════════════════════════════════════════════════════════ */}
          <section id="venue">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />
                {t("venue.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1.5">
                {t("venue.title")}
              </h2>
              <p className="text-[13px] font-bold text-white/35 tracking-widest uppercase font-heading mb-6">
                {t("venue.abbr")}
              </p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

              {/* Map card */}
              <RevealOnScroll animation="left" className="lg:col-span-2">
                <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden h-full">
                  {/* Map placeholder */}
                  <div className="relative h-44 bg-[#0d0d1a] flex items-center justify-center border-b border-white/[0.06]">
                    <div className="text-center">
                      <MapPin size={28} className="text-[#e4173f] mx-auto mb-2" />
                      <div className="text-[11px] text-white/40">QSNCC, Bangkok</div>
                    </div>
                    <a
                      href={t("venue.mapLink")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] font-bold text-[#e4173f] bg-[#e4173f]/12 border border-[#e4173f]/25 px-2.5 py-1.5 rounded-lg hover:bg-[#e4173f]/20 transition-colors"
                    >
                      <ExternalLink size={9} />
                      {t("venue.mapLabel")}
                    </a>
                  </div>
                  <div className="px-5 py-4">
                    <div className="text-[13px] font-medium text-white/90 mb-1">{t("venue.address")}</div>
                    <div className="text-[12px] text-white/45">{t("venue.halls")}</div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Detail rows */}
              <RevealOnScroll animation="right" delay={80} className="lg:col-span-3">
                <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden h-full">
                  {(
                    [
                      { key: "parking",  icon: <Car size={14} /> },
                      { key: "bts",      icon: <Train size={14} /> },
                      { key: "loading",  icon: <Truck size={14} /> },
                      { key: "elevator", icon: <ArrowUpSquare size={14} /> },
                    ] as const
                  ).map(({ key, icon }, i) => (
                    <div
                      key={key}
                      className={`flex gap-4 px-5 py-4 ${i < 3 ? "border-b border-white/[0.05]" : ""}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00c4d4]/10 text-[#00c4d4] flex items-center justify-center shrink-0 mt-0.5">
                        {icon}
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-white/55 uppercase tracking-wider mb-0.5">
                          {t(`venue.details.${key}.label`)}
                        </div>
                        <div className="text-[13px] text-white/80 leading-relaxed">
                          {t(`venue.details.${key}.value`)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              4. ORGANIZERS
          ══════════════════════════════════════════════════════════════════ */}
          <section id="organizers">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />
                {t("organizers.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-8">
                {t("organizers.title")}
              </h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(
                [
                  { key: "koelnmesse",  color: "#e4173f",  bg: "rgba(228,23,63,0.10)",  initial: "K" },
                  { key: "trueDigital", color: "#c49228",  bg: "rgba(196,146,42,0.10)", initial: "T" },
                  { key: "blackdog",    color: "#00c4d4",  bg: "rgba(0,196,212,0.10)",  initial: "B" },
                ] as const
              ).map(({ key, color, bg, initial }, i) => (
                <RevealOnScroll key={key} animation="up" delay={i * 80} threshold={0.05}>
                  <div className="bg-[#141420] border border-white/[0.07] rounded-xl p-5 hover:border-white/15 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] transition-all duration-200 h-full flex flex-col">
                    {/* Avatar */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center font-heading text-[18px] font-extrabold mb-4 shrink-0"
                      style={{ background: bg, color }}
                    >
                      {initial}
                    </div>
                    <div className="font-heading text-[15px] font-bold text-white leading-tight mb-1">
                      {t(`organizers.items.${key}.name`)}
                    </div>
                    <div
                      className="text-[10px] font-bold tracking-wider uppercase mb-3"
                      style={{ color }}
                    >
                      {t(`organizers.items.${key}.role`)}
                    </div>
                    <div className="text-[13px] text-white/55 leading-relaxed flex-1">
                      {t(`organizers.items.${key}.desc`)}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              5. DOWNLOADS
          ══════════════════════════════════════════════════════════════════ */}
          <section id="downloads">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />
                {t("downloads.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1.5">
                {t("downloads.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-8">{t("downloads.subtitle")}</p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              {(
                [
                  { key: "manual",    icon: <FileText size={18} />, color: "#e4173f", bg: "rgba(228,23,63,0.12)" },
                  { key: "floorPlan", icon: <Map size={18} />,      color: "#00c4d4", bg: "rgba(0,196,212,0.12)" },
                  { key: "formPack",  icon: <Package size={18} />,  color: "#c49228", bg: "rgba(196,146,42,0.12)" },
                ] as const
              ).map(({ key, icon, color, bg }, i) => (
                <RevealOnScroll key={key} animation="up" delay={i * 70} threshold={0.05}>
                  <div className="bg-[#141420] border border-white/[0.07] rounded-xl p-5 hover:border-white/15 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] transition-all duration-200 flex flex-col gap-3 h-full">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: bg, color }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div className="font-heading text-[14px] font-bold text-white mb-1">
                        {t(`downloads.items.${key}.title`)}
                      </div>
                      <div className="text-[12px] text-white/55 leading-relaxed mb-2">
                        {t(`downloads.items.${key}.desc`)}
                      </div>
                      <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color }}>
                        {t(`downloads.items.${key}.size`)}
                      </div>
                    </div>
                    <DownloadButton color={color} bg={bg} label={t("downloads.downloadBtn")} />
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll animation="fade" delay={200}>
              <div className="flex items-center gap-2 text-[12px] text-white/30 bg-white/[0.03] border border-white/[0.05] rounded-lg px-4 py-3">
                <FileText size={12} className="shrink-0 text-white/25" />
                {t("downloads.note")}
              </div>
            </RevealOnScroll>
          </section>

        </div>{/* /content */}
      </div>{/* /body */}
    </div>
  );
}
