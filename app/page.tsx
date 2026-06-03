import Link from "next/link";
import { ArrowRight, Heart, Leaf, ShieldCheck, Star } from "lucide-react";

import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/wordpress";
import type { Product } from "@/types";

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
    categories: [],
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
    categories: [],
    images: [{ id: 2, src: "/placeholder-product.png", alt: "Face and body wash" }],
  },
  {
    id: 3,
    name: "Full Spectrum CBD Oil",
    slug: "full-spectrum-cbd-oil",
    description: "",
    short_description: "Modulate inflammation and find lasting equilibrium, zero psychoactive.",
    price: "65",
    regular_price: "65",
    sale_price: "",
    average_rating: "4.9",
    rating_count: 151,
    stock_status: "instock",
    categories: [],
    images: [{ id: 3, src: "/placeholder-product.png", alt: "CBD oil bottle" }],
  },
];

const pillars = [
  {
    icon: ShieldCheck,
    color: "text-[#005C66]",
    title: "Medical-Grade Manuka",
    desc: "MGO 500+ rated for unmatched deep cellular repair.",
  },
  {
    icon: Leaf,
    color: "text-[#4A7C59]",
    title: "Bio-Active Botanicals",
    desc: "Cehami & Aloe Vera to accelerate natural regeneration.",
  },
  {
    icon: Heart,
    color: "text-[#333333]",
    title: "No Synthetics",
    desc: "Clean enough to eat. Safe for every member of the family.",
  },
];

export default async function Home() {
  const products = (await getProducts(6)).slice(0, 3);
  const featuredProducts = products.length ? products : fallbackProducts;

  return (
    <div className="bg-[#F9F6F0]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/4 translate-x-1/4 rounded-full bg-[#4A7C59]/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/3 rounded-full bg-[#005C66]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 py-20 lg:flex-row lg:gap-24 lg:py-32">
            {/* Hero text */}
            <div className="space-y-8 text-center lg:w-1/2 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#4A7C59]/20 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A7C59] shadow-sm">
                <Star size={12} className="fill-[#4A7C59]" /> Over 10,000+ Healing Stories
              </div>

              <h1 className="font-serif text-5xl leading-[1.1] tracking-tight text-[#333333] lg:text-7xl">
                Cellular healing <br />
                <span className="italic text-[#005C66]">driven by science.</span>
              </h1>

              <p className="mx-auto max-w-lg font-sans text-lg leading-relaxed text-gray-600 lg:mx-0">
                Premium grade Manuka Honey formulated with bio-active botanicals.
                Clinically proven relief to rapidly restore compromised skin
                barriers for you and your pets.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
                <Link
                  href="/shop?category=human"
                  className="w-full rounded-full bg-[#005C66] px-8 py-4 text-center font-sans text-sm font-medium tracking-wide text-white shadow-lg shadow-[#005C66]/20 transition-colors hover:bg-[#004A52] sm:w-auto"
                >
                  Shop Human Solutions
                </Link>
                <Link
                  href="/shop?category=pets"
                  className="w-full rounded-full border border-gray-200 bg-white px-8 py-4 text-center font-sans text-sm font-medium tracking-wide text-[#333333] transition-colors hover:border-[#005C66] hover:text-[#005C66] sm:w-auto"
                >
                  Shop Pet Wellness
                </Link>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative w-full max-w-md lg:w-1/2 lg:max-w-none">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white bg-white p-8 shadow-2xl shadow-black/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#005C66]/5 to-transparent" />

                <div className="absolute left-1/2 top-1/2 z-20 h-64 w-48 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/50 bg-gradient-to-b from-[#e8e0d5] to-[#c1b5a4] shadow-2xl transition-transform duration-700 ease-in-out group-hover:-translate-y-16">
                  <div className="absolute bottom-6 left-1/2 w-32 -translate-x-1/2 rounded bg-white/90 p-3 text-center backdrop-blur">
                    <div className="mb-1 text-[8px] font-bold tracking-widest text-gray-400">
                      MGO 500+
                    </div>
                    <div className="font-serif text-[10px] text-[#333333]">
                      Restorative Balm
                    </div>
                  </div>
                </div>

                <div className="absolute right-1/4 top-1/4 z-10 h-32 w-32 rounded-full bg-yellow-600/10 blur-2xl" />
                <div className="absolute bottom-1/4 left-1/4 z-10 h-40 w-40 rounded-full bg-[#4A7C59]/10 blur-2xl" />

                <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#005C66]/10">
                    <ShieldCheck size={20} className="text-[#005C66]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Purity Standard
                    </div>
                    <div className="font-serif text-sm text-[#333333]">
                      100% Food Grade
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND PILLARS */}
      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-3 md:divide-x md:divide-y-0">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group flex cursor-default flex-col items-center px-6 py-10 text-center lg:px-12"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F9F6F0] transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-md">
                    <Icon size={24} className={pillar.color} />
                  </div>
                  <h3 className="mb-2 font-serif text-xl text-[#333333]">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-gray-500">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#4A7C59]">
            Clinical Solutions
          </span>
          <h2 className="font-serif text-4xl text-[#333333] lg:text-5xl">
            Loved by thousands, formulated for relief.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-[#005C66] bg-white px-8 py-4 font-sans text-sm font-medium tracking-wide text-[#005C66] transition-colors hover:bg-[#005C66] hover:text-white"
          >
            Explore All Products <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
