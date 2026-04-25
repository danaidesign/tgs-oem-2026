"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { CountdownBar } from "./CountdownBar";

interface HeroProps {
  boothNumber?: string;
  boothType?: string;
  area?: string;
  hall?: string;
  badgeQuota?: number;
  exhibitorType?: string;
  alertCount?: number;
  exhibitorName?: string;
}

export function Hero({
  boothNumber = "B3–C4",
  boothType = "Production Booth · B2C Entertainment Zone",
  area = "120 sqm",
  hall = "Exhibition Hall 3",
  badgeQuota = 72,
  exhibitorType = "Main Exhibitor",
  alertCount = 3,
  exhibitorName = "Danai",
}: HeroProps) {
  const locale = useLocale();
  const t = useTranslations();
  const card = useTranslations("hero.boothCard");

  return (
    <section className="mt-[var(--nav-h)] bg-[#09090f] relative overflow-hidden min-h-[580px] flex flex-col">
      <div className="absolute inset-0 bg-grid opacity-100 z-0" />

      {/* Red diagonal */}
      <div
        className="absolute top-0 right-[-60px] bottom-0 hidden lg:block z-0"
        style={{
          width: "46%",
          background: "linear-gradient(135deg, #b01030 0%, #e4173f 60%, #ff2050 100%)",
          clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 bottom-0 hidden lg:block z-0 pointer-events-none"
        style={{
          width: "50%",
          background: "radial-gradient(ellipse at 70% 50%, rgba(228,23,63,0.15) 0%, transparent 70%)",
        }}
      />
      <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-[#09090f] via-[#0f0f1a] to-[#1a0810] z-0" />

      {/* Content */}
      <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 md:px-10 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT — staggered mount animations */}
        <div>
          <div className="hero-enter hero-enter-delay-1 flex items-center gap-2 mb-5 text-white/40 font-heading text-[11px] font-bold tracking-[0.12em] uppercase">
            <span className="w-6 h-[2px] bg-[#e4173f] shrink-0" />
            GCAxTGS 2026 · {t("hero.portal")}
          </div>

          <h1
            className="hero-enter hero-enter-delay-2 font-heading font-extrabold leading-[0.92] tracking-[-0.02em] text-white mb-5"
            style={{ fontSize: "clamp(44px, 7vw, 60px)" }}
          >
            <span className="block text-[0.43em] font-semibold text-white/45 italic mb-2 leading-tight">
              {t("hero.welcomeBack")}, {exhibitorName}
            </span>
            Gamescom Asia ×
            <span className="block text-[#e4173f] mt-1" style={{ textShadow: "0 0 40px rgba(228,23,63,0.4)" }}>
              Thailand Game Show
            </span>
          </h1>

          <p className="hero-enter hero-enter-delay-3 text-[15px] font-light text-white/65 leading-[1.7] max-w-[400px] mb-8">
            {t("hero.description")}
          </p>

          <div className="hero-enter hero-enter-delay-4 flex items-center gap-2.5 flex-wrap">
            <Link
              href={`/${locale}#schedule`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#e4173f] text-white font-heading text-[12px] font-bold tracking-[0.07em] uppercase rounded-lg hover:bg-[#b01030] transition-colors glow-primary"
            >
              <Calendar size={12} />
              {t("hero.viewSchedule")}
            </Link>
            <Link
              href={`/${locale}#alerts`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-white/20 text-white/65 font-heading text-[12px] font-bold tracking-[0.07em] uppercase rounded-lg hover:border-white/50 hover:text-white transition-all"
            >
              <AlertCircle size={12} />
              {alertCount} {t("hero.actionRequired")}
            </Link>
          </div>
        </div>

        {/* RIGHT — booth card with slight delay */}
        <div className="hero-enter flex lg:justify-end" style={{ animationDelay: "0.22s" }}>
          <div className="bg-white/[0.10] border border-white/[0.22] rounded-2xl p-7 w-full max-w-[320px] backdrop-blur-sm">
            <div className="text-[10px] font-bold tracking-[0.1em] text-white/70 uppercase mb-3">{card("yourBooth")}</div>
            <div className="font-heading text-[48px] font-extrabold text-white leading-none mb-1">
              {boothNumber.split("–")[0]}
              <span className="text-white/50 text-[0.6em]">–{boothNumber.split("–")[1]}</span>
            </div>
            <div className="text-[12px] text-white/80 mb-5">{boothType}</div>

            <div className="flex flex-col gap-1.5 mb-5">
              {[
                [card("area"), area],
                [card("hall"), hall],
                [card("badgeQuota"), `${badgeQuota} badges`],
                [card("exhibitorType"), exhibitorType],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center">
                  <span className="text-[11px] text-white/70">{k}</span>
                  <span className="text-[11px] font-medium text-white">{v}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/[0.20] mb-4" />
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#22c55e]/22 border border-[#4ade80]/50">
              <div className="relative shrink-0">
                <span className="block w-2 h-2 rounded-full bg-[#4ade80]" />
                <span className="absolute inset-0 rounded-full bg-[#4ade80] animate-ping opacity-60" />
              </div>
              <span className="text-[12px] font-bold text-[#86efac] tracking-wide flex-1">
                {card("boothConfirmed")}
              </span>
              <CheckCircle2 size={15} className="text-[#4ade80] shrink-0" />
            </div>
          </div>
        </div>
      </div>

      <CountdownBar />
    </section>
  );
}
