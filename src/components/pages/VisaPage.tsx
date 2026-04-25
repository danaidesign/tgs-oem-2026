"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  AlertTriangle,
  Stamp,
  FileText,
  Clock,
  Info,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const ACCENT = "#38bdf8";

const SECTIONS = [
  { id: "overview",    labelKey: "sections.overview"    },
  { id: "eligibility", labelKey: "sections.eligibility" },
  { id: "documents",   labelKey: "sections.documents"   },
  { id: "process",     labelKey: "sections.process"     },
  { id: "timeline",    labelKey: "sections.timeline"    },
  { id: "notes",       labelKey: "sections.notes"       },
] as const;

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
                style={isActive ? { color: ACCENT, background: `${ACCENT}12`, borderColor: `${ACCENT}30` } : {}}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: isActive ? ACCENT : "rgba(255,255,255,0.2)" }} />
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
function InfoNote({ text, color = ACCENT, icon: Icon = AlertTriangle }: {
  text: string; color?: string; icon?: React.ElementType;
}) {
  return (
    <div className="flex gap-4 rounded-xl px-6 py-5 border mb-8"
      style={{ background: `${color}0d`, borderColor: `${color}30` }}>
      <Icon size={16} className="shrink-0 mt-0.5" style={{ color }} />
      <p className="text-[14px] text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}

// ─── Rule Table ───────────────────────────────────────────────────────────────
function RuleTable({ rows, icon: Icon, color = ACCENT }: {
  rows: { label: string; value: string }[];
  icon: React.ElementType;
  color?: string;
}) {
  return (
    <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
      {rows.map(({ label, value }, i) => (
        <div key={label}
          className={`flex gap-4 px-5 py-4 ${i < rows.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: `${color}18`, color }}>
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

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle, color = ACCENT }: {
  eyebrow: string; title: string; subtitle?: string; color?: string;
}) {
  return (
    <RevealOnScroll animation="up">
      <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5"
        style={{ color }}>
        <span className="w-5 h-[2px] shrink-0" style={{ background: color }} />
        {eyebrow}
      </div>
      <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-1">
        {title}
      </h2>
      {subtitle
        ? <p className="text-[14px] text-white/45 mb-6">{subtitle}</p>
        : <div className="mb-6" />
      }
    </RevealOnScroll>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function VisaPage() {
  const t = useTranslations("visa");
  const locale = useLocale();

  const sidebarLabels = SECTIONS.map((s) => t(s.labelKey));

  const eligibilityRows = (["who", "countries", "staff", "buyers"] as const).map((k) => ({
    label: t(`eligibility.items.${k}.label`), value: t(`eligibility.items.${k}.value`),
  }));
  const documentRows = (["passport", "registration", "form", "photo", "company"] as const).map((k) => ({
    label: t(`documents.items.${k}.label`), value: t(`documents.items.${k}.value`),
  }));
  const timelineRows = (["open", "deadline", "late", "cutoff"] as const).map((k) => ({
    label: t(`timeline.items.${k}.label`), value: t(`timeline.items.${k}.value`),
  }));
  const noteRows = (["noGuarantee", "cost", "responsibility", "contact"] as const).map((k) => ({
    label: t(`notes.items.${k}.label`), value: t(`notes.items.${k}.value`),
  }));

  const steps = (["s1", "s2", "s3", "s4", "s5"] as const);

  return (
    <div className="min-h-screen bg-[#09090f] text-white">

      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.07] bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-[calc(var(--nav-h)+2.5rem)] pb-10">
          <div className="flex items-center gap-1.5 text-[11px] text-white/35 font-heading font-bold tracking-widest uppercase mb-5">
            <Link href={`/${locale}`} className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white/55">{t("breadcrumb")}</span>
            <ChevronRight size={10} className="text-white/20" />
            <span style={{ color: ACCENT }}>{t("title")}</span>
          </div>
          <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-3"
            style={{ color: ACCENT }}>
            <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
            {t("breadcrumb")}
          </div>
          <h1 className="font-heading font-extrabold tracking-[-0.02em] text-white leading-none mb-2"
            style={{ fontSize: "clamp(32px,5vw,52px)" }}>
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
            <SectionHeader eyebrow={t("overview.eyebrow")} title={t("overview.title")} />
            <RevealOnScroll animation="up" delay={60}>
              <p className="text-[14px] text-white/55 leading-relaxed mb-8">{t("overview.desc")}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(["deadline", "processing", "format", "language"] as const).map((k) => (
                  <div key={k} className="rounded-xl border px-5 py-4 text-center"
                    style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}25` }}>
                    <div className="font-heading font-extrabold text-[clamp(18px,2.5vw,24px)] leading-none mb-1"
                      style={{ color: ACCENT }}>
                      {t(`overview.stats.${k}`)}
                    </div>
                    <div className="text-[11px] text-white/45 font-medium tracking-wide">
                      {t(`overview.stats.${k}Label`)}
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </section>

          {/* ── Eligibility ─────────────────────────────────────────────────── */}
          <section id="eligibility">
            <SectionHeader
              eyebrow={t("eligibility.eyebrow")}
              title={t("eligibility.title")}
              subtitle={t("eligibility.subtitle")}
            />
            <RevealOnScroll animation="up" delay={80}>
              <RuleTable rows={eligibilityRows} icon={Stamp} />
            </RevealOnScroll>
          </section>

          {/* ── Documents ───────────────────────────────────────────────────── */}
          <section id="documents">
            <SectionHeader
              eyebrow={t("documents.eyebrow")}
              title={t("documents.title")}
              subtitle={t("documents.subtitle")}
            />
            <RevealOnScroll animation="up" delay={80}>
              <RuleTable rows={documentRows} icon={FileText} />
            </RevealOnScroll>
          </section>

          {/* ── Process (Steps) ─────────────────────────────────────────────── */}
          <section id="process">
            <SectionHeader
              eyebrow={t("process.eyebrow")}
              title={t("process.title")}
              subtitle={t("process.subtitle")}
            />
            <RevealOnScroll animation="up" delay={80}>
              <div className="relative space-y-0">
                {/* Connector line */}
                <div className="absolute left-[19px] top-10 bottom-10 w-px bg-white/[0.06]" />
                {steps.map((sk, idx) => (
                  <div key={sk} className={`flex gap-5 ${idx < steps.length - 1 ? "pb-6" : ""}`}>
                    {/* Step number badge */}
                    <div className="relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold font-heading border"
                      style={{ background: `${ACCENT}15`, borderColor: `${ACCENT}40`, color: ACCENT }}>
                      {t(`process.steps.${sk}.num`)}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-1.5 pb-4">
                      <div className="text-[14px] font-bold text-white mb-1">
                        {t(`process.steps.${sk}.title`)}
                      </div>
                      <div className="text-[13px] text-white/55 leading-relaxed">
                        {t(`process.steps.${sk}.desc`)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </section>

          {/* ── Timeline ────────────────────────────────────────────────────── */}
          <section id="timeline">
            <SectionHeader
              eyebrow={t("timeline.eyebrow")}
              title={t("timeline.title")}
              subtitle={t("timeline.subtitle")}
            />
            <RevealOnScroll animation="up" delay={80}>
              <RuleTable rows={timelineRows} icon={Clock} />
            </RevealOnScroll>
          </section>

          {/* ── Notes ───────────────────────────────────────────────────────── */}
          <section id="notes">
            <SectionHeader eyebrow={t("notes.eyebrow")} title={t("notes.title")} />
            <RevealOnScroll animation="up" delay={60}>
              <InfoNote text={noteRows[0].value} color="#e4173f" />
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={80}>
              <RuleTable rows={noteRows.slice(1)} icon={Info} />
            </RevealOnScroll>
          </section>

        </div>
      </div>
    </div>
  );
}
