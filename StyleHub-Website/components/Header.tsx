// import DateTime from "@/components/DateTime";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Categories from "./Categories";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Header({
  locale,
  isActive,
  path,
}: {
  locale: "ar" | "en";
  isActive: (href: string) => boolean;
  path: string;
}) {
  return (
    <div className="bg-white text-black border-b border-gray-300 py-8 pt-18">
      <div className="flex flex-row w-full h-20">
        <div className={`flex-1 flex items-center justify-center px-5`}>
          <Link
            href={`/${locale}/`}
            className={`${poppins.className} text-black text-3xl font-bold tracking-tight me-auto`}
          >
            StyleHub
          </Link>
        </div>

        <div className="flex-3 flex items-center justify-center">
          <div className="hidden md:flex gap-4">
            <Categories isActive={isActive} path={path} />
          </div>
        </div>

        <div
          className={`flex-1 flex items-center justify-end ${
            locale === "en" ? `pr-5` : `pl-5`
          }`}
        >
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
