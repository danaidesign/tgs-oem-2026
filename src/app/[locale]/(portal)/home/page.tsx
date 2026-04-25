import { setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { Hero } from "@/components/home/Hero";
import { AlertsSection } from "@/components/home/AlertsSection";
import { InfoGrid } from "@/components/home/InfoGrid";
import { EventTimeline } from "@/components/home/EventTimeline";
import { FormsSection } from "@/components/home/FormsSection";
import { ContactsSection } from "@/components/home/ContactsSection";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AlertsSection />
      <InfoGrid />
      <EventTimeline />
      <FormsSection />
      <ContactsSection />
    </>
  );
}
