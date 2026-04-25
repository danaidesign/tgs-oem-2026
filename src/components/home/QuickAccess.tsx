import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  Info, Calendar, MapPin, FileText, Box,
  Grid3x3, Truck, Stamp
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const ITEMS = [
  { titleKey: "navItems.generalInfo",        subKey: "navItems.generalInfoTh",        href: "/getting-started/general-info",       icon: Info },
  { titleKey: "navItems.exhibitionSchedule", subKey: "navItems.exhibitionScheduleTh", href: "/schedule-venue/exhibition-schedule", icon: Calendar },
  { titleKey: "navItems.venueInfo",          subKey: "navItems.venueInfoTh",          href: "/schedule-venue/venue",               icon: MapPin },
  { titleKey: "navItems.rules",              subKey: "navItems.rulesTh",              href: "/getting-started/rules",              icon: FileText },
  { titleKey: "navItems.rawSpace",           subKey: "navItems.rawSpaceTh",           href: "/booth-setup/raw-space",              icon: Box },
  { titleKey: "navItems.shellScheme",        subKey: "navItems.shellSchemeTh",        href: "/booth-setup/shell-scheme",           icon: Grid3x3 },
  { titleKey: "navItems.freight",            subKey: "navItems.freightTh",            href: "/logistics/freight",                  icon: Truck },
  { titleKey: "navItems.visa",               subKey: "navItems.visaTh",               href: "/admin/visa",                         icon: Stamp },
];

export function QuickAccess() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <section className="bg-[#09090f] border-t border-white/[0.07] px-6 md:px-10 py-14 md:py-16">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll animation="up">
          <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-white/30 uppercase mb-2.5">
            <span className="line-grow w-5 h-0.5 bg-[#e4173f] inline-block" />
            {t("quickAccess.eyebrow")}
          </div>
          <h2 className="font-heading text-[36px] font-extrabold text-white leading-none tracking-[-0.01em] mb-9">{t("quickAccess.title")}</h2>
        </RevealOnScroll>

        <div
          className="grid grid-cols-2 md:grid-cols-4 border border-white/[0.07] rounded-xl overflow-hidden"
          style={{ gap: "1px", background: "rgba(255,255,255,0.05)" }}
        >
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={item.href} animation="scale" delay={i * 45} threshold={0.05}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="group relative bg-[#141420] p-5 md:p-6 hover:bg-[#e4173f] transition-colors duration-150 block h-full"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-white/15 transition-colors duration-150">
                    <Icon size={16} className="text-white/45 group-hover:text-white transition-colors duration-150" />
                  </div>
                  <div className="text-[13px] font-medium text-white/75 group-hover:text-white leading-tight mb-0.5 transition-colors duration-150">{t(item.titleKey)}</div>
                  <div className="text-[11px] text-white/30 group-hover:text-white/65 font-thai transition-colors duration-150">{t(item.subKey)}</div>
                  <span className="absolute bottom-5 right-5 text-[15px] text-white/15 group-hover:text-white/75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150">↗</span>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
