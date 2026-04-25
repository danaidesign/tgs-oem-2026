"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  AlertTriangle,
  Truck,
  Calendar,
  ArrowUpSquare,
  PackageOpen,
  ShieldAlert,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const ACCENT = "#f97316";

const SECTIONS = [
  { id: "overview",   labelKey: "sections.overview"   },
  { id: "schedule",   labelKey: "sections.schedule"   },
  { id: "vehicles",   labelKey: "sections.vehicles"   },
  { id: "elevator",   labelKey: "sections.elevator"   },
  { id: "moveIn",     labelKey: "sections.moveIn"     },
  { id: "prohibited", labelKey: "sections.prohibited" },
] as const;

const TAG_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  setup:    { color: "#c49228", bg: "rgba(196,146,42,0.12)",  border: "rgba(196,146,42,0.25)"  },
  show:     { color: "#e4173f", bg: "rgba(228,23,63,0.12)",   border: "rgba(228,23,63,0.25)"   },
  teardown: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.25)" },
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function SidebarNav({ labels }: { labels: string[] }) {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      io.observe(el);
      obs.push(io);
    });
    return () => obs.forEach((o) => o.disconnect());
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
                  isActive ? "border" : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                }`}
                style={
                  isActive
                    ? { color: ACCENT, background: `${ACCENT}12`, borderColor: `${ACCENT}30` }
                    : {}
                }
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
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

// ─── Info Note ────────────────────────────────────────────────────────────────
function InfoNote({ text, color = ACCENT }: { text: string; color?: string }) {
  return (
    <div
      className="flex gap-3 rounded-xl px-5 py-4 border mb-6"
      style={{ background: `${color}0d`, borderColor: `${color}30` }}
    >
      <AlertTriangle size={15} className="shrink-0 mt-0.5" style={{ color }} />
      <p className="text-[13px] text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}

// ─── Rule Table ───────────────────────────────────────────────────────────────
function RuleTable({
  rows,
  icon: Icon,
  color = ACCENT,
}: {
  rows: { label: string; value: string }[];
  icon: React.ElementType;
  color?: string;
}) {
  return (
    <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
      {rows.map(({ label, value }, i) => (
        <div
          key={label}
          className={`flex gap-4 px-5 py-4 ${i < rows.length - 1 ? "border-b border-white/[0.05]" : ""}`}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: `${color}18`, color }}
          >
            <Icon size={13} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white/45 uppercase tracking-wider mb-0.5">
              {label}
            </div>
            <div className="text-[13px] text-white/80 leading-relaxed">{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  color = ACCENT,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  color?: string;
}) {
  return (
    <RevealOnScroll animation="up">
      <div
        className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5"
        style={{ color }}
      >
        <span className="w-5 h-[2px] shrink-0" style={{ background: color }} />
        {eyebrow}
      </div>
      <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-1">
        {title}
      </h2>
      {subtitle && <p className="text-[14px] text-white/45 mb-6">{subtitle}</p>}
    </RevealOnScroll>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function FreightPage() {
  const t = useTranslations("freight");
  const locale = useLocale();

  const sidebarLabels = SECTIONS.map((s) => t(s.labelKey));

  // Section rows
  const vehicleRows = (["maxSize", "lanes", "height", "checkin", "time", "hazmat"] as const).map(
    (k) => ({ label: t(`vehicles.items.${k}.label`), value: t(`vehicles.items.${k}.value`) })
  );
  const elevatorRows = (["capacity", "dimensions", "booking", "priority", "staff"] as const).map(
    (k) => ({ label: t(`elevator.items.${k}.label`), value: t(`elevator.items.${k}.value`) })
  );
  const moveInRows = (["oct15ban", "oct16ok", "deadline", "insurance", "teardown", "labels"] as const).map(
    (k) => ({ label: t(`moveIn.rules.${k}.label`), value: t(`moveIn.rules.${k}.value`) })
  );
  const prohibitedRows = (["weapons", "flammable", "gas", "animals", "drones", "food"] as const).map(
    (k) => ({ label: t(`prohibited.items.${k}.label`), value: t(`prohibited.items.${k}.value`) })
  );

  const days = ["oct15", "oct16", "oct17", "oct19"] as const;

  return (
    <div className="min-h-screen bg-[#09090f] text-white">

      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.07] bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-[calc(var(--nav-h)+2.5rem)] pb-10">
          <div className="flex items-center gap-1.5 text-[11px] text-white/35 font-heading font-bold tracking-widest uppercase mb-5">
            <Link href={`/${locale}`} className="hover:text-white/60 transition-colors">
              Home
            </Link>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white/55">{t("breadcrumb")}</span>
            <ChevronRight size={10} className="text-white/20" />
            <span style={{ color: ACCENT }}>{t("title")}</span>
          </div>
          <div
            className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-3"
            style={{ color: ACCENT }}
          >
            <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
            {t("breadcrumb")}
          </div>
          <h1
            className="font-heading font-extrabold tracking-[-0.02em] text-white leading-none mb-2"
            style={{ fontSize: "clamp(32px,5vw,52px)" }}
          >
            {t("title")}
          </h1>
          <p className="text-[15px] text-white/55 mt-2">{t("subtitle")}</p>
        </div>
      </div>

      {/* ─── Body ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex gap-12 items-start">
        <SidebarNav labels={sidebarLabels} />

        <div className="flex-1 min-w-0 space-y-20">

          {/* ── Overview ───────────────────────────────────────────────────── */}
          <section id="overview">
            <SectionHeader
              eyebrow={t("overview.eyebrow")}
              title={t("overview.title")}
            />
            <RevealOnScroll animation="up" delay={60}>
              <p className="text-[14px] text-white/55 leading-relaxed mb-8">
                {t("overview.desc")}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(
                  [
                    { val: "lanes",      label: "lanesLabel"      },
                    { val: "maxVehicle", label: "maxVehicleLabel" },
                    { val: "elevator",   label: "elevatorLabel"   },
                    { val: "moveIn",     label: "moveInLabel"     },
                  ] as const
                ).map(({ val, label }) => (
                  <div
                    key={val}
                    className="rounded-xl border px-5 py-4 text-center"
                    style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}25` }}
                  >
                    <div
                      className="font-heading font-extrabold text-[clamp(22px,3vw,30px)] leading-none mb-1"
                      style={{ color: ACCENT }}
                    >
                      {t(`overview.stats.${val}`)}
                    </div>
                    <div className="text-[11px] text-white/45 font-medium tracking-wide">
                      {t(`overview.stats.${label}`)}
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </section>

          {/* ── Schedule ────────────────────────────────────────────────────── */}
          <section id="schedule">
            <SectionHeader
              eyebrow={t("schedule.eyebrow")}
              title={t("schedule.title")}
              subtitle={t("schedule.subtitle")}
            />
            <RevealOnScroll animation="up" delay={80}>
              <div className="space-y-4">
                {days.map((day) => {
                  const tag = t(`schedule.days.${day}.tag`);
                  const ts = TAG_STYLE[tag] ?? TAG_STYLE.setup;
                  const warning = t(`schedule.days.${day}.warning`);
                  return (
                    <div
                      key={day}
                      className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden"
                    >
                      <div className="flex flex-wrap items-start gap-4 px-5 py-4">
                        {/* Date + tag */}
                        <div className="shrink-0 w-40">
                          <div className="text-[12px] font-bold text-white/80 mb-1">
                            {t(`schedule.days.${day}.date`)}
                          </div>
                          <span
                            className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                            style={{ color: ts.color, background: ts.bg, border: `1px solid ${ts.border}` }}
                          >
                            {tag}
                          </span>
                        </div>
                        {/* Hours */}
                        <div className="shrink-0 flex items-center gap-2 w-36">
                          <Calendar size={13} style={{ color: ACCENT }} />
                          <span className="text-[12px] font-mono text-white/65">
                            {t(`schedule.days.${day}.hours`)}
                          </span>
                        </div>
                        {/* Title + detail */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-white mb-0.5">
                            {t(`schedule.days.${day}.title`)}
                          </div>
                          <div className="text-[12px] text-white/55 leading-relaxed">
                            {t(`schedule.days.${day}.detail`)}
                          </div>
                        </div>
                      </div>
                      {warning && (
                        <div
                          className="flex gap-2 items-start px-5 py-2.5 border-t"
                          style={{
                            background: "rgba(228,23,63,0.06)",
                            borderColor: "rgba(228,23,63,0.2)",
                          }}
                        >
                          <AlertTriangle size={12} className="shrink-0 mt-0.5 text-[#e4173f]" />
                          <span className="text-[11px] text-[#e4173f]/80">{warning}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </RevealOnScroll>
          </section>

          {/* ── Vehicles ────────────────────────────────────────────────────── */}
          <section id="vehicles">
            <SectionHeader
              eyebrow={t("vehicles.eyebrow")}
              title={t("vehicles.title")}
              subtitle={t("vehicles.subtitle")}
            />
            <RevealOnScroll animation="up" delay={60}>
              <InfoNote text={t("vehicles.note")} />
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={100}>
              <RuleTable rows={vehicleRows} icon={Truck} />
            </RevealOnScroll>
          </section>

          {/* ── Elevator ────────────────────────────────────────────────────── */}
          <section id="elevator">
            <SectionHeader
              eyebrow={t("elevator.eyebrow")}
              title={t("elevator.title")}
              subtitle={t("elevator.subtitle")}
            />
            <RevealOnScroll animation="up" delay={60}>
              <InfoNote text={t("elevator.note")} />
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={100}>
              <RuleTable rows={elevatorRows} icon={ArrowUpSquare} />
            </RevealOnScroll>
          </section>

          {/* ── Move-in / Move-out ───────────────────────────────────────────── */}
          <section id="moveIn">
            <SectionHeader
              eyebrow={t("moveIn.eyebrow")}
              title={t("moveIn.title")}
              subtitle={t("moveIn.subtitle")}
            />
            <RevealOnScroll animation="up" delay={80}>
              <RuleTable rows={moveInRows} icon={PackageOpen} />
            </RevealOnScroll>
          </section>

          {/* ── Prohibited ──────────────────────────────────────────────────── */}
          <section id="prohibited">
            <SectionHeader
              eyebrow={t("prohibited.eyebrow")}
              title={t("prohibited.title")}
              subtitle={t("prohibited.subtitle")}
            />
            <RevealOnScroll animation="up" delay={80}>
              <RuleTable rows={prohibitedRows} icon={ShieldAlert} color="#e4173f" />
            </RevealOnScroll>
          </section>

        </div>
      </div>
    </div>
  );
}
