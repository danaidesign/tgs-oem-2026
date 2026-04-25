import Link from "next/link";
import { useLocale } from "next-intl";
import { UserCircle, BadgeCheck, Share2, Image, Video, Zap, Star, Hammer, Ruler, Plug, Truck, Volume2, Shield, UtensilsCrossed, Check, Clock } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type FormStatus = "completed" | "in-progress" | "pending";

interface FormItem {
  code: string;
  title: string;
  titleTh: string;
  href: string;
  type: "marketing" | "technical";
  icon: React.ReactNode;
  required?: boolean;
  badge?: string;
  status?: FormStatus;
}

const FORMS: FormItem[] = [
  // Marketing
  { code: "M1",  title: "Exhibitor Profile",          titleTh: "โปรไฟล์ผู้จัดแสดง",      href: "/forms/m1-profile",    type: "marketing", icon: <UserCircle size={15}/>,     required: true,  status: "completed" },
  { code: "M2",  title: "Exhibitor Badge Submission", titleTh: "ส่งคำขอบัตรผู้จัดแสดง",   href: "/forms/m2-badge",      type: "marketing", icon: <BadgeCheck size={15}/>,    required: true,  status: "in-progress" },
  { code: "M3",  title: "Social Media Promotion",     titleTh: "โปรโมทโซเชียลมีเดีย",     href: "/forms/m3-social",     type: "marketing", icon: <Share2 size={15}/>,        badge: "B2C",    status: "pending" },
  { code: "M4",  title: "Banners & Logo",             titleTh: "แบนเนอร์และโลโก้",         href: "/forms/m4-banners",    type: "marketing", icon: <Image size={15}/>,                          status: "pending" },
  { code: "M5",  title: "Videos Upload",              titleTh: "อัปโหลดวิดีโอ",            href: "/forms/m5-videos",     type: "marketing", icon: <Video size={15}/>,         badge: "B2C",    status: "pending" },
  { code: "M6",  title: "In-booth Activities",        titleTh: "กิจกรรมในบูธ",             href: "/forms/m6-activities", type: "marketing", icon: <Zap size={15}/>,           badge: "B2C",    status: "pending" },
  { code: "M7",  title: "Premium Digital Marketing",  titleTh: "แพ็กเกจดิจิทัลพรีเมียม",  href: "/forms/m7-premium",    type: "marketing", icon: <Star size={15}/>,          badge: "Premium",status: "pending" },
  // Technical
  { code: "T1",  title: "Fascia Name",                titleTh: "ชื่อป้ายหน้าบูธ",          href: "/forms/t1-fascia",     type: "technical",  icon: <Ruler size={15}/>,                          status: "completed" },
  { code: "T2",  title: "Nominated Stand Contractor", titleTh: "ผู้รับเหมาบูธ",            href: "/forms/t2-contractor", type: "technical",  icon: <Hammer size={15}/>,                         status: "completed" },
  { code: "T2A", title: "Booth Design Submission",    titleTh: "ส่งแบบบูธ",                href: "/forms/t2a-design",    type: "technical",  icon: <Ruler size={15}/>,         badge: "Due soon",status: "in-progress" },
  { code: "T5",  title: "Electricity & Lighting",     titleTh: "ไฟฟ้าและแสงสว่าง",        href: "/forms/t5-electrical", type: "technical",  icon: <Plug size={15}/>,                           status: "pending" },
  { code: "T3",  title: "Furniture & Equipment",      titleTh: "เฟอร์นิเจอร์และอุปกรณ์",   href: "/forms/t3-furniture",  type: "technical",  icon: <Truck size={15}/>,                          status: "pending" },
  { code: "T7",  title: "Audio Visual Equipment",     titleTh: "อุปกรณ์เสียงและภาพ",       href: "/forms/t7-av",         type: "technical",  icon: <Volume2 size={15}/>,                        status: "pending" },
  { code: "T9",  title: "Security Service",           titleTh: "บริการรักษาความปลอดภัย",   href: "/forms/t9-security",   type: "technical",  icon: <Shield size={15}/>,                         status: "pending" },
  { code: "T12", title: "F&B Order",                  titleTh: "สั่งอาหารและเครื่องดื่ม",  href: "/forms/t12-fb",        type: "technical",  icon: <UtensilsCrossed size={15}/>,                status: "pending" },
];

const STATUS_CONFIG: Record<FormStatus, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  "completed":   { icon: <Check size={10} strokeWidth={3}/>, color: "#22c55e", bg: "rgba(34,197,94,0.15)",   label: "Submitted" },
  "in-progress": { icon: <Clock size={10}/>,                 color: "#c49228", bg: "rgba(196,146,42,0.15)",  label: "In progress" },
  "pending":     { icon: null,                               color: "#ffffff", bg: "transparent",            label: "Pending" },
};

const BADGE_STYLE: Record<string, { bg: string; color: string }> = {
  "B2C":      { bg: "rgba(228,23,63,0.15)",   color: "#e4173f" },
  "Premium":  { bg: "rgba(196,146,42,0.15)",  color: "#c49228" },
  "Due soon": { bg: "rgba(228,23,63,0.15)",   color: "#e4173f" },
};

