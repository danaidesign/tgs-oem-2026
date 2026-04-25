import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import tgsLogo from "@/assets/images/tgs-logo.png";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");

  const links = [
    { key: "generalInfo", href: "/getting-started/general-info" },
    { key: "schedule", href: "/schedule-venue/exhibition-schedule" },
    { key: "contacts", href: "/getting-started/contacts" },
    { key: "venue", href: "/schedule-venue/venue" },
    { key: "rules", href: "/getting-started/rules" },
  ];

  return (
    <footer className="bg-[#0f0f1a] border-t border-white/[0.07] px-10 py-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-wrap">
        <Image src={tgsLogo} alt="GCAxTGS 2026" width={158} height={24} className="h-6 w-auto" />

        <div className="flex gap-5 flex-wrap">
          {links.map((link) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              className="text-[12px] text-white/30 hover:text-white/70 transition-colors"
            >
              {t(`links.${link.key}`)}
            </Link>
          ))}
        </div>

        <div className="text-[11px] text-white/20">{t("rights")}</div>
      </div>
    </footer>
  );
}
