"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export function LoginForm({ locale }: { locale: string }) {
  const t = useTranslations("login");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [zone, setZone] = useState<"b2b" | "b2c">("b2c");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = `/${locale}/home`;
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#09090f] flex flex-col bg-grid">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(228,23,63,0.08) 0%, transparent 70%)" }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-14 relative z-10">
        <div className="w-full max-w-[420px]">
          {/* Logo */}
          <div className="flex items-center gap-3 justify-center mb-10">
            <div className="w-10 h-10 rounded-xl bg-[#e4173f] flex items-center justify-center glow-primary shrink-0">
              <svg width="20" height="20" viewBox="0 0 17 17" fill="none">
                <rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="white" />
                <rect x="10.5" y="1" width="5.5" height="5.5" rx="1" fill="white" />
                <rect x="1" y="10.5" width="5.5" height="5.5" rx="1" fill="white" />
                <path d="M13.25 10.5v6M10.5 13.25h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="font-heading text-[15px] font-extrabold tracking-wide text-white">GCAxTGS 2026</div>
              <div className="text-[10px] text-white/35 tracking-widest uppercase">Exhibitor Portal</div>
            </div>
          </div>

          <div className="bg-[#141420] border border-white/[0.09] rounded-2xl p-8 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            <h1 className="font-heading text-[26px] font-extrabold text-white mb-1">{t("title")}</h1>
            <p className="text-[13px] text-white/40 mb-6">{t("subtitle")}</p>

            {/* Zone selector */}
            <div className="flex gap-2 mb-6 p-1 bg-[#09090f] rounded-lg border border-white/[0.06]">
              {(["b2c", "b2b"] as const).map((z) => (
                <button
                  key={z}
                  onClick={() => setZone(z)}
                  className={`flex-1 py-2 rounded-md text-[11px] font-bold tracking-widest uppercase transition-all ${zone === z ? "bg-[#e4173f] text-white" : "text-white/35 hover:text-white/60"}`}
                >
                  {t(z === "b2c" ? "b2cZone" : "b2bZone")}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-white/45 uppercase mb-1.5">{t("email")}</label>
                <input
                  type="email"
                  required
                  placeholder="exhibitor@company.com"
                  className="w-full bg-[#09090f] border border-white/[0.1] rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#e4173f]/60 focus:ring-1 focus:ring-[#e4173f]/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-wider text-white/45 uppercase mb-1.5">{t("password")}</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#09090f] border border-white/[0.1] rounded-lg px-4 py-3 pr-11 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#e4173f]/60 focus:ring-1 focus:ring-[#e4173f]/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-[12px] text-[#e4173f]/70 hover:text-[#e4173f] transition-colors">
                  {t("forgotPassword")}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#e4173f] text-white font-heading text-[13px] font-bold tracking-[0.06em] uppercase rounded-lg hover:bg-[#b01030] disabled:opacity-60 disabled:cursor-not-allowed transition-all glow-primary mt-1"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {t("submit")}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="flex items-center justify-center gap-3 mt-7 flex-wrap">
            <div className="text-[11px] text-white/20">{t("poweredBy")} Koelnmesse × True Digital</div>
            <div className="flex items-center bg-white/[0.05] border border-white/[0.08] rounded-md overflow-hidden">
              <Link href="/en/login" className="px-2.5 py-1.5 text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors">EN</Link>
              <div className="w-px h-3.5 bg-white/[0.08]" />
              <Link href="/th/login" className="px-2.5 py-1.5 text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors">TH</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
