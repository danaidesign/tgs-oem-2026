import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface TimelineItem {
  dateKey: string;
  dayKey: string;
  titleKey: string;
  detailKey: string;
  tags: string[];
  dotColor: "red" | "gold" | "gray";
}

const ITEMS: TimelineItem[] = [
  { dateKey: "schedule.items.setup.date", dayKey: "schedule.items.setup.day", titleKey: "schedule.items.setup.title", detailKey: "schedule.items.setup.detail", tags: ["setup"], dotColor: "gold" },
  { dateKey: "schedule.items.day1.date",  dayKey: "schedule.items.day1.day",  titleKey: "schedule.items.day1.title",  detailKey: "schedule.items.day1.detail",  tags: ["show"],          dotColor: "red" },
  { dateKey: "schedule.items.day2.date",  dayKey: "schedule.items.day2.day",  titleKey: "schedule.items.day2.title",  detailKey: "schedule.items.day2.detail",  tags: ["show"],          dotColor: "red" },
  { dateKey: "schedule.items.day3.date",  dayKey: "schedule.items.day3.day",  titleKey: "schedule.items.day3.title",  detailKey: "schedule.items.day3.detail",  tags: ["show","teardown"],dotColor: "red" },
];

const DOT_COLOR  = { red: "#e4173f", gold: "#c49228", gray: "#555" };
const DOT_GLOW   = { red: "rgba(228,23,63,0.22)", gold: "rgba(196,146,42,0.22)", gray: "transparent" };
const TAG_STYLE: Record<string, { bg: string; color: string }> = {
  setup:    { bg: "rgba(0,196,212,0.12)",   color: "#00c4d4" },
  show:     { bg: "rgba(228,23,63,0.12)",   color: "#e4173f" },
  teardown: { bg: "rgba(196,146,42,0.12)", color: "#c49228" },
};

export function EventTimeline() {
  const t = useTranslations();

  return (
    <section id="schedule" className="bg-[#0f0f1a] border-t border-white/[0.07] px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll animation="up">
          <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
            <span className="line-grow w-5 h-0.5 bg-[#e4173f] inline-block" />
            {t("schedule.eyebrow")}
          </div>
          <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.01em] text-white leading-none mb-2">{t("schedule.title")}</h2>
          <p className="text-[15px] text-white/60 max-w-[560px] leading-relaxed mb-12">
            {t("schedule.subtitle")}
            <span className="block mt-0.5 text-[13px] text-white/45 font-thai">{t("schedule.subtitleTh")}</span>
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          {/* Timeline items */}
          <div className="flex flex-col">
            {ITEMS.map((item, i) => (
              <RevealOnScroll key={i} animation="left" delay={i * 80} threshold={0.08}>
                {/* Mobile: flex-col stacked | md+: 3-col grid */}
                <div className="pb-8 last:pb-0 flex flex-col gap-1 sm:grid sm:gap-x-5"
                  style={{ gridTemplateColumns: "80px 1px 1fr" }}>

                  {/* Date — full row on mobile, left col on sm+ */}
                  <div className="flex items-center gap-2 sm:block sm:text-right sm:pt-0.5">
                    <div
                      className="w-2 h-2 rounded-full shrink-0 sm:hidden"
                      style={{
                        background: DOT_COLOR[item.dotColor],
                        boxShadow: `0 0 0 3px ${DOT_GLOW[item.dotColor]}`,
                      }}
                    />
                    <div className="font-heading text-[12px] font-semibold text-white/70 leading-tight">{t(item.dateKey)}</div>
                    <div className="text-[11px] text-white/45 sm:mt-0.5">{t(item.dayKey)}</div>
                  </div>

                  {/* Spine — hidden on mobile */}
                  <div className="hidden sm:block relative bg-white/[0.08]">
                    <div
                      className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-[#0f0f1a]"
                      style={{
                        background: DOT_COLOR[item.dotColor],
                        boxShadow: `0 0 0 4px ${DOT_GLOW[item.dotColor]}`,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="pl-4 sm:pl-0 border-l border-white/[0.06] sm:border-0">
                    <div className="text-[14px] font-medium text-white/90 leading-tight mb-1">{t(item.titleKey)}</div>
                    <div className="text-[12px] text-white/60 leading-relaxed mb-2">{t(item.detailKey)}</div>
                    <div className="flex gap-1.5 flex-wrap">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold tracking-[0.04em] px-2 py-0.5 rounded-full uppercase"
                          style={{ background: TAG_STYLE[tag].bg, color: TAG_STYLE[tag].color }}
                        >
                          {t(`schedule.tags.${tag}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Side notice — slides in from right */}
          <RevealOnScroll animation="right" delay={120} threshold={0.08}>
            <div className="sticky top-[calc(var(--nav-h)+20px)]">
              <div className="bg-[#e4173f] rounded-xl p-6">
                <div className="flex items-center gap-1.5 font-heading text-[10px] font-bold tracking-[0.1em] text-white/75 uppercase mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-blink" />
                  {t("schedule.notice.label")}
                </div>
                <div className="font-heading text-[20px] font-extrabold text-white leading-tight mb-2">{t("schedule.notice.title")}</div>
                <div className="text-[13px] text-white/85 leading-relaxed mb-4">{t("schedule.notice.desc")}</div>

                {[
                  ["Date",         t("schedule.notice.date")],
                  ["Duration",     t("schedule.notice.duration")],
                  ["Lighting",     t("schedule.notice.lighting")],
                  ["Overtime rate",t("schedule.notice.overtime")],
                ].map(([label, val]) => (
                  <div key={label} className="bg-white/15 rounded-lg px-3.5 py-2.5 mb-2 last:mb-0">
                    <div className="text-[10px] font-bold tracking-[0.06em] text-white/75 uppercase mb-1">{label}</div>
                    <div className="text-[13px] font-medium text-white">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
