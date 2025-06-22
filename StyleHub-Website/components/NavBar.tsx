"use client";

// import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import Header from "./Header";
import { ShippingInfoProps } from "@/types";
import { User2Icon, ShoppingBag } from "lucide-react";
import Categories from "./Categories";
import { Poppins } from "next/font/google";
import SalesSentenceRotator from "./SalesSentence";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

const ProfileIcon = () => {
  return (
    <button
      aria-label="Profile"
      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer mx-2"
    >
      <User2Icon className="w-5 h-5 text-gray-700" />
    </button>
  );
};

const ShippingInfo = ({ itemsNum }: ShippingInfoProps) => {
  return (
    <div className="flex items-center space-x-1 cursor-pointer">
      <ShoppingBag className="w-6 h-6 text-gray-600" />
      <span className="text-sm font-semibold text-gray-600">({itemsNum})</span>
    </div>
  );
};

interface NavbarProps {
  locale: "ar" | "en";
  translations: {
    men: string;
    women: string;
    kids: string;
    footer: string;
  };
}

export default function Navbar({ locale, translations }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(`/${locale}/men`);

  const isActive = (href: string) => pathname === href;

  const links = [
    { href: `/${locale}/men`, label: translations.men },
    { href: `/${locale}/women`, label: translations.women },
    { href: `/${locale}/kids`, label: translations.kids },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 h-[50px] bg-white border-b border-gray-300 flex items-center justify-between px-5 z-50"
        aria-label="Primary navigation"
      >
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4">
          {links.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => setActiveHref(href)}
              className={
                href === activeHref
                  ? "text-md font-semibold text-black border-b-2 border-black cursor-pointer"
                  : "text-md text-gray-600 hover:underline transition-colors duration-300 cursor-pointer"
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Hamburger icon */}
        <div className="flex md:hidden">
          <button
            className="text-black"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Sales & Offers text - visible only on md and up */}
        <SalesSentenceRotator />

        {/* Site name - center on mobile */}
        <div className="block md:hidden absolute left-1/2 transform -translate-x-1/2">
          <span className={`${poppins.className} text-lg font-bold`}>
            StyleHub
          </span>
        </div>

        {/* LanguageSwitcher + Profile + Cart */}
        <div className="flex">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <ProfileIcon />
          <ShippingInfo itemsNum={0} />
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[50px] left-0 w-full bg-white border-t border-gray-400 flex flex-col py-1 md:hidden z-40">
            <div className="flex flex-row justify-around border-b border-gray-200 py-5">
              {links.map(({ href, label }, index) => (
                <div
                  key={href}
                  className={`flex-1 text-center ${
                    index !== 0 ? "border-l border-gray-300" : ""
                  }`}
                >
                  <button
                    key={href}
                    onClick={() => {
                      setActiveHref(href);
                      // setMenuOpen(false);
                    }}
                    className={`flex-1 text-center px-4 text-md ${
                      href === activeHref
                        ? "font-semibold text-black border-b-2 border-black"
                        : "text-gray-600 hover:underline transition-colors duration-300"
                    }`}
                  >
                    {label}
                  </button>
                </div>
              ))}
            </div>

            <div className="w-full md:hidden px-4">
              <div className="flex flex-col items-center divide-y divide-gray-200 border-b border-gray-200">
                <Categories isActive={isActive} path={activeHref} />
              </div>
            </div>

            {/* Mobile Language Switcher */}
            <div className="flex justify-center items-center my-4">
              <div className="bg-gray-200 px-3 py-1 rounded text-sm">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="hidden md:block fixed top-[0px] left-0 right-0 h-[30px] z-40">
        <Header locale={locale} isActive={isActive} path={activeHref} />
      </div>
    </>
  );
}
