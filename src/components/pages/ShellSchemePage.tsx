"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight, Info, Check, Ruler,
  Zap, Type, PlusCircle, AlertTriangle, Package,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const SECTIONS = [
  { id: "included", labelKey: "sections.included" },
  { id: "specs",    labelKey: "sections.specs"    },
  { id: "fascia",   labelKey: "sections.fascia"   },
  { id: "addons",   labelKey: "sections.addons"   },
  { id: "rules",    labelKey: "sections.rules"    },
] as const;

const ACCENT = "#00c4d4"; // teal — shell scheme theme

const ADDON_COLORS: Record<string, string> = {
  "#c49228": "#c49228",
  "#00c4d4": "#00c4d4",
  "#a78bfa": "#a78bfa",
};

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
      <div className="text-[10px] font-bold tracking-[0.14em] text-white/35 uppercase mb-3 font-heading">On this page</div>
      <ul className="space-y-0.5">
        {SECTIONS.map(({ id }, i) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a href={`#${id}`} className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${isActive ? "text-[#00c4d4] border border-[#00c4d4]/20 bg-[#00c4d4]/10" : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"}`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-[#00c4d4]" : "bg-white/20"}`} />
                {labels[i]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function InfoNote({ text, color = ACCENT }: { text: string; color?: string }) {
  return (
    <div className="flex gap-3 rounded-xl px-5 py-4 border mb-6" style={{ background: `${color}0d`, borderColor: `${color}30` }}>
      <Info size={15} className="shrink-0 mt-0.5" style={{ color }} />
      <p className="text-[13px] text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}

function RuleTable({ rows, color = ACCENT, icon: Icon }: {
  rows: { label: string; value: string }[];
  color?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
      {rows.map(({ label, value }, i) => (
        <div key={label} className={`flex gap-4 px-5 py-4 ${i < rows.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${color}18`, color }}>
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

export function ShellSchemePage() {
  const t = useTranslations("shellScheme");
  const locale = useLocale();
  const labels = SECTIONS.map((s) => t(s.labelKey));

  const includedItems = (["walls","carpet","fascia","power","lighting","table","bin"] as const)
    .map((k) => ({ label: t(`included.items.${k}.label`), value: t(`included.items.${k}.value`) }));

  const specsRows = (["wallHeight","wallFinish","maxDeco","drilling","openSides","flooring"] as const)
    .map((k) => ({ label: t(`specs.items.${k}.label`), value: t(`specs.items.${k}.value`) }));

  const fasciaRules = (["length","language","font","deadline","changes"] as const)
    .map((k) => ({ label: t(`fascia.rules.${k}.label`), value: t(`fascia.rules.${k}.value`) }));

  const rulesItems = (["paint","drilling","height","storage","subletting"] as const)
    .map((k) => ({ label: t(`rules.items.${k}.label`), value: t(`rules.items.${k}.value`) }));

  const addonKeys = ["power","lighting","furniture","graphics","av","walling"] as const;

  return (
    <div className="min-h-screen bg-[#09090f] text-white">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.07] bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-[calc(var(--nav-h)+2.5rem)] pb-10">
          <div className="flex items-center gap-1.5 text-[11px] text-white/35 font-heading font-bold tracking-widest uppercase mb-5">
            <Link href={`/${locale}`} className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white/55">{t("breadcrumb")}</span>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-[#00c4d4]">{t("title")}</span>
          </div>
          <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#00c4d4] uppercase mb-3">
            <span className="w-5 h-[2px] bg-[#00c4d4] shrink-0" />
            {t("breadcrumb")}
          </div>
          <h1 className="font-heading font-extrabold tracking-[-0.02em] text-white leading-none mb-2" style={{ fontSize: "clamp(32px,5vw,52px)" }}>
            {t("title")}
          </h1>
          <p className="text-[15px] text-white/55 mt-2">{t("subtitle")}</p>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex gap-12 items-start">
        <SidebarNav labels={labels} />

        <div className="flex-1 min-w-0 space-y-20">

          {/* ══ 1. WHAT'S INCLUDED ═══════════════════════════════════════════ */}
          <section id="included">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#00c4d4] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#00c4d4] shrink-0" />{t("included.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-1">
                {t("included.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("included.subtitle")}</p>
            </RevealOnScroll>

            {/* Overview stat bar */}
            <RevealOnScroll animation="up" delay={60}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {(["height","walls","power","fascia"] as const).map((k, i) => (
                  <div key={k} className="bg-[#141420] border border-white/[0.07] rounded-xl px-4 py-3.5 hover:border-[#00c4d4]/25 transition-colors">
                    <div className="font-heading text-[20px] font-extrabold leading-none mb-1" style={{ color: ACCENT }}>
                      {t(`overview.stats.${k}`)}
                    </div>
                    <div className="text-[11px] text-white/45">{t(`overview.stats.${k}Label`)}</div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Included items checklist */}
            <RevealOnScroll animation="up" delay={100}>
              <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
                {includedItems.map(({ label, value }, i) => (
                  <div key={label} className={`flex gap-4 px-5 py-4 ${i < includedItems.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                    <div className="w-6 h-6 rounded-full bg-[#00c4d4]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} style={{ color: ACCENT }} strokeWidth={3} />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-white mb-0.5">{label}</div>
                      <div className="text-[12px] text-white/55 leading-relaxed">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </section>

          {/* ══ 2. BOOTH SPECS ═══════════════════════════════════════════════ */}
          <section id="specs">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#00c4d4] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#00c4d4] shrink-0" />{t("specs.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-6">
                {t("specs.title")}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={80}>
              <RuleTable rows={specsRows} color={ACCENT} icon={Ruler} />
            </RevealOnScroll>
          </section>

          {/* ══ 3. FASCIA NAME ═══════════════════════════════════════════════ */}
          <section id="fascia">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#00c4d4] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#00c4d4] shrink-0" />{t("fascia.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-1">
                {t("fascia.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("fascia.subtitle")}</p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Visual mock of fascia board */}
              <RevealOnScroll animation="left" className="lg:col-span-2">
                <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden h-full flex flex-col">
                  <div className="px-5 py-4 border-b border-white/[0.06]">
                    <div className="text-[10px] font-bold tracking-widest text-white/35 uppercase mb-2">Preview</div>
                    {/* Fascia mockup */}
                    <div className="bg-black rounded-lg px-4 py-3 border border-white/10 flex items-center justify-center min-h-[60px]">
                      <span className="font-heading text-[15px] font-bold text-white tracking-wider">YOUR COMPANY NAME</span>
                    </div>
                    <div className="text-[10px] text-white/25 text-center mt-2">Standard fascia — white on black</div>
                  </div>
                  <div className="px-5 py-4 flex-1">
                    <p className="text-[13px] text-white/60 leading-relaxed">{t("fascia.desc")}</p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Rules */}
              <RevealOnScroll animation="right" delay={80} className="lg:col-span-3">
                <RuleTable rows={fasciaRules} color={ACCENT} icon={Type} />
              </RevealOnScroll>
            </div>
          </section>

          {/* ══ 4. ADD-ONS ═══════════════════════════════════════════════════ */}
          <section id="addons">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#00c4d4] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#00c4d4] shrink-0" />{t("addons.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-1">
                {t("addons.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-8">{t("addons.subtitle")}</p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {addonKeys.map((key, i) => {
                const color = t(`addons.items.${key}.color`);
                return (
                  <RevealOnScroll key={key} animation="scale" delay={i * 55} threshold={0.05}>
                    <div className="bg-[#141420] border border-white/[0.07] rounded-xl p-4 hover:border-white/15 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] transition-all duration-200 h-full flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18`, color }}>
                          <PlusCircle size={14} />
                        </div>
                        <span
                          className="text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded"
                          style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
                        >
                          {t(`addons.items.${key}.form`)}
                        </span>
                      </div>
                      <div>
                        <div className="font-heading text-[13px] font-bold text-white mb-1">{t(`addons.items.${key}.label`)}</div>
                        <div className="text-[12px] text-white/55 leading-relaxed">{t(`addons.items.${key}.desc`)}</div>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </section>

          {/* ══ 5. RULES ═════════════════════════════════════════════════════ */}
          <section id="rules">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />{t("rules.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-6">
                {t("rules.title")}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={60}>
              <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
                {rulesItems.map(({ label, value }, i) => (
                  <div key={label} className={`flex gap-4 px-5 py-4 ${i < rulesItems.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                    <div className="w-8 h-8 rounded-lg bg-[#e4173f]/10 text-[#e4173f] flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle size={13} />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white/45 uppercase tracking-wider mb-0.5">{label}</div>
                      <div className="text-[13px] text-white/80 leading-relaxed">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </section>

        </div>
      </div>
    </div>
  );
}
