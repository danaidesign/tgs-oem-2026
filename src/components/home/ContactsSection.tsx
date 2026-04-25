"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Phone, Mail, Copy, Check } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface Contact {
  initials: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  color: string;
  bg: string;
}

const CONTACTS: Contact[] = [
  {
    initials: "PW", name: "Parin Wilaijit", role: "Facilitator · True Digital Group",
    phone: "081-615-6965", email: "parin.wil@truedigital.com",
    color: "#e4173f", bg: "rgba(228,23,63,0.12)",
  },
  {
    initials: "WP", name: "Wichittra Phadungsri", role: "Official Contractor · Blackdog Organizer",
    phone: "089-691-0413", email: "blackdog_tu@hotmail.com",
    color: "#c49228", bg: "rgba(196,146,42,0.12)",
  },
  {
    initials: "SN", name: "Suttipat Neamkhuntod", role: "Event Services · QSNCC",
    phone: "02-229-3044", email: "suttipat.nea@qsncc.com",
    color: "#22c55e", bg: "rgba(34,197,94,0.12)",
  },
];

function CopyButton({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleCopy = useCallback(async () => {
    if (status !== "idle") return;
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2000);
  }, [value, status]);

  const isCopied = status === "copied";

  return (
    <button
      onClick={handleCopy}
      aria-label={`Copy ${value}`}
      className={`
        relative flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded border
        transition-all duration-200 overflow-hidden select-none
        ${isCopied
          ? "border-[#22c55e]/40 bg-[#22c55e]/12 text-[#22c55e]"
          : status === "error"
            ? "border-[#e4173f]/40 bg-[#e4173f]/12 text-[#e4173f]"
            : "border-[#e4173f]/20 bg-[#e4173f]/08 text-[#e4173f] hover:bg-[#e4173f]/18 hover:border-[#e4173f]/40 active:scale-95"
        }
      `}
    >
      {isCopied && (
        <span
          className="absolute inset-0 rounded animate-ping-once"
          style={{ background: "rgba(34,197,94,0.2)" }}
        />
      )}
      <span className={`flex items-center gap-1 transition-all duration-150 ${isCopied ? "scale-105" : ""}`}>
        {isCopied ? <Check size={8} strokeWidth={3} /> : <Copy size={8} />}
        <span
          className="inline-block overflow-hidden transition-all duration-200"
          style={{ width: isCopied ? "36px" : "22px" }}
        >
          {isCopied ? "Copied!" : label}
        </span>
      </span>
    </button>
  );
}

export function ContactsSection() {
  const t = useTranslations("contacts");

  return (
    <>
      <style>{`
        @keyframes ping-once {
          0%   { opacity: 0.8; transform: scale(1); }
          80%  { opacity: 0;   transform: scale(1.6); }
          100% { opacity: 0;   transform: scale(1.6); }
        }
        .animate-ping-once { animation: ping-once 0.45s ease-out forwards; }
      `}</style>

      <section id="contacts" className="bg-[#0f0f1a] border-t border-white/[0.07] px-6 md:px-10 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll animation="up">
            <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
              <span className="line-grow w-5 h-0.5 bg-[#e4173f] inline-block" />
              {t("eyebrow")}
            </div>
            <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-1.5">{t("title")}</h2>
            <p className="text-[15px] text-white/40 mb-7 font-thai">{t("subtitle")}</p>
          </RevealOnScroll>

          {/* Emergency banner */}
          <RevealOnScroll animation="up" delay={80}>
            <div className="bg-[#e4173f] rounded-xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-7">
              <div>
                <div className="flex items-center gap-1.5 font-heading text-[10px] font-bold tracking-[0.1em] text-white/75 uppercase mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-blink" />
                  {t("emergency.label")}
                </div>
                <div className="font-heading text-[20px] font-extrabold text-white leading-tight">{t("emergency.title")}</div>
                <div className="text-[12px] text-white/85 mt-0.5">{t("emergency.desc")}</div>
              </div>
              <div className="flex gap-6 sm:gap-10">
                {[
                  { label: t("emergency.security"), val: "02-229-3000" },
                  { label: t("emergency.medical"),  val: "02-229-3001" },
                ].map((e) => (
                  <div key={e.label}>
                    <div className="text-[10px] text-white/75 mb-0.5">{e.label}</div>
                    <div className="font-heading text-[18px] font-bold text-white">{e.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CONTACTS.map((c, i) => (
              <RevealOnScroll key={c.name} animation="up" delay={i * 80} threshold={0.06}>
                <div className="bg-[#141420] border border-white/[0.07] rounded-xl overflow-hidden hover:border-white/15 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-200 h-full">
                  <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-heading text-[12px] font-bold"
                      style={{ background: c.bg, color: c.color }}
                    >
                      {c.initials}
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-white/90 leading-tight">{c.name}</div>
                      <div className="text-[11px] text-white/55 mt-0.5">{c.role}</div>
                    </div>
                  </div>
                  <div className="px-5 py-3">
                    {[
                      { icon: <Phone size={11} />, label: t("phone"), val: c.phone },
                      { icon: <Mail size={11} />, label: t("email"), val: c.email },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                        <div className="flex items-center gap-2 text-[11px] text-white/55">
                          {row.icon}
                          {row.label}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-medium text-white/80">{row.val}</span>
                          <CopyButton value={row.val} label={t("copy")} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
