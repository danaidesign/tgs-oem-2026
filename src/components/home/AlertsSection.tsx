import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type AlertStatus = "urgent" | "upcoming" | "completed";

interface Alert {
  status: AlertStatus;
  name: string;
  sub: string;
  date: string;
  days?: number | null;
}

const ALERTS: Alert[] = [
  { status: "urgent",    name: "Booth Design Submission",    sub: "T2A · Submit floor plan & 3D render to organiser",   date: "Sep 15", days: 12 },
  { status: "urgent",    name: "Visa Application",           sub: "Form 21 · Required for international exhibitors",    date: "Sep 20", days: 17 },
  { status: "upcoming",  name: "Electrical & Lighting Order",sub: "T5 · Submit power requirements to QSNCC",            date: "Oct 1",  days: 28 },
  { status: "completed", name: "Exhibitor Profile (M1)",     sub: "Company profile submitted successfully",             date: "",       days: null },
];

const STATUS_COLOR: Record<AlertStatus, string> = {
  urgent:    "#e4173f",
  upcoming:  "#c49228",
  completed: "#22c55e",
};

export function AlertsSection() {
  const t = useTranslations("alerts");

  return (
    <section id="alerts" className="bg-[#0f0f1a] border-t border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-7 pb-0">
        <RevealOnScroll animation="up">
          <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2">
            <span className="line-grow w-5 h-0.5 bg-[#e4173f] inline-block" />
            {t("eyebrow")}
          </div>
          <h2 className="font-heading text-[26px] font-extrabold tracking-[-0.01em] text-white mb-5">{t("title")}</h2>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto">
        {ALERTS.map((alert, i) => {
          const color = STATUS_COLOR[alert.status];
          return (
            <RevealOnScroll key={i} animation="left" delay={i * 70} threshold={0.05}>
              <div
                className="grid items-center border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors cursor-pointer"
                style={{ gridTemplateColumns: "4px 1fr auto" }}
              >
                <div className="self-stretch" style={{ background: color }} />

                <div className="px-5 md:px-8 py-4 flex items-center gap-4 md:gap-6">
                  <span
                    className="font-heading text-[10px] font-bold tracking-[0.07em] uppercase w-16 shrink-0 hidden sm:block"
                    style={{ color }}
                  >
                    {t(alert.status)}
                  </span>
                  <div>
                    <div className="text-[14px] font-medium text-white">{alert.name}</div>
                    <div className="text-[12px] text-white/60 mt-0.5">{alert.sub}</div>
                  </div>
                </div>

                <div className="px-5 md:px-8 py-4 text-right shrink-0">
                  {alert.status === "completed" ? (
                    <div className="w-6 h-6 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/40 flex items-center justify-center ml-auto">
                      <Check size={10} className="text-[#22c55e]" />
                    </div>
                  ) : (
                    <>
                      <div className="font-heading text-[16px] font-bold leading-none" style={{ color }}>{alert.date}</div>
                      {alert.days != null && (
                        <div className="text-[11px] text-white/55 mt-1">in {alert.days} days</div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
      <div className="h-7" />
    </section>
  );
}
