"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight, AlertTriangle, Volume2,
  ShieldAlert, HardHat, Users, BookOpen,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const SECTIONS = [
  { id: "general",    labelKey: "sections.general",    icon: BookOpen,     color: "#e4173f" },
  { id: "booth",      labelKey: "sections.booth",      icon: Users,        color: "#00c4d4" },
  { id: "sound",      labelKey: "sections.sound",      icon: Volume2,      color: "#a78bfa" },
  { id: "safety",     labelKey: "sections.safety",     icon: ShieldAlert,  color: "#22c55e" },
  { id: "contractor", labelKey: "sections.contractor", icon: HardHat,      color: "#c49228" },
] as const;

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
        {SECTIONS.map(({ id, color }, i) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
                  isActive ? "border" : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                }`}
                style={isActive ? { color, background: `${color}12`, borderColor: `${color}30` } : {}}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: isActive ? color : "rgba(255,255,255,0.2)" }} />
                {labels[i]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function RuleSection({
  id, color, icon: Icon, eyebrow, title, subtitle, note,
  rows,
}: {
  id: string; color: string; icon: React.ElementType;
  eyebrow: string; title: string; subtitle?: string; note?: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <section id={id}>
      <RevealOnScroll animation="up">
        <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color }}>
          <span className="w-5 h-[2px] shrink-0" style={{ background: color }} />
          {eyebrow}
        </div>
        <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-1">{title}</h2>
        {subtitle && <p className="text-[14px] text-white/45 mb-6">{subtitle}</p>}
      </RevealOnScroll>

      {note && (
        <RevealOnScroll animation="up" delay={60}>
          <div className="flex gap-3 rounded-xl px-5 py-4 border mb-6" style={{ background: `${color}0d`, borderColor: `${color}30` }}>
            <AlertTriangle size={15} className="shrink-0 mt-0.5" style={{ color }} />
            <p className="text-[13px] text-white/70 leading-relaxed">{note}</p>
          </div>
        </RevealOnScroll>
      )}

      <RevealOnScroll animation="up" delay={note ? 100 : 80}>
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
      </RevealOnScroll>
    </section>
  );
}

export function RulesPage() {
  const t = useTranslations("rules");
  const locale = useLocale();
  const labels = SECTIONS.map((s) => t(s.labelKey));

  const generalRows   = (["badge","access","conduct","smoking","food","media","children"] as const).map((k) => ({ label: t(`general.items.${k}.label`),    value: t(`general.items.${k}.value`) }));
  const boothRows     = (["boundaries","signage","projection","demos","giveaways","subletting"] as const).map((k) => ({ label: t(`booth.items.${k}.label`),      value: t(`booth.items.${k}.value`) }));
  const soundRows     = (["level","nonSound","music","screens","overtime"] as const).map((k) => ({ label: t(`sound.items.${k}.label`),      value: t(`sound.items.${k}.value`) }));
  const safetyRows    = (["emergency","fire","electrical","flooring","weight","firstaid"] as const).map((k) => ({ label: t(`safety.items.${k}.label`),     value: t(`safety.items.${k}.value`) }));
  const contractorRows= (["registration","insurance","hours","conduct","damage","inspection"] as const).map((k) => ({ label: t(`contractor.items.${k}.label`), value: t(`contractor.items.${k}.value`) }));

  return (
    <div className="min-h-screen bg-[#09090f] text-white">

      {/* Header */}
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
            <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />{t("breadcrumb")}
          </div>
          <h1 className="font-heading font-extrabold tracking-[-0.02em] text-white leading-none mb-2" style={{ fontSize: "clamp(32px,5vw,52px)" }}>
            {t("title")}
          </h1>
          <p className="text-[15px] text-white/55 mt-2">{t("subtitle")}</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex gap-12 items-start">
        <SidebarNav labels={labels} />

        <div className="flex-1 min-w-0 space-y-20">
          <RuleSection id="general"    color="#e4173f" icon={BookOpen}    eyebrow={t("general.eyebrow")}    title={t("general.title")}    subtitle={t("general.subtitle")}    rows={generalRows} />
          <RuleSection id="booth"      color="#00c4d4" icon={Users}       eyebrow={t("booth.eyebrow")}      title={t("booth.title")}      subtitle={t("booth.subtitle")}      rows={boothRows} />
          <RuleSection id="sound"      color="#a78bfa" icon={Volume2}     eyebrow={t("sound.eyebrow")}      title={t("sound.title")}      subtitle={t("sound.subtitle")}      note={t("sound.note")} rows={soundRows} />
          <RuleSection id="safety"     color="#22c55e" icon={ShieldAlert} eyebrow={t("safety.eyebrow")}     title={t("safety.title")}     subtitle={t("safety.subtitle")}     rows={safetyRows} />
          <RuleSection id="contractor" color="#c49228" icon={HardHat}     eyebrow={t("contractor.eyebrow")} title={t("contractor.title")} subtitle={t("contractor.subtitle")} rows={contractorRows} />
        </div>
      </div>
    </div>
  );
}
