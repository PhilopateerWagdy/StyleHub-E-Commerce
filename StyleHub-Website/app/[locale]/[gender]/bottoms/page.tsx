import { getTranslations } from "@/i18n/request";
import { getLocalizedMetadata } from "@/lib/getMetadata";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const genders = ["men", "women", "kids"];
  const locales = ["en", "ar"];

  return locales.flatMap((locale) =>
    genders.map((gender) => ({
      locale,
      gender,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "ar"; gender: "men" | "women" | "kids" }>;
}) {
  const { locale, gender } = await params;

  return getLocalizedMetadata({
    locale: locale,
    path: `${gender}`,
  });
}

export default async function Sale({
  params,
}: {
  params: Promise<{ locale: "en" | "ar"; gender: "men" | "women" | "kids" }>;
}) {
  const { locale, gender } = await params;
  const t = await getTranslations(locale);

  return (
    <main>
      <h1 className="text-2xl font-bold pb-7">{t("title")}</h1>
      <h1 className="text-2xl font-bold pb-7">
        {locale} / {gender} / bottoms
      </h1>
    </main>
  );
}
