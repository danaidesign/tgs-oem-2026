import { setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { SoundSchedulePage } from "@/components/pages/SoundSchedulePage";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Sound Schedule — GCAxTGS 2026 Exhibitor Portal",
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SoundSchedulePage />;
}
