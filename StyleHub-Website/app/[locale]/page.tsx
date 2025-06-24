import { redirect } from "next/navigation";

export default async function LocaleRootPage({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/men`);
}
