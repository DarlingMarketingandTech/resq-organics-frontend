import Image from "next/image";

import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0]?.src || "/placeholder-product.png";
  const rating = Number(product.average_rating || 0);
  const oneTimePrice = Number(product.price || product.regular_price || 0);
  const subscriptionPrice = Math.max(oneTimePrice * 0.9, 0);

  return (
    <article className="rounded-2xl border border-earth-100 bg-white p-4 shadow-sm">
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-cream-100">
        <Image
          src={image}
          alt={product.images[0]?.alt || product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold text-earth-900">{product.name}</h3>
      <p className="mt-1 text-sm text-earth-600">
        {"★".repeat(Math.round(rating) || 0)}
        <span className="ml-2">({product.rating_count || 0})</span>
      </p>

      <div className="mt-4 rounded-xl bg-cream-50 p-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-earth-700">Subscribe & save</span>
          <span className="font-semibold text-earth-900">${subscriptionPrice.toFixed(2)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-earth-700">One-time</span>
          <span className="font-semibold text-earth-900">${oneTimePrice.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-full bg-earth-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-earth-900"
      >
        Add to Cart
      </button>
    </article>
  );
}
