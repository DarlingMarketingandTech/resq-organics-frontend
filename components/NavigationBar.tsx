import Link from "next/link";

const shopMenu = [
  {
    title: "Skincare",
    links: [
      { href: "/collections/skincare/treatments", label: "Treatments" },
      { href: "/collections/skincare/cleansers", label: "Cleansers" },
      { href: "/collections/skincare/moisture", label: "Hydration" },
    ],
  },
  {
    title: "CBD",
    links: [
      { href: "/collections/cbd/oils", label: "CBD Oils" },
      { href: "/collections/cbd/wellness", label: "Daily Wellness" },
      { href: "/collections/cbd/recovery", label: "Recovery" },
    ],
  },
];

export function NavigationBar() {
  const cartItemCount = 0;

  return (
    <header className="sticky top-0 z-30 border-b border-earth-100 bg-cream-50/95 backdrop-blur">
      <p className="bg-earth-700 px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.16em] text-cream-50">
        Free shipping over $65 • Crafted with love
      </p>
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide text-earth-900">
          ResQ Organics
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <details className="group relative">
            <summary className="list-none cursor-pointer text-sm font-medium text-earth-800">
              Shop
            </summary>
            <div className="absolute right-0 mt-3 grid w-[28rem] grid-cols-2 gap-4 rounded-2xl border border-earth-100 bg-white p-4 shadow-xl">
              {shopMenu.map((column) => (
                <div key={column.title}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-earth-500">
                    {column.title}
                  </h3>
                  <ul className="space-y-2">
                    {column.links.map((item) => (
                      <li key={item.href}>
                        <Link className="text-sm text-earth-800 hover:text-earth-600" href={item.href}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
          <Link className="text-sm font-medium text-earth-800 hover:text-earth-600" href="/about">
            About
          </Link>
        </div>

        <button
          type="button"
          className="relative inline-flex items-center gap-2 rounded-full border border-earth-200 px-3 py-2 text-sm text-earth-900"
          aria-label="Shopping cart"
        >
          <span aria-hidden="true">🛒</span>
          <span className="font-medium">Cart</span>
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-earth-800 px-1 text-xs text-white">
            {cartItemCount}
          </span>
        </button>
      </nav>
    </header>
  );
}
