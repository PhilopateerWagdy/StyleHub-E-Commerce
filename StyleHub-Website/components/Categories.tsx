import Link from "next/link";

export default function Categories({
  isActive,
  path,
  onSelect,
}: {
  isActive: (href: string) => boolean;
  path: string;
  onSelect?: () => void;
}) {
  const links = [
    { href: `${path}/sale`, label: "Sale" },
    { href: `${path}/new`, label: "New" },
    { href: `${path}/tops`, label: "Tops" },
    { href: `${path}/bottoms`, label: "Bottoms" },
    { href: `${path}/shoes`, label: "Shoes" },
    { href: `${path}/bags`, label: "Bags" },
    { href: `${path}/accessories`, label: "Accessories" },
    { href: `${path}/homewear`, label: "homewear" },
  ];

  return (
    <>
      {links.map(({ href, label }) => (
        <div key={href} className="w-full py-2 text-center">
          <Link
            href={href}
            onClick={onSelect}
            className={`inline-block text-md transition-colors duration-300 ${
              isActive(href)
                ? "font-semibold text-black border-b-2 border-black"
                : "text-gray-600 hover:underline"
            }`}
          >
            {label}
          </Link>
        </div>
      ))}
    </>
  );
}
