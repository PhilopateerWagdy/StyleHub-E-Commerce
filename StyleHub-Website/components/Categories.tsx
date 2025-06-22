import Link from "next/link";

export default function Categories({
  isActive,
  path,
}: {
  isActive: (href: string) => boolean;
  path: string;
}) {
  const links = [
    { href: `${path}/sale`, label: "Sale" },
    { href: `${path}/new`, label: "New" },
    { href: `${path}/tops`, label: "Tops" },
    { href: `${path}/bottoms`, label: "Bottoms" },
    { href: `${path}/shoes`, label: "Shoes" },
    { href: `${path}/bags`, label: "Bags" },
    { href: `${path}/accessory`, label: "Accessories" },
    { href: `${path}/homeware`, label: "Homeware" },
  ];

  return (
    <>
      {links.map(({ href, label }) => (
        <div key={href} className="w-full py-2 text-center">
          <Link
            href={href}
            className={`inline-block text-md transition-colors duration-300 hover:underline ${
              isActive(href)
                ? "font-semibold text-black border-b-2 border-black"
                : "text-gray-600"
            }`}
          >
            {label}
          </Link>
        </div>
      ))}
    </>
  );
}
