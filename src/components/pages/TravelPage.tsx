"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Plane,
  Train,
  Car,
  Hotel,
  Lightbulb,
  ExternalLink,
  Star,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const ACCENT = "#22c55e";

// ─── Sections ────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "transport", labelKey: "sections.transport" },
  { id: "to-venue",  labelKey: "sections.toVenue"  },
  { id: "hotels",    labelKey: "sections.hotels"   },
  { id: "tips",      labelKey: "sections.tips"     },
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
                    ? "text-[#22c55e] border border-[#22c55e]/20"
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

// ─── Star rating ─────────────────────────────────────────────────────────────
function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={10}
          fill={i < stars ? "#c49228" : "none"}
          stroke={i < stars ? "#c49228" : "rgba(255,255,255,0.2)"}
        />
      ))}
    </div>
  );
}

// ─── Transport card ───────────────────────────────────────────────────────────
function TransportCard({
  icon: Icon,
  title,
  children,
  color,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  color: string;
  delay?: number;
}) {
  return (
    <RevealOnScroll animation="left" delay={delay ?? 0} threshold={0.04}>
      <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden hover:border-white/15 transition-colors">
        <div
          className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.05]"
          style={{ background: `${color}12` }}
        >
          <Icon size={14} style={{ color }} />
          <span className="font-heading text-[13px] font-bold text-white">{title}</span>
        </div>
        <div className="px-5 py-4 text-[13px] text-white/70 leading-relaxed space-y-2">
          {children}
        </div>
      </div>
    </RevealOnScroll>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function TravelPage() {
  const t = useTranslations("travel");
  const locale = useLocale();

  const sectionLabels = SECTIONS.map((s) => t(s.labelKey));

  const hotelKeys = ["novotel", "marriottQP", "jwMarriott", "grande", "sukhumvit"] as const;
  const tipKeys   = ["transit", "grab", "weather", "currency", "tipping", "convenience"] as const;

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
              1. GETTING TO BANGKOK
          ════════════════════════════════════════════════════════════════ */}
          <section id="transport">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("transport.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("transport.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-8">{t("transport.subtitle")}</p>
            </RevealOnScroll>

            <div className="space-y-4">
              <TransportCard icon={Plane} title={t("transport.bkk.title")} color={ACCENT} delay={0}>
                <p><span className="text-[#a78bfa] font-semibold">Rail Link:</span> {t("transport.bkk.rail")}</p>
                <p><span className="text-[#c49228] font-semibold">Taxi:</span> {t("transport.bkk.taxi")}</p>
              </TransportCard>

              <TransportCard icon={Plane} title={t("transport.dmk.title")} color={ACCENT} delay={60}>
                <p>{t("transport.dmk.taxi")}</p>
              </TransportCard>

              {/* Grab tip */}
              <RevealOnScroll animation="up" delay={120} threshold={0.04}>
                <div
                  className="flex gap-3 rounded-xl border px-5 py-4"
                  style={{ background: `${ACCENT}0d`, borderColor: `${ACCENT}30` }}
                >
                  <Car size={14} style={{ color: ACCENT }} className="shrink-0 mt-0.5" />
                  <p className="text-[13px] text-white/70 leading-relaxed">{t("transport.grab")}</p>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              2. GETTING TO QSNCC
          ════════════════════════════════════════════════════════════════ */}
          <section id="to-venue">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("toVenue.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("toVenue.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-8">{t("toVenue.subtitle")}</p>
            </RevealOnScroll>

            <div className="space-y-4">
              <TransportCard icon={Train} title={t("toVenue.mrt.title")} color={ACCENT} delay={0}>
                <p>{t("toVenue.mrt.value")}</p>
              </TransportCard>
              <TransportCard icon={Train} title={t("toVenue.bts.title")} color={ACCENT} delay={60}>
                <p>{t("toVenue.bts.value")}</p>
              </TransportCard>
              <TransportCard icon={Car} title={t("toVenue.taxi.title")} color={ACCENT} delay={120}>
                <p>{t("toVenue.taxi.value")}</p>
              </TransportCard>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              3. RECOMMENDED HOTELS
          ════════════════════════════════════════════════════════════════ */}
          <section id="hotels">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("hotels.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("hotels.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-8">{t("hotels.subtitle")}</p>
            </RevealOnScroll>

            <div className="space-y-3">
              {hotelKeys.map((key, i) => {
                const name     = t(`hotels.items.${key}.name`);
                const stars    = Number(t(`hotels.items.${key}.stars`));
                const distance = t(`hotels.items.${key}.distance`);
                const desc     = t(`hotels.items.${key}.desc`);
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(name + " Bangkok hotel")}`;

                return (
                  <RevealOnScroll key={key} animation="left" delay={i * 70} threshold={0.04}>
                    <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200">
                      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/[0.05]">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `${ACCENT}18`, color: ACCENT }}
                          >
                            <Hotel size={15} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-heading text-[14px] font-bold text-white leading-tight truncate">{name}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <StarRating stars={stars} />
                              <span className="text-[10px] text-white/35">{stars}-star</span>
                            </div>
                          </div>
                        </div>
                        <a
                          href={searchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition-all duration-150 shrink-0 border-[#22c55e]/25 bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20 hover:border-[#22c55e]/40"
                        >
                          <ExternalLink size={10} />
                          <span>{t("hotels.bookBtn")}</span>
                        </a>
                      </div>
                      <div className="px-5 py-3 flex items-center gap-6">
                        <div className="flex items-center gap-1.5 text-[11px] text-white/45">
                          <Car size={10} className="shrink-0" />
                          <span>{distance}</span>
                        </div>
                        <div className="text-[11px] text-white/40 leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              4. TRAVEL TIPS
          ════════════════════════════════════════════════════════════════ */}
          <section id="tips">
            <RevealOnScroll animation="up">
              <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: ACCENT }}>
                <span className="w-5 h-[2px] shrink-0" style={{ background: ACCENT }} />
                {t("tips.eyebrow")}
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1">
                {t("tips.title")}
              </h2>
              <p className="text-[14px] text-white/45 mb-6">{t("tips.subtitle")}</p>
            </RevealOnScroll>

            <RevealOnScroll animation="up" delay={60}>
              <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden">
                {tipKeys.map((key, i) => (
                  <div key={key} className={`flex gap-4 px-5 py-4 ${i < tipKeys.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${ACCENT}18`, color: ACCENT }}
                    >
                      <Lightbulb size={13} />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white/45 uppercase tracking-wider mb-0.5">
                        {t(`tips.items.${key}.label`)}
                      </div>
                      <div className="text-[13px] text-white/80 leading-relaxed">
                        {t(`tips.items.${key}.value`)}
                      </div>
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
