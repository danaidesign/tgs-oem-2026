import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Noto_Sans_Thai, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import "../globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
  weight: ["300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GCAxTGS 2026 — Exhibitor Portal",
  description: "Official exhibitor information portal for Gamescom Asia × Thailand Game Show 2026",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "th")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${barlowCondensed.variable} ${barlow.variable} ${notoSansThai.variable} ${geistMono.variable}`}
    >
      <body className={locale === "th" ? "font-thai" : ""}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
