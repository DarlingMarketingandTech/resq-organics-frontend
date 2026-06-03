import Image from "next/image";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/wordpress";

function stripHtml(input: string) {
  return input.replace(/<[^>]+>/g, "").trim();
}

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

  const heroImage = product.images[0]?.src || "/placeholder-product.png";

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12 lg:px-8">
      <section className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-cream-100">
          <Image
            src={heroImage}
            alt={product.images[0]?.alt || product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-xl bg-cream-100">
              <Image
                src={product.images[index]?.src || heroImage}
                alt={product.images[index]?.alt || product.name}
                fill
                sizes="(max-width: 1024px) 33vw, 16vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-earth-500">ResQ Organics</p>
          <h1 className="mt-2 text-3xl font-semibold text-earth-900">{product.name}</h1>
          <p className="mt-4 text-earth-700">{stripHtml(product.short_description)}</p>
        </div>

        <div className="rounded-2xl border border-earth-100 bg-white p-5">
          <p className="text-sm text-earth-600">One-time purchase</p>
          <p className="mt-1 text-3xl font-semibold text-earth-900">${Number(product.price || 0).toFixed(2)}</p>
          <button
            type="button"
            className="mt-4 w-full rounded-full bg-earth-800 px-4 py-3 text-sm font-semibold text-white hover:bg-earth-900"
          >
            Add to Cart
          </button>
        </div>

        <div className="rounded-2xl border border-earth-100 bg-white p-5">
          <div className="border-b border-earth-100 pb-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-earth-500">Ingredients</h2>
            <p className="mt-2 text-sm text-earth-700">{stripHtml(product.description)}</p>
          </div>
          <div className="pt-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-earth-500">Benefits</h2>
            <p className="mt-2 text-sm text-earth-700">
              Restores barrier health, supports hydration retention, and promotes calm, balanced skin.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
