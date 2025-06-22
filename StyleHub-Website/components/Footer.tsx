import Link from "next/link";
import { getTranslations } from "@/i18n/request";
import { Facebook, Instagram } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export default async function Footer({ locale }: { locale: "ar" | "en" }) {
  const t = await getTranslations(locale);

  const links = [
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("nav-contact") },
    { href: `/${locale}/privacy-policy`, label: t("privacy") },
    { href: `/${locale}/responsibility`, label: t("resp") },
    // { href: `/${locale}/`, label: t("nav-home") },
  ];

  return (
    <footer className="bg-gray-100 py-10 px-4 md:px-20 border-t border-gray-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Company */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">StyleHub</h3>
          <ul className="text-md text-gray-600 space-y-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  key={href}
                  href={href}
                  className="hover:underline text-gray-600"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
          <ul className="text-md text-gray-600 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-md text-gray-600 mb-4">
            The latest news, offers, and updates.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-500 cursor-pointer transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-300 pt-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} StyleHub. All rights reserved.</p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-gray-800 transition"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-gray-800 transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Twitter/X"
            className="hover:text-gray-800 transition"
          >
            <FaXTwitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
    // <footer className="bg-white text-black border-t border-gray-400 py-6 text-center m-3">
    //   <nav aria-label="Footer navigation">
    //     <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
    //       {links.map(({ href, label }) => (
    //         <Link
    //           key={href}
    //           href={href}
    //           className="hover:underline text-gray-600"
    //         >
    //           {label}
    //         </Link>
    //       ))}
    //     </div>
    //   </nav>

    //   <p className="text-sm text-gray-400">© Copyright 2025 StyleHub Inc.</p>
    // </footer>
  );
}
