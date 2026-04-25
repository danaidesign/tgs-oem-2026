"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Clock,
  Hammer,
  Calendar,
  Truck,
  Volume2,
  VolumeX,
  AlertTriangle,
  Users,
  Info,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// ─── Sections ────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "overview",    labelKey: "sections.overview"    },
  { id: "buildup",     labelKey: "sections.buildup"     },
  { id: "show-days",   labelKey: "sections.showDays"    },
  { id: "teardown",    labelKey: "sections.teardown"    },
  { id: "sound-policy",labelKey: "sections.soundPolicy" },
] as const;

// ─── Tag styles ───────────────────────────────────────────────────────────────
const TAG_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  setup:   { color: "#c49228", bg: "rgba(196,146,42,0.12)", border: "rgba(196,146,42,0.25)" },
  show:    { color: "#e4173f", bg: "rgba(228,23,63,0.12)",  border: "rgba(228,23,63,0.25)"  },
  closing: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)",border: "rgba(167,139,250,0.25)"},
  both:    { color: "#00c4d4", bg: "rgba(0,196,212,0.12)",  border: "rgba(0,196,212,0.25)"  },
};

// ─── Sidebar nav ──────────────────────────────────────────────────────────────
function SidebarNav({ labels }: { labels: string[] }) {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
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
        {SECTIONS.map(({ id }, i) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#e4173f]/10 text-[#e4173f] border border-[#e4173f]/20"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${isActive ? "bg-[#e4173f]" : "bg-white/20"}`} />
                {labels[i]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ─── Detail rows (used in build-up, teardown) ─────────────────────────────────
function DetailTable({ rows, icon: Icon, color }: {
  rows: { label: string; value: string }[];
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
      {rows.map(({ label, value }, i) => (
        <div key={label} className={`flex gap-4 px-5 py-4 ${i < rows.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: `${color}18`, color }}
          >
            <Icon size={13} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white/45 uppercase tracking-wider mb-0.5">{label}</div>
            <div className="text-[13px] text-white/80 leading-relaxed">{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ExhibitionSchedulePage() {
  const t = useTranslations("exhibitionSchedule");
  const locale = useLocale();

  const sectionLabels = SECTIONS.map((s) => t(s.labelKey));

  const overviewDays = (["oct15","oct16","oct17","oct18","oct19"] as const).map((k) => ({
    date:  t(`overview.days.${k}.date`),
    day:   t(`overview.days.${k}.day`),
    label: t(`overview.days.${k}.label`),
    tag:   t(`overview.days.${k}.tag`),
    hours: t(`overview.days.${k}.hours`),
  }));

  const buildupRows = (["hours","access","vehicles","exhibits","elevator","contractor"] as const).map((k) => ({
    label: t(`buildup.rows.${k}.label`),
    value: t(`buildup.rows.${k}.value`),
  }));

  const teardownRows = (["hallClose","teardownStart","deadline","vehicles","contractor"] as const).map((k) => ({
    label: t(`teardown.rows.${k}.label`),
    value: t(`teardown.rows.${k}.value`),
  }));

  const soundRules = (["sound","lighting","overtime","applies"] as const).map((k) => ({
    label: t(`soundPolicy.rules.${k}.label`),
    value: t(`soundPolicy.rules.${k}.value`),
  }));

  return (
    <div className="min-h-screen bg-[#09090f] text-white">

      {/* ── Page header ────────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.07] bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-[calc(var(--nav-h)+2.5rem)] pb-10">
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

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex gap-12 items-start">
        <SidebarNav labels={sectionLabels} />

        <div className="flex-1 min-w-0 space-y-20">

          {/* ════════════════════════════════════════════════════════════════
              1. OVERVIEW — 5-day cards
          ════════════════════════════════════════════════════════════════ */}
          <section id="overview">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />
                {t("overview.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1.5">
                {t("overview.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-8">{t("overview.subtitle")}</p>
            </RevealOnScroll>

            {/* 5-day row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {overviewDays.map((d, i) => {
                const ts = TAG_STYLE[d.tag] ?? TAG_STYLE.show;
                const isShow = d.tag === "show" || d.tag === "closing" || d.tag === "both";
                return (
                  <RevealOnScroll key={d.date} animation="up" delay={i * 60} threshold={0.05}>
                    <div
                      className="relative rounded-xl border p-4 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                      style={{ background: isShow ? ts.bg : "rgba(20,20,32,0.8)", borderColor: ts.border }}
                    >
                      {/* Day number */}
                      <div className="font-heading text-[28px] font-extrabold leading-none" style={{ color: ts.color }}>
                        {d.date.split(" ")[0]}
                      </div>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-white/40">{d.day}</div>

                      <div className="h-px bg-white/[0.07] my-0.5" />

                      <div className="text-[12px] font-medium text-white/85 leading-snug">{d.label}</div>

                      <div className="flex items-center gap-1 mt-auto">
                        <Clock size={9} className="text-white/30 shrink-0" />
                        <span className="text-[10px] text-white/40 font-mono">{d.hours}</span>
                      </div>

                      <span
                        className="absolute top-3 right-3 text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded"
                        style={{ background: ts.bg, color: ts.color, border: `1px solid ${ts.border}` }}
                      >
                        {t(`tags.${d.tag}`)}
                      </span>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              2. BUILD-UP
          ════════════════════════════════════════════════════════════════ */}
          <section id="buildup">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#c49228] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#c49228] shrink-0" />
                {t("buildup.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("buildup.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("buildup.subtitle")}</p>
            </RevealOnScroll>

            {/* Important note */}
            <RevealOnScroll animation="up" delay={60}>
              <div className="flex gap-3 bg-[#c49228]/10 border border-[#c49228]/25 rounded-xl px-5 py-4 mb-6">
                <Info size={15} className="text-[#c49228] shrink-0 mt-0.5" />
                <p className="text-[13px] text-white/70 leading-relaxed">{t("buildup.note")}</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll animation="up" delay={100}>
              <DetailTable rows={buildupRows} icon={Hammer} color="#c49228" />
            </RevealOnScroll>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              3. SHOW DAYS
          ════════════════════════════════════════════════════════════════ */}
          <section id="show-days">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />
                {t("showDays.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("showDays.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-8">{t("showDays.subtitle")}</p>
            </RevealOnScroll>

            <div className="space-y-4">
              {(["day1","day2","day3"] as const).map((key, i) => {
                const tag    = t(`showDays.days.${key}.tag`);
                const ts     = TAG_STYLE[tag] ?? TAG_STYLE.show;
                const special = t(`showDays.days.${key}.special`);
                return (
                  <RevealOnScroll key={key} animation="left" delay={i * 80} threshold={0.04}>
                    <div
                      className="rounded-xl border overflow-hidden"
                      style={{ borderColor: ts.border }}
                    >
                      {/* Header bar */}
                      <div
                        className="flex items-center justify-between px-5 py-3.5"
                        style={{ background: ts.bg }}
                      >
                        <div className="flex items-center gap-3">
                          <Calendar size={14} style={{ color: ts.color }} />
                          <div>
                            <span className="font-heading text-[14px] font-bold text-white">
                              {t(`showDays.days.${key}.label`)}
                            </span>
                            <span className="ml-2 text-[12px] text-white/50">
                              {t(`showDays.days.${key}.date`)} · {t(`showDays.days.${key}.day`)}
                            </span>
                          </div>
                        </div>
                        <span
                          className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border"
                          style={{ color: ts.color, borderColor: ts.border, background: "transparent" }}
                        >
                          {t(`tags.${tag}`)}
                        </span>
                      </div>

                      {/* Time grid */}
                      <div className="bg-[#141420] px-5 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                          {[
                            { label: t("showDays.fastLane"),  value: t(`showDays.days.${key}.fastLane`), icon: <Users size={12} />,  color: "#c49228" },
                            { label: t("showDays.publicOpen"), value: t(`showDays.days.${key}.open`),    icon: <Clock size={12} />,   color: "#22c55e" },
                            { label: t("showDays.publicClose"),value: t(`showDays.days.${key}.close`),   icon: <Clock size={12} />,   color: "#e4173f" },
                          ].map(({ label, value, icon, color }) => (
                            <div key={label} className="bg-[#0d0d1a] rounded-lg px-4 py-3 flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18`, color }}>
                                {icon}
                              </div>
                              <div>
                                <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">{label}</div>
                                <div className="font-heading text-[17px] font-bold text-white">{value}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Special notice for day1 / day3 */}
                        {special && (
                          <div className="flex items-start gap-2.5 bg-[#e4173f]/08 border border-[#e4173f]/20 rounded-lg px-4 py-3">
                            <AlertTriangle size={13} className="text-[#e4173f] shrink-0 mt-0.5" />
                            <span className="text-[12px] text-white/70 leading-relaxed">{special}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              4. TEARDOWN
          ════════════════════════════════════════════════════════════════ */}
          <section id="teardown">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#00c4d4] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#00c4d4] shrink-0" />
                {t("teardown.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("teardown.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("teardown.subtitle")}</p>
            </RevealOnScroll>

            <RevealOnScroll animation="up" delay={60}>
              <div className="flex gap-3 bg-[#00c4d4]/08 border border-[#00c4d4]/20 rounded-xl px-5 py-4 mb-6">
                <Info size={15} className="text-[#00c4d4] shrink-0 mt-0.5" />
                <p className="text-[13px] text-white/70 leading-relaxed">{t("teardown.note")}</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll animation="up" delay={100}>
              <DetailTable rows={teardownRows} icon={Truck} color="#00c4d4" />
            </RevealOnScroll>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              5. SOUND POLICY
          ════════════════════════════════════════════════════════════════ */}
          <section id="sound-policy">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />
                {t("soundPolicy.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("soundPolicy.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("soundPolicy.subtitle")}</p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

              {/* Description + warning */}
              <RevealOnScroll animation="left" className="lg:col-span-2">
                <div className="flex flex-col gap-4 h-full">
                  <div className="bg-[#e4173f] rounded-xl p-6 flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <VolumeX size={15} className="text-white" />
                      </div>
                      <span className="font-heading text-[11px] font-bold tracking-[0.1em] text-white/75 uppercase">
                        {t("soundPolicy.eyebrow")}
                      </span>
                    </div>
                    <div className="font-heading text-[22px] font-extrabold text-white leading-tight mb-3">
                      11:00 – 12:30
                    </div>
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      {t("soundPolicy.desc")}
                    </p>
                  </div>

                  {/* Warning strip */}
                  <div className="flex gap-3 bg-[#e4173f]/10 border border-[#e4173f]/25 rounded-xl px-4 py-3.5">
                    <AlertTriangle size={14} className="text-[#e4173f] shrink-0 mt-0.5" />
                    <p className="text-[12px] text-white/65 leading-relaxed">{t("soundPolicy.warning")}</p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Rules table */}
              <RevealOnScroll animation="right" delay={80} className="lg:col-span-3">
                <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden h-full">
                  {soundRules.map(({ label, value }, i) => (
                    <div key={label} className={`flex gap-4 px-5 py-4 ${i < soundRules.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                      <div className="w-8 h-8 rounded-lg bg-[#e4173f]/10 text-[#e4173f] flex items-center justify-center shrink-0 mt-0.5">
                        <Volume2 size={13} />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white/45 uppercase tracking-wider mb-0.5">{label}</div>
                        <div className="text-[13px] text-white/80 leading-relaxed">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
