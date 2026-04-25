"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {
  ChevronRight, Phone, Mail, Copy, Check,
  AlertCircle, Building2, Users,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const SECTIONS = [
  { id: "emergency", labelKey: "sections.emergency" },
  { id: "key",       labelKey: "sections.key"       },
  { id: "venue",     labelKey: "sections.venue"     },
  { id: "organiser", labelKey: "sections.organiser" },
] as const;

const DEPT_COLOR: Record<string, { color: string; bg: string }> = {
  parin:     { color: "#e4173f", bg: "rgba(228,23,63,0.12)"  },
  wichittra: { color: "#c49228", bg: "rgba(196,146,42,0.12)" },
  suttipat:  { color: "#22c55e", bg: "rgba(34,197,94,0.12)"  },
};

// ─── Copy button ─────────────────────────────────────────────────────────────
function CopyBtn({ value, variant = "default" }: { value: string; variant?: "default" | "white" }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    if (copied) return;
    await navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value, copied]);

  // On red/dark solid backgrounds — circular icon button matching the call button
  if (variant === "white") {
    return (
      <button
        onClick={copy}
        title={copied ? "Copied!" : "Copy number"}
        style={{ cursor: "pointer" }}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 select-none active:scale-95 ${
          copied
            ? "bg-[#22c55e]/35 text-[#86efac]"
            : "bg-white/20 hover:bg-white/35 text-white"
        }`}
      >
        {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} />}
      </button>
    );
  }

  // Default — on dark card backgrounds
  return (
    <button
      onClick={copy}
      style={{ cursor: "pointer" }}
      className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded border transition-all duration-150 select-none ${
        copied
          ? "border-[#22c55e]/40 bg-[#22c55e]/12 text-[#22c55e]"
          : "border-[#e4173f]/20 bg-[#e4173f]/08 text-[#e4173f] hover:bg-[#e4173f]/18 hover:border-[#e4173f]/40 active:scale-95"
      }`}
    >
      {copied ? <Check size={8} strokeWidth={3} /> : <Copy size={8} />}
      <span>{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
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
              <a href={`#${id}`} className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${isActive ? "bg-[#e4173f]/10 text-[#e4173f] border border-[#e4173f]/20" : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"}`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-[#e4173f]" : "bg-white/20"}`} />
                {labels[i]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function ContactsListPage() {
  const t = useTranslations("contactsList");
  const locale = useLocale();
  const labels = SECTIONS.map((s) => t(s.labelKey));

  const keyContactKeys = ["parin", "wichittra", "suttipat"] as const;
  const venueKeys      = ["operations", "electrical", "security", "parking"] as const;
  const organiserKeys  = ["koelnmesse", "trueDigital", "blackdog"] as const;

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

          {/* ══ 1. EMERGENCY ════════════════════════════════════════════════ */}
          <section id="emergency">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-4">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />{t("emergency.eyebrow")}
              </div>
            </RevealOnScroll>

            <RevealOnScroll animation="up" delay={60}>
              <div className="bg-[#e4173f] rounded-xl overflow-hidden">
                {/* Top bar */}
                <div className="px-6 py-5 border-b border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-white animate-blink" />
                    <span className="font-heading text-[10px] font-bold tracking-[0.1em] text-white/75 uppercase">{t("emergency.eyebrow")}</span>
                  </div>
                  <div className="font-heading text-[22px] font-extrabold text-white leading-tight">{t("emergency.title")}</div>
                  <div className="text-[12px] text-white/80 mt-0.5">{t("emergency.desc")}</div>
                </div>
                {/* Numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
                  {(["security","medical","fire"] as const).map((k) => (
                    <div key={k} className="px-6 py-5 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] text-white/70 uppercase tracking-wider mb-1">{t(`emergency.${k}.label`)}</div>
                        <div className="font-heading text-[22px] font-bold text-white tracking-wide">{t(`emergency.${k}.number`)}</div>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={`tel:${t(`emergency.${k}.number`)}`}
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                          <Phone size={13} className="text-white" />
                        </a>
                        <CopyBtn value={t(`emergency.${k}.number`)} variant="white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </section>

          {/* ══ 2. KEY CONTACTS ═════════════════════════════════════════════ */}
          <section id="key">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />{t("key.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-1">{t("key.title")}</h2>
              <p className="text-[14px] text-white/45 mb-8">{t("key.subtitle")}</p>
            </RevealOnScroll>

            <div className="space-y-3">
              {keyContactKeys.map((key, i) => {
                const dc = DEPT_COLOR[key];
                return (
                  <RevealOnScroll key={key} animation="left" delay={i * 80} threshold={0.04}>
                    <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden hover:border-white/15 transition-colors">
                      {/* Top row */}
                      <div className="flex items-center gap-4 px-5 py-4 border-b border-white/[0.05]">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-heading text-[13px] font-bold shrink-0" style={{ background: dc.bg, color: dc.color }}>
                          {t(`key.contacts.${key}.initials`)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-heading text-[15px] font-bold text-white leading-tight">{t(`key.contacts.${key}.name`)}</div>
                          <div className="text-[11px] mt-0.5" style={{ color: dc.color }}>{t(`key.contacts.${key}.role`)} · <span className="text-white/45">{t(`key.contacts.${key}.org`)}</span></div>
                        </div>
                      </div>
                      {/* Contact rows */}
                      <div className="px-5 py-3 grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 divide-white/[0.04]">
                        {/* Phone */}
                        <div className="flex items-center justify-between py-2 sm:pr-4 sm:border-r border-white/[0.04]">
                          <div className="flex items-center gap-2 text-[11px] text-white/45">
                            <Phone size={11} />
                            <span>Phone</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-medium text-white/80">{t(`key.contacts.${key}.phone`)}</span>
                            <CopyBtn value={t(`key.contacts.${key}.phone`)} />
                          </div>
                        </div>
                        {/* Email */}
                        <div className="flex items-center justify-between py-2 sm:pl-4">
                          <div className="flex items-center gap-2 text-[11px] text-white/45">
                            <Mail size={11} />
                            <span>Email</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-medium text-white/80 truncate max-w-[160px]">{t(`key.contacts.${key}.email`)}</span>
                            <CopyBtn value={t(`key.contacts.${key}.email`)} />
                          </div>
                        </div>
                      </div>
                      {/* Topics */}
                      <div className="px-5 pb-3 flex items-start gap-2">
                        <AlertCircle size={11} className="text-white/25 mt-0.5 shrink-0" />
                        <span className="text-[11px] text-white/40 leading-relaxed">{t(`key.contacts.${key}.topics`)}</span>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </section>

          {/* ══ 3. VENUE SERVICES ═══════════════════════════════════════════ */}
          <section id="venue">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#00c4d4] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#00c4d4] shrink-0" />{t("venue.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-8">{t("venue.title")}</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {venueKeys.map((key, i) => (
                <RevealOnScroll key={key} animation="scale" delay={i * 60} threshold={0.05}>
                  <div className="bg-[#141420] border border-white/[0.07] rounded-xl px-5 py-4 hover:border-[#00c4d4]/25 hover:-translate-y-0.5 transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#00c4d4]/12 flex items-center justify-center">
                        <Building2 size={13} className="text-[#00c4d4]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-mono font-bold text-white/80">{t(`venue.items.${key}.phone`)}</span>
                        <CopyBtn value={t(`venue.items.${key}.phone`)} />
                      </div>
                    </div>
                    <div className="font-heading text-[13px] font-bold text-white mb-0.5">{t(`venue.items.${key}.label`)}</div>
                    <div className="text-[11px] text-white/45 leading-relaxed">{t(`venue.items.${key}.desc`)}</div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* ══ 4. ORGANISER ════════════════════════════════════════════════ */}
          <section id="organiser">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
                <span className="w-5 h-[2px] bg-[#e4173f] shrink-0" />{t("organiser.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold text-white leading-none mb-8">{t("organiser.title")}</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {organiserKeys.map((key, i) => (
                <RevealOnScroll key={key} animation="up" delay={i * 80} threshold={0.05}>
                  <div className="bg-[#141420] border border-white/[0.07] rounded-xl p-5 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#e4173f]/10 flex items-center justify-center">
                      <Users size={15} className="text-[#e4173f]" />
                    </div>
                    <div>
                      <div className="font-heading text-[13px] font-bold text-white mb-1">{t(`organiser.items.${key}.label`)}</div>
                      <div className="text-[11px] text-white/45 leading-relaxed mb-3">{t(`organiser.items.${key}.desc`)}</div>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1.5 text-[11px] text-white/50 truncate">
                        <Mail size={10} className="shrink-0" />
                        <span className="truncate">{t(`organiser.items.${key}.email`)}</span>
                      </div>
                      <CopyBtn value={t(`organiser.items.${key}.email`)} />
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
