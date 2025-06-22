"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const LanguageSwitcher = () => {
  const pathname = usePathname(); // e.g. /en/about
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const segments = pathname.split("/");
    const currentLocale = segments[1];
    const newLocale = currentLocale === "en" ? "ar" : "en";
    segments[1] = newLocale;
    const newPath = segments.join("/");

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="hover:bg-gray-200 text-md text-gray-600 rounded cursor-pointer w-23 h-10"
    >
      {pathname.startsWith("/en") ? "العربية" : "English"}
      {pathname.startsWith("/en") ? (
        <i className="fa-solid fa-globe text-sm text-white-500  ml-1"></i>
      ) : (
        <i className="fa-solid fa-globe text-sm text-white-500  mr-1"></i>
      )}
    </button>
  );
};

export default LanguageSwitcher;
