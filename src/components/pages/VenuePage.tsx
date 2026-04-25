"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {
  ChevronRight,
  MapPin,
  Building2,
  Truck,
  ParkingSquare,
  Train,
  Copy,
  Check,
  ExternalLink,
  Info,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const ACCENT = "#00c4d4";

// ─── Sections ────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "overview", labelKey: "sections.overview" },
  { id: "halls",    labelKey: "sections.halls"    },
  { id: "loading",  labelKey: "sections.loading"  },
  { id: "parking",  labelKey: "sections.parking"  },
  { id: "access",   labelKey: "sections.access"   },
] as const;

// ─── Copy button ─────────────────────────────────────────────────────────────
function CopyBtn({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    if (copied) return;
    await navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value, copied]);

  return (
    <button
      onClick={copy}
      style={{ cursor: "pointer" }}
      className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition-all duration-150 select-none ${
        copied
          ? "border-[#22c55e]/40 bg-[#22c55e]/12 text-[#22c55e]"
          : "border-[#00c4d4]/25 bg-[#00c4d4]/10 text-[#00c4d4] hover:bg-[#00c4d4]/20 hover:border-[#00c4d4]/40 active:scale-95"
      }`}
    >
      {copied ? <Check size={10} strokeWidth={3} /> : <Copy size={10} />}
      <span>{copied ? "Copied!" : (label ?? "Copy")}</span>
    </button>
  );
}

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
                    ? "text-[#00c4d4] border border-[#00c4d4]/20"
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

// ─── Detail row ───────────────────────────────────────────────────────────────
function DetailRow({
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
export function VenuePage() {
  const t = useTranslations("venueInfo");
  const locale = useLocale();

  const sectionLabels = SECTIONS.map((s) => t(s.labelKey));

  const hallKeys    = ["ceiling", "columns", "floor", "power", "connected"] as const;
  const loadingKeys = ["lanes", "vehicles", "elevator", "showHours"] as const;
  const parkingKeys = ["location", "entry", "rate", "height"] as const;
  const statKeys    = ["halls", "area", "loading", "elevator"] as const;

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
            </RevealOnScroll>

            {/* Address card */}
            <RevealOnScroll animation="up" delay={40}>
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border px-5 py-4 mb-6"
                style={{ background: `${ACCENT}0d`, borderColor: `${ACCENT}25` }}
              >
                <div className="flex items-start gap-3">
                  <MapPin size={15} style={{ color: ACCENT }} className="mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[13px] text-white/80 leading-snug">{t("overview.address")}</div>
                    <div className="text-[11px] text-white/45 mt-0.5">{t("overview.addressTh")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={t("overview.mapLink")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition-all duration-150 border-[#00c4d4]/25 bg-[#00c4d4]/10 text-[#00c4d4] hover:bg-[#00c4d4]/20 hover:border-[#00c4d4]/40"
                  >
                    <ExternalLink size={10} />
                    <span>{t("overview.mapLabel")}</span>
                  </a>
                  <CopyBtn value={t("overview.addressTh")} label="Copy Thai" />
                </div>
              </div>
            </RevealOnScroll>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {statKeys.map((key, i) => (
                <RevealOnScroll key={key} animation="up" delay={i * 60} threshold={0.05}>
                  <div
                    className="rounded-xl border p-4 flex flex-col gap-1.5"
                    style={{ background: `${ACCENT}0d`, borderColor: `${ACCENT}25` }}
                  >
                    <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/40">
                      {t(`overview.stats.${key}Label`)}
                    </div>
                    <div className="font-heading text-[20px] font-extrabold text-white leading-none">
                      {t(`overview.stats.${key}`)}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              2. EXHIBITION HALLS
          ════════════════════════════════════════════════════════════════ */}
          <section id="halls">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("halls.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("halls.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("halls.subtitle")}</p>
            </RevealOnScroll>

            <RevealOnScroll animation="up" delay={60}>
              <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
                {hallKeys.map((key, i) => (
                  <DetailRow
                    key={key}
                    label={t(`halls.items.${key}.label`)}
                    value={t(`halls.items.${key}.value`)}
                    icon={Building2}
                    color={ACCENT}
                    last={i === hallKeys.length - 1}
                  />
                ))}
              </div>
            </RevealOnScroll>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              3. LOADING & FREIGHT
          ════════════════════════════════════════════════════════════════ */}
          <section id="loading">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("loading.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("loading.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("loading.subtitle")}</p>
            </RevealOnScroll>

            <RevealOnScroll animation="up" delay={60}>
              <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
                {loadingKeys.map((key, i) => (
                  <DetailRow
                    key={key}
                    label={t(`loading.items.${key}.label`)}
                    value={t(`loading.items.${key}.value`)}
                    icon={Truck}
                    color={ACCENT}
                    last={i === loadingKeys.length - 1}
                  />
                ))}
              </div>
            </RevealOnScroll>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              4. PARKING
          ════════════════════════════════════════════════════════════════ */}
          <section id="parking">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("parking.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("parking.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("parking.subtitle")}</p>
            </RevealOnScroll>

            <RevealOnScroll animation="up" delay={60}>
              <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
                {parkingKeys.map((key, i) => (
                  <DetailRow
                    key={key}
                    label={t(`parking.items.${key}.label`)}
                    value={t(`parking.items.${key}.value`)}
                    icon={ParkingSquare}
                    color={ACCENT}
                    last={i === parkingKeys.length - 1}
                  />
                ))}
              </div>
            </RevealOnScroll>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              5. GETTING HERE
          ════════════════════════════════════════════════════════════════ */}
          <section id="access">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("access.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("access.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("access.subtitle")}</p>
            </RevealOnScroll>

            <div className="space-y-4">
              {/* MRT card */}
              <RevealOnScroll animation="left" delay={0} threshold={0.04}>
                <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden hover:border-[#00c4d4]/25 transition-colors">
                  <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.05]" style={{ background: `${ACCENT}10` }}>
                    <Train size={14} style={{ color: ACCENT }} />
                    <span className="font-heading text-[13px] font-bold text-white">{t("access.mrt.title")}</span>
                  </div>
                  <div className="px-5 py-4 text-[13px] text-white/75 leading-relaxed">{t("access.mrt.value")}</div>
                </div>
              </RevealOnScroll>

              {/* Taxi card */}
              <RevealOnScroll animation="left" delay={60} threshold={0.04}>
                <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden hover:border-[#00c4d4]/25 transition-colors">
                  <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.05]" style={{ background: `${ACCENT}10` }}>
                    <MapPin size={14} style={{ color: ACCENT }} />
                    <span className="font-heading text-[13px] font-bold text-white">{t("access.taxi.title")}</span>
                  </div>
                  <div className="px-5 py-4 text-[13px] text-white/75 leading-relaxed">{t("access.taxi.value")}</div>
                </div>
              </RevealOnScroll>

              {/* Thai address copy card */}
              <RevealOnScroll animation="up" delay={120} threshold={0.04}>
                <div
                  className="rounded-xl border px-5 py-4"
                  style={{ background: `${ACCENT}0d`, borderColor: `${ACCENT}30` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-bold tracking-[0.12em] uppercase mb-1" style={{ color: ACCENT }}>
                        {t("access.thaiAddress.label")}
                      </div>
                      <div className="font-heading text-[16px] font-bold text-white">
                        {t("access.thaiAddress.value")}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <CopyBtn value={t("access.thaiAddress.value")} label={t("access.thaiAddress.copyBtn")} />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Info size={12} className="text-white/30 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-white/40 leading-relaxed">{t("overview.copyLabel")}</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
