import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/wordpress";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

const filters = [
  { key: "all", label: "All" },
  { key: "human", label: "Human Care" },
  { key: "baby", label: "Baby Care" },
  { key: "pets", label: "Pet Wellness" },
  { key: "cbd", label: "CBD Solutions" },
];

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "All-In-One Intensive Skin Treatment",
    slug: "all-in-one-intensive-skin-treatment",
    description: "",
    short_description: "Medical-Grade Manuka Honey & Cehami Botanical for deep cellular repair.",
    price: "45",
    regular_price: "45",
    sale_price: "",
    average_rating: "5",
    rating_count: 128,
    stock_status: "instock",
    categories: [{ id: 1, name: "Human Care", slug: "human" }],
    images: [{ id: 1, src: "/placeholder-product.png", alt: "Intensive skin treatment" }],
  },
  {
    id: 2,
    name: "Restoring Face and Body Wash",
    slug: "restoring-face-and-body-wash",
    description: "",
    short_description: "Gentle daily cleanser that respects compromised skin barriers.",
    price: "42",
    regular_price: "42",
    sale_price: "",
    average_rating: "5",
    rating_count: 95,
    stock_status: "instock",
    categories: [{ id: 1, name: "Human Care", slug: "human" }],
    images: [{ id: 2, src: "/placeholder-product.png", alt: "Face and body wash" }],
  },
  {
    id: 3,
    name: "Pure Botanicals Baby Relief",
    slug: "pure-botanicals-baby-relief",
    description: "",
    short_description: "Ultra-gentle formula for newborn barriers, pediatrician recommended.",
    price: "30",
    regular_price: "30",
    sale_price: "",
    average_rating: "5",
    rating_count: 64,
    stock_status: "instock",
    categories: [{ id: 2, name: "Baby Care", slug: "baby" }],
    images: [{ id: 3, src: "/placeholder-product.png", alt: "Baby relief cream" }],
  },
  {
    id: 4,
    name: "Advanced Pet Relief Cream",
    slug: "advanced-pet-relief-cream",
    description: "",
    short_description: "Safe, lickable remedies for canine irritation and hot spots.",
    price: "38",
    regular_price: "38",
    sale_price: "",
    average_rating: "4.8",
    rating_count: 47,
    stock_status: "instock",
    categories: [{ id: 3, name: "Pet Wellness", slug: "pets" }],
    images: [{ id: 4, src: "/placeholder-product.png", alt: "Pet relief cream" }],
  },
  {
    id: 5,
    name: "Broad-Spectrum CBD Oil",
    slug: "broad-spectrum-cbd-oil",
    description: "",
    short_description: "Modulate inflammation and find lasting equilibrium, zero psychoactive.",
    price: "65",
    regular_price: "65",
    sale_price: "",
    average_rating: "4.9",
    rating_count: 151,
    stock_status: "instock",
    categories: [{ id: 4, name: "CBD Solutions", slug: "cbd" }],
    images: [{ id: 5, src: "/placeholder-product.png", alt: "CBD oil bottle" }],
  },
  {
    id: 6,
    name: "Daily Nourishing Body Lotion",
    slug: "daily-nourishing-body-lotion",
    description: "",
    short_description: "Lightweight everyday hydration with bio-active botanicals.",
    price: "34",
    regular_price: "34",
    sale_price: "",
    average_rating: "4.9",
    rating_count: 82,
    stock_status: "instock",
    categories: [{ id: 1, name: "Human Care", slug: "human" }],
    images: [{ id: 6, src: "/placeholder-product.png", alt: "Body lotion" }],
  },
];

function matchesCategory(product: Product, category: string) {
  if (category === "all") {
    return true;
  }
  return product.categories.some(
    (cat) =>
      cat.slug.toLowerCase().includes(category) ||
      cat.name.toLowerCase().includes(category),
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "all" } = await searchParams;
  const activeCategory = filters.some((f) => f.key === category) ? category : "all";

  const fetched = await getProducts(24);
  const products = fetched.length ? fetched : fallbackProducts;

  const filtered = products.filter((product) => matchesCategory(product, activeCategory));
  const displayProducts = filtered.length ? filtered : products;

  const activeLabel =
    filters.find((f) => f.key === activeCategory)?.label ?? "All";

  return (
    <div className="bg-[#F9F6F0]">
      {/* Header */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <span className="mb-3 inline-block font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#4A7C59]">
            The Collection
          </span>
          <h1 className="font-serif text-4xl text-[#333333] lg:text-5xl">
            {activeCategory === "all" ? "Shop All Solutions" : activeLabel}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-gray-500">
            Clinically aligned, food-grade formulas for daily repair, restoration,
            and relief — crafted for every member of the family.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="sticky top-20 z-20 border-b border-gray-100 bg-[#F9F6F0]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-5 sm:px-6 lg:px-8">
          {filters.map((filter) => {
            const href =
              filter.key === "all" ? "/shop" : `/shop?category=${filter.key}`;
            return (
              <Link
                key={filter.key}
                href={href}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-colors",
                  activeCategory === filter.key
                    ? "bg-[#005C66] text-white shadow-md shadow-[#005C66]/20"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-[#005C66] hover:text-[#005C66]",
                )}
              >
                {filter.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Product grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              badge={product.categories[0]?.name ?? "ResQ"}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