const TYPE_COLOR = {
  marketing: { accent: "#00c4d4", bg: "rgba(0,196,212,0.10)", label: "Marketing" },
  technical:  { accent: "#c49228", bg: "rgba(196,146,42,0.10)", label: "Technical" },
};

export function FormsSection() {
  const locale = useLocale();
  const marketing = FORMS.filter(f => f.type === "marketing");
  const technical  = FORMS.filter(f => f.type === "technical");

  const completedCount   = FORMS.filter(f => f.status === "completed").length;
  const inProgressCount  = FORMS.filter(f => f.status === "in-progress").length;
  const total            = FORMS.length;
  const completedPct     = Math.round((completedCount / total) * 100);

  const renderGroup = (items: FormItem[], groupDelay = 0) =>
    items.map((form, i) => {
      const tc = TYPE_COLOR[form.type];
      const status = form.status ?? "pending";
      const sc = STATUS_CONFIG[status];
      const isCompleted   = status === "completed";
      const isInProgress  = status === "in-progress";

      return (
        <RevealOnScroll key={form.code} animation="scale" delay={groupDelay + i * 45} threshold={0.05}>
          <Link
            href={`/${locale}${form.href}`}
            className={`group relative flex items-center gap-3 border rounded-xl px-4 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.45)] transition-all duration-200 ${
              isCompleted
                ? "bg-[#0d1a10] border-[#22c55e]/20 hover:border-[#22c55e]/40"
                : "bg-[#141420] border-white/[0.07] hover:border-white/20"
            }`}
          >
            {/* type stripe */}
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full opacity-60" style={{ background: tc.accent }} />

            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
              style={{ background: tc.bg, color: tc.accent }}
            >
              {form.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-heading text-[11px] font-bold tracking-widest uppercase" style={{ color: tc.accent }}>{form.code}</span>
                {form.required && (
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[#e4173f] border border-[#e4173f]/30 rounded px-1 py-px">Required</span>
                )}
                {form.badge && !form.required && (
                  <span
                    className="text-[9px] font-bold tracking-widest uppercase rounded px-1.5 py-px"
                    style={{ background: BADGE_STYLE[form.badge].bg, color: BADGE_STYLE[form.badge].color }}
                  >
                    {form.badge}
                  </span>
                )}
              </div>
              <div className={`text-[13px] font-medium leading-tight mt-0.5 truncate ${isCompleted ? "text-white/60 line-through decoration-white/30" : "text-white/85"}`}>
                {form.title}
              </div>
              <div className="text-[11px] text-white/50 font-thai truncate">{form.titleTh}</div>
            </div>

            {/* Status indicator */}
            {isCompleted ? (
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: sc.bg, color: sc.color }}>
                {sc.icon}
              </div>
            ) : isInProgress ? (
              <div className="flex items-center gap-1 shrink-0" style={{ color: sc.color }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: sc.bg }}>
                  {sc.icon}
                </div>
              </div>
            ) : (
              <span className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all text-sm shrink-0">→</span>
            )}
          </Link>
        </RevealOnScroll>
      );
    });

  return (
    <section className="bg-[#09090f] border-t border-white/[0.07] px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll animation="up">
          <div className="flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.12em] text-[#e4173f] uppercase mb-2.5">
            <span className="line-grow w-5 h-0.5 bg-[#e4173f] inline-block" />
            Submission Forms
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="font-heading text-[clamp(26px,4vw,40px)] font-extrabold tracking-[-0.01em] text-white leading-none">Complete your forms</h2>
              <p className="text-[14px] text-white/55 mt-2 font-thai">กรอกแบบฟอร์มที่จำเป็นก่อนวันงาน</p>
            </div>
            <div className="flex items-center gap-4 shrink-0 text-[12px]">
              {[TYPE_COLOR.marketing, TYPE_COLOR.technical].map((tc) => (
                <div key={tc.label} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: tc.accent }} />
                  <span className="text-white/55 font-heading font-bold tracking-wide uppercase text-[11px]">{tc.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-[#141420] border border-white/[0.07] rounded-xl px-5 py-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-white/60 uppercase tracking-wider">Overall Progress</span>
                <span className="font-heading text-[13px] font-bold text-white">{completedCount} <span className="text-white/40 font-normal">/ {total} submitted</span></span>
              </div>
              <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${completedPct}%`, background: "linear-gradient(90deg, #22c55e, #16a34a)" }}
                />
              </div>
            </div>
            <div className="flex items-center gap-5 shrink-0 text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span className="text-white/60">{completedCount} Submitted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#c49228]" />
                <span className="text-white/60">{inProgressCount} In progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-white/60">{total - completedCount - inProgressCount} Pending</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {renderGroup(marketing, 0)}
          {renderGroup(technical, marketing.length * 45)}
        </div>
      </div>
    </section>
  );
}
