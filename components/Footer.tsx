import Link from "next/link";
import { Leaf } from "lucide-react";

const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "Human Care", href: "/shop?category=human" },
      { label: "Baby Care", href: "/shop?category=baby" },
      { label: "Pet Wellness", href: "/shop?category=pets" },
      { label: "CBD Solutions", href: "/shop?category=cbd" },
      { label: "Shop All", href: "/shop" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "The Purity Lab", href: "/purity-lab" },
      {
        label: "The Science of Purity",
        href: "/purity-lab/category/science-of-purity",
      },
      {
        label: "The Relief Protocol",
        href: "/purity-lab/category/relief-protocol",
      },
      { label: "Family & Fur", href: "/purity-lab/category/family-and-fur" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/" },
      { label: "Love Stories", href: "/" },
      { label: "Contact", href: "/" },
      { label: "Giving Back", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white font-sans">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="text-[#005C66]" size={26} />
              <span className="flex flex-col">
                <span className="font-serif text-xl font-bold leading-none tracking-tight text-[#005C66]">
                  ResQ
                </span>
                <span className="mt-1 text-[9px] uppercase leading-none tracking-[0.25em] text-gray-400">
                  Organics
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-500">
              Medical-grade botanical care for compromised skin. Clean enough to
              eat, powerful enough to heal — for you, your family, and your pets.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#4A7C59]">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-[#005C66]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ResQ Organics. All rights reserved.
          </p>
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-400">
            No Synthetics • Fragrance-Free • Paraben-Free • Non-GMO
          </p>
        </div>
      </div>
    </footer>
  );
}
