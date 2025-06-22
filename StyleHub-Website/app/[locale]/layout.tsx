import Navbar from "@/components/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { getTranslations } from "@/i18n/request";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";

export const metadata: Metadata = {
  title: "Style Hub",
  description: "Style Hub Website",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  // Determine direction based on locale
  const direction = locale === "ar" ? "rtl" : "ltr";
  const translations = {
    men: "Men",
    women: "Women",
    kids: "Kids",
    header: "header",
    footer: t("about"),
  };

  return (
    <html lang={locale} dir={direction} className={locale === "ar" ? "ar" : ""}>
      <body className="min-h-screen flex flex-col">
        <ScrollTop />
        <Navbar locale={locale} translations={translations} />

        <main className="flex-grow px-4 py-6 pt-[80px] md:pt-[210px]">
          <div className="max-w-full mx-5 bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
            {children}
          </div>
        </main>

        <Footer locale={locale} />
      </body>
    </html>
  );
}
