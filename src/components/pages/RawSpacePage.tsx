"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight, Info, AlertTriangle,
  Ruler, Flame, Zap, HardHat, ClipboardCheck, CheckCircle2,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const SECTIONS = [
  { id: "overview",     labelKey: "sections.overview"     },
  { id: "construction", labelKey: "sections.construction" },
  { id: "engineer",     labelKey: "sections.engineer"     },
  { id: "electrical",   labelKey: "sections.electrical"   },
  { id: "contractor",   labelKey: "sections.contractor"   },
] as const;

const ACCENT = "#c49228"; // amber — construction theme

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
              <a href={`#${id}`} className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${isActive ? "text-[#c49228] border border-[#c49228]/20 bg-[#c49228]/10" : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"}`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-[#c49228]" : "bg-white/20"}`} />
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

export function RawSpacePage() {
  const t = useTranslations("rawSpace");
  const locale = useLocale();
  const labels = SECTIONS.map((s) => t(s.labelKey));

  const constructionRows = (["height","setback","materials","flooring","rigging","walls","lighting","storage"] as const)
    .map((k) => ({ label: t(`construction.rules.${k}.label`), value: t(`construction.rules.${k}.value`) }));

  const electricalRows = (["supply","order","included","electrician","generator","overnight"] as const)
    .map((k) => ({ label: t(`electrical.items.${k}.label`), value: t(`electrical.items.${k}.value`) }));

  const contractorRows = (["form","insurance","badge","blackdog"] as const)
    .map((k) => ({ label: t(`contractor.items.${k}.label`), value: t(`contractor.items.${k}.value`) }));

  const engineerSteps = (["design","approval","cert","submit","onsite"] as const)
    .map((k) => ({
      step:  t(`engineer.steps.${k}.step`),
      title: t(`engineer.steps.${k}.title`),
      desc:  t(`engineer.steps.${k}.desc`),
    }));

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
            <span className="text-[#c49228]">{t("title")}</span>
          </div>
          <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#c49228] uppercase mb-3">
            <span className="w-5 h-[2px] bg-[#c49228] shrink-0" />
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

          {/* ══ 1. OVERVIEW ══════════════════════════════════════════════════ */}
          <section id="overview">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#c49228] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#c49228] shrink-0" />{t("overview.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-3">
                {t("overview.title")}
              </h2>
              <p className="text-[15px] text-white/65 leading-[1.75] max-w-2xl mb-8">{t("overview.desc")}</p>
            </RevealOnScroll>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(["maxHeight","setback","deadline","cert"] as const).map((k, i) => (
                <RevealOnScroll key={k} animation="scale" delay={i * 55} threshold={0.05}>
                  <div className="bg-[#141420] border border-white/[0.07] rounded-xl px-5 py-4 hover:border-[#c49228]/25 transition-colors">
                    <div className="font-heading text-[22px] font-extrabold leading-none mb-1" style={{ color: ACCENT }}>
                      {t(`overview.stats.${k}`)}
                    </div>
                    <div className="text-[11px] text-white/45 font-medium tracking-wide">{t(`overview.stats.${k}Label`)}</div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* ══ 2. CONSTRUCTION RULES ════════════════════════════════════════ */}
          <section id="construction">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#c49228] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#c49228] shrink-0" />{t("construction.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-1">
                {t("construction.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("construction.subtitle")}</p>
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={60}>
              <div className="flex gap-3 rounded-xl px-5 py-4 border mb-6 bg-[#e4173f]/08 border-[#e4173f]/25">
                <AlertTriangle size={15} className="text-[#e4173f] shrink-0 mt-0.5" />
                <p className="text-[13px] text-white/70 leading-relaxed">{t("construction.note")}</p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={100}>
              <RuleTable rows={constructionRows} color={ACCENT} icon={Ruler} />
            </RevealOnScroll>
          </section>

          {/* ══ 3. ENGINEER CERT ═════════════════════════════════════════════ */}
          <section id="engineer">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#c49228] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#c49228] shrink-0" />{t("engineer.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-1">
                {t("engineer.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("engineer.subtitle")}</p>
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={60}>
              <InfoNote text={t("engineer.note")} />
            </RevealOnScroll>

            {/* Step-by-step process */}
            <div className="relative pl-0">
              {/* Vertical connector */}
              <div className="absolute left-[19px] top-6 bottom-6 w-px bg-white/[0.07] hidden md:block" />
              <div className="space-y-3">
                {engineerSteps.map((step, i) => (
                  <RevealOnScroll key={step.step} animation="left" delay={i * 70} threshold={0.04}>
                    <div className="flex gap-4 items-start">
                      {/* Step circle */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-heading text-[12px] font-extrabold shrink-0 border-2 z-10 relative"
                        style={{ background: "#0d0d1a", borderColor: ACCENT, color: ACCENT }}
                      >
                        {step.step}
                      </div>
                      <div className="flex-1 bg-[#141420] border border-white/[0.07] rounded-xl px-5 py-4 hover:border-[#c49228]/20 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 size={13} style={{ color: ACCENT }} />
                          <span className="font-heading text-[13px] font-bold text-white">{step.title}</span>
                        </div>
                        <p className="text-[13px] text-white/60 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          {/* ══ 4. ELECTRICAL ════════════════════════════════════════════════ */}
          <section id="electrical">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#c49228] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#c49228] shrink-0" />{t("electrical.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-1">
                {t("electrical.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("electrical.subtitle")}</p>
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={60}>
              <InfoNote text={t("electrical.note")} />
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={100}>
              <RuleTable rows={electricalRows} color={ACCENT} icon={Zap} />
            </RevealOnScroll>
          </section>

          {/* ══ 5. CONTRACTOR ════════════════════════════════════════════════ */}
          <section id="contractor">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#c49228] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#c49228] shrink-0" />{t("contractor.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-1">
                {t("contractor.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("contractor.subtitle")}</p>
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={60}>
              <InfoNote text={t("contractor.note")} />
            </RevealOnScroll>
            <RevealOnScroll animation="up" delay={100}>
              <RuleTable rows={contractorRows} color={ACCENT} icon={HardHat} />
            </RevealOnScroll>

            {/* Official contractor highlight */}
            <RevealOnScroll animation="up" delay={160}>
              <div className="mt-4 bg-[#141420] border border-[#c49228]/25 rounded-xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#c49228]/15 flex items-center justify-center shrink-0">
                  <ClipboardCheck size={20} style={{ color: ACCENT }} />
                </div>
                <div className="flex-1">
                  <div className="font-heading text-[13px] font-bold text-white mb-0.5">Blackdog Organizer — Official Stand Contractor</div>
                  <div className="text-[12px] text-white/50">For build quotes and contractor registration enquiries, contact the official contractor directly.</div>
                </div>
                <a
                  href="mailto:blackdog_tu@hotmail.com"
                  className="shrink-0 px-4 py-2 rounded-lg font-heading text-[11px] font-bold tracking-[0.07em] uppercase transition-all duration-150 border hover:-translate-y-0.5"
                  style={{ background: `${ACCENT}18`, color: ACCENT, borderColor: `${ACCENT}35` }}
                >
                  Contact
                </a>
              </div>
            </RevealOnScroll>
          </section>

        </div>
      </div>
    </div>
  );
}
