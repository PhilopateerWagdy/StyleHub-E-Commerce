import { getTranslations } from "@/i18n/request";
import { getLocalizedMetadata } from "@/lib/getMetadata";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;

  return getLocalizedMetadata({
    locale: locale,
    path: "/responsibility",
  });
}

export default async function Responsibility({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <>
      <h1 className="text-2xl font-bold pb-10">{t("resp")}</h1>
      <p className="text-lg whitespace-pre-line font-normal leading-relaxed">
        Responsibility
      </p>
    </>
  );
}
