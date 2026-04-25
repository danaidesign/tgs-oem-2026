import { setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[#09090f]">
      <Topbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
