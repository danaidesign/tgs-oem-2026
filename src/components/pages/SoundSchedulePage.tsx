"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  VolumeX,
  Volume2,
  AlertTriangle,
  Clock,
  Users,
  Info,
  Ban,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const ACCENT = "#a78bfa";

// ─── Sections ────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "overview",  labelKey: "sections.overview"  },
  { id: "non-sound", labelKey: "sections.nonSound"  },
  { id: "daily",     labelKey: "sections.daily"     },
  { id: "rules",     labelKey: "sections.rules"     },
  { id: "overtime",  labelKey: "sections.overtime"  },
] as const;

// ─── Sidebar ──────────────────────────────────────────────────────────────────
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
                    ? "text-[#a78bfa] border border-[#a78bfa]/20"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                }`}
                style={isActive ? { background: `${ACCENT}1a` } : {}}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 transition-all"
                  style={{ background: isActive ? ACCENT : "rgba(255,255,255,0.2)" }}
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

// ─── Detail table ─────────────────────────────────────────────────────────────
function RuleRow({
  label,
  value,
  icon: Icon,
  color,
  last,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  last?: boolean;
}) {
  return (
    <div className={`flex gap-4 px-5 py-4 ${!last ? "border-b border-white/[0.05]" : ""}`}>
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
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function SoundSchedulePage() {
  const t = useTranslations("soundSchedule");
  const locale = useLocale();

  const sectionLabels = SECTIONS.map((s) => t(s.labelKey));

  const ruleKeys = ["volume", "music", "subwoofer", "screens", "organiser"] as const;
  const dayKeys  = ["oct17", "oct18", "oct19"] as const;

  return (
    <div className="min-h-screen bg-[#09090f] text-white">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.07] bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-[calc(var(--nav-h)+2.5rem)] pb-10">
          <div className="flex items-center gap-1.5 text-[11px] text-white/35 font-heading font-bold tracking-widest uppercase mb-5">
            <Link href={`/${locale}`} className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white/55">{t("breadcrumb")}</span>
            <ChevronRight size={10} className="text-white/20" />
            <span style={{ color: ACCENT }}>{t("title")}</span>
          </div>

          <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-3" style={{ color: ACCENT }}>
            <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
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

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex gap-12 items-start">
        <SidebarNav labels={sectionLabels} />

        <div className="flex-1 min-w-0 space-y-20">

          {/* ════════════════════════════════════════════════════════════════
              1. OVERVIEW
          ════════════════════════════════════════════════════════════════ */}
          <section id="overview">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("overview.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1.5">
                {t("overview.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-8 max-w-2xl">{t("overview.desc")}</p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["nonSound", "maxVolume"] as const).map((key, i) => (
                <RevealOnScroll key={key} animation="up" delay={i * 60} threshold={0.05}>
                  <div
                    className="rounded-xl border p-5 flex flex-col gap-2"
                    style={{ background: `${ACCENT}0d`, borderColor: `${ACCENT}30` }}
                  >
                    <div className="text-[10px] font-bold tracking-[0.12em] uppercase mb-1" style={{ color: ACCENT }}>
                      {t(`overview.stats.${key}Label`)}
                    </div>
                    <div className="font-heading text-[28px] font-extrabold text-white leading-none">
                      {t(`overview.stats.${key}`)}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              2. NON-SOUND PERIOD
          ════════════════════════════════════════════════════════════════ */}
          <section id="non-sound">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />
                {t("nonSound.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("nonSound.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("nonSound.subtitle")}</p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

              {/* Red block with time */}
              <RevealOnScroll animation="left" className="lg:col-span-2">
                <div className="flex flex-col gap-4 h-full">
                  <div className="bg-[#e4173f] rounded-xl p-6 flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <VolumeX size={15} className="text-white" />
                      </div>
                      <span className="font-heading text-[11px] font-bold tracking-[0.1em] text-white/75 uppercase">
                        {t("nonSound.eyebrow")}
                      </span>
                    </div>
                    <div className="font-heading text-[clamp(28px,4vw,44px)] font-extrabold text-white leading-tight mb-3 tracking-tight">
                      11:00 – 12:30
                    </div>
                    <div className="text-[11px] font-bold tracking-wider text-white/70 uppercase mb-2">Oct 17 · Opening Day Only</div>
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      {t("nonSound.reason")}
                    </p>
                  </div>

                  <div className="flex gap-3 bg-[#e4173f]/10 border border-[#e4173f]/25 rounded-xl px-4 py-3.5">
                    <AlertTriangle size={14} className="text-[#e4173f] shrink-0 mt-0.5" />
                    <p className="text-[12px] text-white/65 leading-relaxed">{t("nonSound.warning")}</p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* What must be turned off */}
              <RevealOnScroll animation="right" delay={80} className="lg:col-span-3">
                <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden h-full">
                  <div className="px-5 py-4 border-b border-white/[0.07]">
                    <div className="text-[11px] font-bold text-white/45 uppercase tracking-wider">{t("nonSound.off.title")}</div>
                  </div>
                  {(["audio", "video", "mic", "lighting"] as const).map((key, i, arr) => (
                    <div key={key} className={`flex gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                      <div className="w-8 h-8 rounded-lg bg-[#e4173f]/10 text-[#e4173f] flex items-center justify-center shrink-0 mt-0.5">
                        <Ban size={13} />
                      </div>
                      <div className="text-[13px] text-white/80 leading-relaxed self-center">
                        {t(`nonSound.off.${key}`)}
                      </div>
                    </div>
                  ))}

                  <div className="px-5 py-4 border-t border-white/[0.07]">
                    <div className="flex gap-3 bg-[#a78bfa]/08 border border-[#a78bfa]/20 rounded-xl px-4 py-3">
                      <Info size={13} className="text-[#a78bfa] shrink-0 mt-0.5" />
                      <p className="text-[12px] text-white/65 leading-relaxed">{t("nonSound.desc")}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              3. DAILY SOUND HOURS
          ════════════════════════════════════════════════════════════════ */}
          <section id="daily">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("daily.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("daily.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-8">{t("daily.subtitle")}</p>
            </RevealOnScroll>

            <div className="space-y-4">
              {dayKeys.map((key, i) => {
                const note = t(`daily.days.${key}.note`);
                return (
                  <RevealOnScroll key={key} animation="left" delay={i * 80} threshold={0.04}>
                    <div
                      className="rounded-xl border overflow-hidden"
                      style={{ borderColor: `${ACCENT}30` }}
                    >
                      <div
                        className="flex items-center gap-3 px-5 py-3.5"
                        style={{ background: `${ACCENT}12` }}
                      >
                        <Volume2 size={14} style={{ color: ACCENT }} />
                        <span className="font-heading text-[14px] font-bold text-white">
                          {t(`daily.days.${key}.date`)}
                        </span>
                        <span className="text-[12px] text-white/50">
                          · {t(`daily.days.${key}.day`)}
                        </span>
                      </div>

                      <div className="bg-[#141420] px-5 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                          {([
                            { label: t("daily.fastLane"),   value: t(`daily.days.${key}.fastLane`), icon: <Users size={12} />,  color: "#c49228" },
                            { label: t("daily.publicOpen"), value: t(`daily.days.${key}.open`),     icon: <Clock size={12} />,  color: "#22c55e" },
                            { label: t("daily.publicClose"),value: t(`daily.days.${key}.close`),    icon: <Clock size={12} />,  color: "#e4173f" },
                          ]).map(({ label, value, icon, color }) => (
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

                        {note && (
                          <div className="flex items-start gap-2.5 bg-[#e4173f]/08 border border-[#e4173f]/20 rounded-lg px-4 py-3">
                            <VolumeX size={13} className="text-[#e4173f] shrink-0 mt-0.5" />
                            <span className="text-[12px] text-white/70 leading-relaxed">{note}</span>
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
              4. SOUND RULES
          ════════════════════════════════════════════════════════════════ */}
          <section id="rules">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("rules.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("rules.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("rules.subtitle")}</p>
            </RevealOnScroll>

            <RevealOnScroll animation="up" delay={60}>
              <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
                {ruleKeys.map((key, i) => (
                  <RuleRow
                    key={key}
                    label={t(`rules.items.${key}.label`)}
                    value={t(`rules.items.${key}.value`)}
                    icon={Volume2}
                    color={ACCENT}
                    last={i === ruleKeys.length - 1}
                  />
                ))}
              </div>
            </RevealOnScroll>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              5. OVERTIME & PENALTIES
          ════════════════════════════════════════════════════════════════ */}
          <section id="overtime">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("overtime.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("overtime.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("overtime.subtitle")}</p>
            </RevealOnScroll>

            {/* Overtime rate card */}
            <RevealOnScroll animation="up" delay={40}>
              <div
                className="rounded-xl border px-5 py-5 mb-5"
                style={{ background: `${ACCENT}0d`, borderColor: `${ACCENT}30` }}
              >
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase mb-1.5" style={{ color: ACCENT }}>
                  {t("overtime.rate.label")}
                </div>
                <div className="font-heading text-[24px] font-extrabold text-white leading-none mb-1.5">
                  5,000 THB / booth / hr
                </div>
                <p className="text-[13px] text-white/55 leading-relaxed">{t("overtime.rate.value")}</p>
              </div>
            </RevealOnScroll>

            {/* Violation policy */}
            <RevealOnScroll animation="up" delay={80}>
              <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.07]">
                  <div className="text-[11px] font-bold text-white/45 uppercase tracking-wider">
                    {t("overtime.violations.title")}
                  </div>
                </div>
                {(["first", "second", "repeat"] as const).map((key, i, arr) => (
                  <RuleRow
                    key={key}
                    label={t(`overtime.violations.${key}.label`)}
                    value={t(`overtime.violations.${key}.value`)}
                    icon={AlertTriangle}
                    color={key === "first" ? "#c49228" : key === "second" ? "#e4173f" : ACCENT}
                    last={i === arr.length - 1}
                  />
                ))}
              </div>
            </RevealOnScroll>
          </section>

        </div>
      </div>
    </div>
  );
}
