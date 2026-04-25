import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  Info, Calendar, MapPin, FileText, Box,
  Grid3x3, Truck, Plane, Stamp
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface InfoCard {
  titleKey: string;
  subKey: string;
  descKey: string;
  href: string;
  icon: React.ReactNode;
}

const CARDS: InfoCard[] = [
  { titleKey: "navItems.generalInfo",         subKey: "navItems.generalInfoTh",         descKey: "infoGrid.cards.generalInfo.desc",  href: "/getting-started/general-info",       icon: <Info size={18} /> },
  { titleKey: "navItems.exhibitionSchedule",  subKey: "navItems.exhibitionScheduleTh",  descKey: "infoGrid.cards.schedule.desc",     href: "/schedule-venue/exhibition-schedule", icon: <Calendar size={18} /> },
  { titleKey: "navItems.venueInfo",           subKey: "navItems.venueInfoTh",           descKey: "infoGrid.cards.venue.desc",        href: "/schedule-venue/venue",               icon: <MapPin size={18} /> },
  { titleKey: "navItems.rules",               subKey: "navItems.rulesTh",               descKey: "infoGrid.cards.rules.desc",        href: "/getting-started/rules",              icon: <FileText size={18} /> },
  { titleKey: "navItems.rawSpace",            subKey: "navItems.rawSpaceTh",            descKey: "infoGrid.cards.rawSpace.desc",     href: "/booth-setup/raw-space",              icon: <Box size={18} /> },
  { titleKey: "navItems.shellScheme",         subKey: "navItems.shellSchemeTh",         descKey: "infoGrid.cards.shellScheme.desc",  href: "/booth-setup/shell-scheme",           icon: <Grid3x3 size={18} /> },
  { titleKey: "navItems.freight",             subKey: "navItems.freightTh",             descKey: "infoGrid.cards.freight.desc",      href: "/logistics/freight",                  icon: <Truck size={18} /> },
  { titleKey: "navItems.travel",              subKey: "navItems.travelTh",              descKey: "infoGrid.cards.travel.desc",       href: "/schedule-venue/travel",              icon: <Plane size={18} /> },
  { titleKey: "navItems.visa",                subKey: "navItems.visaTh",                descKey: "infoGrid.cards.visa.desc",         href: "/admin/visa",                         icon: <Stamp size={18} /> },
];

export function InfoGrid() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <section className="bg-[#09090f] px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll animation="up">
          <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
            <span className="line-grow w-5 h-0.5 bg-[#e4173f] inline-block" />
            {t("infoGrid.eyebrow")}
          </div>
          <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-2">{t("infoGrid.title")}</h2>
          <p className="text-[15px] text-white/60 max-w-[520px] leading-relaxed mb-10">
            {t("infoGrid.subtitle")}
            <span className="block mt-0.5 text-[13px] text-white/45 font-thai">{t("infoGrid.subtitleTh")}</span>
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((card, i) => (
            <RevealOnScroll
              key={card.href}
              animation="scale"
              delay={i * 55}
              threshold={0.05}
            >
              <Link
                href={`/${locale}${card.href}`}
                className="group relative bg-[#141420] border border-white/[0.07] rounded-xl p-6 hover:border-[#e4173f]/30 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-200 overflow-hidden block h-full"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#e4173f] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-250" />

                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4 text-white/55 group-hover:bg-[#e4173f]/15 group-hover:text-[#e4173f] transition-all duration-200">
                  {card.icon}
                </div>
                <div className="text-[15px] font-medium text-white/90 mb-0.5">{t(card.titleKey)}</div>
                <div className="text-[12px] text-white/50 mb-3 font-thai">{t(card.subKey)}</div>
                <div className="text-[13px] text-white/60 leading-relaxed">{t(card.descKey)}</div>
                <span className="mt-4 text-[12px] text-white/40 group-hover:text-[#e4173f] transition-colors block">
                  {t("infoGrid.viewPage")}
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
