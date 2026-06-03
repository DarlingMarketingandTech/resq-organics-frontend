import Link from "next/link";
import { notFound } from "next/navigation";
import { Leaf } from "lucide-react";

import { ProductDetailClient } from "@/components/ProductDetailClient";
import { getProductBySlug } from "@/lib/wordpress";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex text-xs font-medium uppercase tracking-wider text-gray-400">
          <Link href="/" className="transition-colors hover:text-[#005C66]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="transition-colors hover:text-[#005C66]">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#333333]">{product.name}</span>
        </nav>
      </div>

      {/* Product detail */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <ProductDetailClient product={product} />
      </section>

      {/* Editorial banner */}
      <section className="relative overflow-hidden bg-[#005C66] py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hexagons"
                width="50"
                height="43.4"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(2)"
              >
                <path
                  d="M25 0L50 14.4v28.8L25 43.4L0 28.8V14.4z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Leaf className="mx-auto mb-6 text-[#4A7C59]" size={32} />
          <h2 className="mb-6 font-serif text-4xl lg:text-5xl">
            The Cellular Alchemy of ResQ.
          </h2>
          <p className="mb-12 font-sans text-lg leading-relaxed text-white/80">
            We formulate with raw, food-grade ingredients because we believe what
            you put <em>on</em> your body is just as important as what you put{" "}
            <em>in</em> it. Our formula completely avoids water fillers, forcing
            active botanicals to do the heavy lifting of cellular repair.
          </p>

          <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur">
              <h3 className="mb-3 flex items-center gap-3 font-serif text-2xl">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A7C59] text-xs">
                  01
                </span>
                MGO 500+ Manuka
              </h3>
              <p className="text-sm text-white/70">
                Graded for its unique methylglyoxal (MGO) levels, this New Zealand
                honey acts as a powerful antibacterial agent that draws out toxins
                and supercharges healing skin cells.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur">
              <h3 className="mb-3 flex items-center gap-3 font-serif text-2xl">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A7C59] text-xs">
                  02
                </span>
                Cehami Botanical
              </h3>
              <p className="text-sm text-white/70">
                Derived from an Australian daisy, this natural analgesic is three
                times stronger than aspirin for rapid pain relief, acting as a
                moisture-locking humectant.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
