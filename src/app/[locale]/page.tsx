import { setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleRootPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect(`/${locale}/home`);
}
