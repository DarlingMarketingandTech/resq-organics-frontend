import Image from "next/image";
import Link from "next/link";
import { Check, Star } from "lucide-react";

import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  badge?: string;
}

function stripHtml(input: string) {
  return input.replace(/<[^>]+>/g, "").trim();
}

export function ProductCard({ product, badge = "Best Seller" }: ProductCardProps) {
  const image = product.images[0]?.src || "/placeholder-product.png";
  const rating = Number(product.average_rating || 0);
  const price = Number(product.price || product.regular_price || 0);
  const subtitle =
    stripHtml(product.short_description) ||
    "Medical-grade botanical care for compromised skin barriers.";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image area */}
        <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#F9F6F0] p-6">
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#4A7C59] backdrop-blur-sm">
            {badge}
          </span>
          <Image
            src={image}
            alt={product.images[0]?.alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-1 text-[#4A7C59]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={12}
              className={index < Math.round(rating) ? "fill-current" : "opacity-30"}
            />
          ))}
          <span className="ml-1 text-[11px] text-gray-400">
            ({product.rating_count || 0})
          </span>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="mb-2 font-serif text-2xl text-[#333333] transition-colors group-hover:text-[#005C66]">
            {product.name}
          </h3>
        </Link>
        <p className="mb-6 line-clamp-2 font-sans text-sm text-gray-500">
          {subtitle}
        </p>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <span className="flex items-center gap-1 rounded bg-gray-50 px-2 py-1 text-[10px] uppercase tracking-wider text-gray-400">
            <Check size={10} className="text-[#4A7C59]" /> No Synthetics
          </span>
          <span className="flex items-center gap-1 rounded bg-gray-50 px-2 py-1 text-[10px] uppercase tracking-wider text-gray-400">
            <Check size={10} className="text-[#4A7C59]" /> Fragrance Free
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
          <span className="font-serif text-xl text-[#005C66]">
            ${price.toFixed(2)}
          </span>
          <Link
            href={`/product/${product.slug}`}
            className="rounded-full bg-[#333333] px-6 py-3 font-sans text-xs uppercase tracking-widest text-white transition-colors hover:bg-[#005C66]"
          >
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}
