interface SEOOptions {
  locale: "en" | "ar";
  path?: string;
}

export async function getLocalizedMetadata({ locale, path = "" }: SEOOptions) {
  const fullUrl = `http://localhost:3000/${locale}/${path}`;

  return {
    title: "Style Hub",
    description: "Style Hub Website",
    alternates: {
      canonical: fullUrl,
      languages: {
        en: `/en/${path}`,
        ar: `/ar/${path}`,
      },
    },
    openGraph: {
      title: "Style Hub",
      description: "Style Hub Website",
      url: fullUrl,
      type: "website",
    },
  };
}
