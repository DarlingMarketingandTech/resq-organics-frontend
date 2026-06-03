"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Minus, Plus, ShieldCheck, Star } from "lucide-react";

import type { Product } from "@/types";
import { cn } from "@/lib/utils";

function stripHtml(input: string) {
  return input.replace(/<[^>]+>/g, "").trim();
}

const tabs = ["ingredients", "how to use", "the science"] as const;
type Tab = (typeof tabs)[number];

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const basePrice = Number(product.price || product.regular_price || 0);
  const sizes = [
    { label: "2 oz / 60 ml", price: basePrice },
    { label: "4 oz / 120 ml", price: Math.round(basePrice * 2 * 100) / 100 },
  ];

  const [activeImage, setActiveImage] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("ingredients");

  const rating = Number(product.average_rating || 0);
  const images = product.images.length
    ? product.images
    : [{ id: 0, src: "/placeholder-product.png", alt: product.name }];
  const mainImage = images[activeImage] ?? images[0];
  const selectedPrice = sizes[activeSize].price;
  const cartTotal = (selectedPrice * quantity).toFixed(2);

  const description =
    stripHtml(product.short_description) ||
    "A powerful organic cream clinically formulated for intense cellular repair. Effectively soothes eczema, rosacea, psoriasis, and deep dryness without greasiness.";

  const ingredientsText =
    stripHtml(product.description) ||
    "Medical Grade UMF Manuka Honey, Cehami Extract (Centipeda Cunninghamii), Barbadensis Miller Aloe Vera, Shea Butter, Organic Coconut Oil, Olive Oil, Cocoa Butter, Hemp Seed Oil, Vitamins B, C & E. Formulated without water, mineral oil, petroleum, alcohol, animal products, fragrances, or parabens.";

  return (
    <div className="flex flex-col gap-16 lg:flex-row">
      {/* Left: gallery */}
      <div className="lg:w-1/2">
        <div className="lg:sticky lg:top-28">
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] border border-gray-100 bg-[#F9F6F0] p-12">
            <div className="absolute right-1/4 top-1/4 z-0 h-48 w-48 rounded-full bg-yellow-600/5 blur-3xl" />
            <Image
              key={mainImage.src}
              src={mainImage.src}
              alt={mainImage.alt || product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="z-10 object-contain p-8 duration-500 animate-in fade-in"
            />
          </div>

          <div className="mt-6 flex gap-4">
            {[0, 1, 2, 3].map((index) => {
              const thumb = images[index] ?? images[0];
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(Math.min(index, images.length - 1))}
                  className={cn(
                    "relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border-2 transition-all",
                    activeImage === index
                      ? "border-[#005C66] bg-[#F9F6F0]"
                      : "border-gray-100 bg-gray-50 hover:border-gray-300",
                  )}
                >
                  <Image
                    src={thumb.src}
                    alt={thumb.alt || product.name}
                    fill
                    sizes="80px"
                    className="object-contain p-2 opacity-80"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: info & actions */}
      <div className="pt-4 lg:w-1/2">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex text-[#4A7C59]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className={index < Math.round(rating) ? "fill-current" : "opacity-30"}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-500">
            {rating ? rating.toFixed(2) : "5.00"} ({product.rating_count || 0} Love Stories)
          </span>
        </div>

        <h1 className="mb-4 font-serif text-4xl leading-[1.1] text-[#333333] lg:text-5xl">
          {product.name}
        </h1>
        <div className="mb-6 font-serif text-2xl text-[#005C66]">
          ${sizes[0].price.toFixed(2)} – ${sizes[1].price.toFixed(2)}
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded border border-gray-100 bg-[#F9F6F0] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#4A7C59]">
            <Check size={12} /> Medical-Grade Manuka
          </span>
          <span className="inline-flex items-center gap-1.5 rounded border border-gray-100 bg-[#F9F6F0] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">
            <Check size={12} /> No Synthetics
          </span>
          <span className="inline-flex items-center gap-1.5 rounded border border-gray-100 bg-[#F9F6F0] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">
            <Check size={12} /> Fragrance-Free
          </span>
        </div>

        <p className="mb-8 font-sans leading-relaxed text-gray-600">{description}</p>

        {/* Form actions */}
        <div className="mb-10 space-y-6 border-y border-gray-100 py-8">
          <div>
            <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-400">
              Select Size
            </label>
            <div className="flex gap-4">
              {sizes.map((size, index) => (
                <button
                  key={size.label}
                  type="button"
                  onClick={() => setActiveSize(index)}
                  className={cn(
                    "flex-1 rounded-xl py-3 text-center text-sm font-medium transition-colors",
                    activeSize === index
                      ? "border-2 border-[#005C66] bg-[#005C66]/5 text-[#005C66]"
                      : "border border-gray-200 text-gray-600 hover:border-gray-300",
                  )}
                >
                  {size.label}
                  <br />
                  <span className="font-serif text-xs">${size.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-14 w-32 items-center rounded-full border border-gray-200 bg-white px-2">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-[#005C66]"
              >
                <Minus size={16} />
              </button>
              <span className="flex-1 text-center font-medium text-[#333333]">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-[#005C66]"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              type="button"
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#005C66] font-sans text-sm font-medium tracking-wide text-white shadow-lg shadow-[#005C66]/20 transition-colors hover:bg-[#004A52]"
            >
              Add to Cart — ${cartTotal}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div>
          <div className="mb-6 flex gap-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative pb-4 text-sm font-bold uppercase tracking-widest transition-colors",
                  activeTab === tab
                    ? "text-[#005C66]"
                    : "text-gray-400 hover:text-gray-600",
                )}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#005C66]" />
                )}
              </button>
            ))}
          </div>

          <div className="font-sans text-sm leading-relaxed text-gray-600">
            {activeTab === "ingredients" && <p>{ingredientsText}</p>}
            {activeTab === "how to use" && (
              <p>
                Apply a small amount to affected areas, massaging into the skin
                until fully absorbed. Use 3x daily or as needed. Because our
                formula contains no water fillers, a small amount provides
                intense, concentrated coverage. Safe for the entire family.
              </p>
            )}
            {activeTab === "the science" && (
              <p>
                Our cornerstone ingredient, <strong>Cehami</strong>, is a
                botanical extract from an Australian flower scientifically proven
                to act as a natural analgesic (three times more active than
                aspirin) to stop pain and itch rapidly. Combined with the
                cellular-regenerative properties of MGO-rated Manuka honey, this
                balm physically draws moisture into damaged cells.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#F9F6F0] p-4">
          <ShieldCheck size={20} className="text-[#005C66]" />
          <p className="text-xs text-gray-500">
            100% Money-Back Guarantee. Food-grade purity, third-party tested.
          </p>
        </div>
      </div>
    </div>
  );
}
