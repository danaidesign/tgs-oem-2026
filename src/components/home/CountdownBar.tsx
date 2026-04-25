"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const SHOW_DATE = new Date("2026-10-17T10:00:00+07:00");

export function CountdownBar({ boothSqm = 120 }: { boothSqm?: number }) {
  const t = useTranslations("countdown");
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const diff = SHOW_DATE.getTime() - Date.now();
      setDays(diff > 0 ? Math.floor(diff / 86400000) : 0);
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { value: days !== null ? String(days) : "--", label: t("daysToShow") },
    { value: "Oct 17", label: t("opens") },
    { value: "3", label: t("showDays") },
    { value: "10:00", label: t("dailyOpen") },
    { value: String(boothSqm), label: t("sqmBooth") },
  ];

  return (
    <div className="bg-[#e4173f] relative z-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-10 flex items-stretch">
        {blocks.map((b, i) => (
          <div
            key={i}
            className={`flex-1 min-w-0 py-3 sm:py-4 flex flex-col items-center justify-center gap-0.5 ${i < blocks.length - 1 ? "border-r border-white/15" : ""}`}
          >
            <span className="font-heading text-[18px] sm:text-[26px] md:text-[32px] font-extrabold text-white leading-none tabular-nums">{b.value}</span>
            <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.05em] sm:tracking-[0.08em] text-white/55 uppercase text-center leading-tight">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
