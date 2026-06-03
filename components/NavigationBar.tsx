"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Leaf,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

type FeaturedProduct = {
  tag: string;
  name: string;
  desc: string;
  price: string;
  gradient: string;
};

type NavCategory = {
  key: string;
  label: string;
  href: string;
  categories: { title: string; links: { label: string; href: string }[] }[];
  featured: FeaturedProduct;
};

const navigationData: NavCategory[] = [
  {
    key: "human",
    label: "Human Care",
    href: "/shop?category=human",
    categories: [
      {
        title: "Treatment",
        links: [
          { label: "Intensive Skin Repair", href: "/shop?category=human" },
          { label: "Eczema & Psoriasis Relief", href: "/shop?category=human" },
          { label: "Burn & Wound Care", href: "/shop?category=human" },
        ],
      },
      {
        title: "Daily Routine",
        links: [
          { label: "Daily Nourishing Lotions", href: "/shop?category=human" },
          { label: "Face & Body Washes", href: "/shop?category=human" },
          { label: "Anti-Aging Serums", href: "/shop?category=human" },
        ],
      },
    ],
    featured: {
      tag: "Bestseller",
      name: "Intensive Skin Treatment",
      desc: "Medical-Grade Manuka Honey & Cehami Botanical",
      price: "$45.00",
      gradient: "from-[#e8e0d5] to-[#c1b5a4]",
    },
  },
  {
    key: "baby",
    label: "Baby Care",
    href: "/shop?category=baby",
    categories: [
      {
        title: "Gentle Healing",
        links: [
          { label: "Diaper Rash Cream", href: "/shop?category=baby" },
          { label: "Cradle Cap Solutions", href: "/shop?category=baby" },
          { label: "Baby Eczema Relief", href: "/shop?category=baby" },
        ],
      },
      {
        title: "Bath Time",
        links: [
          { label: "Tear-Free Shampoo", href: "/shop?category=baby" },
          { label: "Gentle Face & Body Wash", href: "/shop?category=baby" },
          { label: "Calming Bath Soak", href: "/shop?category=baby" },
        ],
      },
    ],
    featured: {
      tag: "Pediatrician Recommended",
      name: "Pure Botanicals Baby Relief",
      desc: "Ultra-gentle formula for newborn barriers.",
      price: "$30.00",
      gradient: "from-[#fdfbf7] to-[#e4e0d8]",
    },
  },
  {
    key: "pets",
    label: "Pet Wellness",
    href: "/shop?category=pets",
    categories: [
      {
        title: "Skin & Coat",
        links: [
          { label: "Hot Spot Relief Cream", href: "/shop?category=pets" },
          { label: "Anti-Itch Spray", href: "/shop?category=pets" },
          { label: "Healing Pet Shampoo", href: "/shop?category=pets" },
        ],
      },
      {
        title: "Internal Health",
        links: [
          { label: "Joint Care Drops", href: "/shop?category=pets" },
          { label: "Anxiety Relief CBD", href: "/shop?category=pets" },
          { label: "Daily Wellness Supplements", href: "/shop?category=pets" },
        ],
      },
    ],
    featured: {
      tag: "New Arrival",
      name: "Advanced Pet Relief Cream",
      desc: "Safe, lickable remedies for canine irritation.",
      price: "$38.00",
      gradient: "from-[#d5dee8] to-[#b3c3d4]",
    },
  },
  {
    key: "cbd",
    label: "CBD Solutions",
    href: "/shop?category=cbd",
    categories: [
      {
        title: "Full Spectrum Oils",
        links: [
          { label: "300mg Daily Drops", href: "/shop?category=cbd" },
          { label: "500mg Extra Strength", href: "/shop?category=cbd" },
          { label: "1000mg Maximum Relief", href: "/shop?category=cbd" },
        ],
      },
      {
        title: "Targeted Relief",
        links: [
          { label: "CBD Bath Bombs", href: "/shop?category=cbd" },
          { label: "Muscle & Joint Rub", href: "/shop?category=cbd" },
          { label: "Sleep Softgels", href: "/shop?category=cbd" },
        ],
      },
    ],
    featured: {
      tag: "Zero Psychoactive",
      name: "Broad-Spectrum CBD Oil",
      desc: "Modulate inflammation and find lasting equilibrium.",
      price: "$65.00",
      gradient: "from-[#dbe8d5] to-[#b7ccaf]",
    },
  },
];

export function NavigationBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeCategory =
    navigationData.find((item) => item.key === activeMenu) ?? null;

  return (
    <div className="font-sans">
      {/* Announcement bar */}
      <div className="relative z-50 bg-[#005C66] px-4 py-2.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-white">
        Free shipping on all orders over $75
        <span className="mx-2 opacity-50">|</span>
        100% Money-Back Guarantee
      </div>

      {/* Main navigation */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Mobile menu button */}
            <button
              type="button"
              className="p-2 text-gray-500 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-2">
              <Leaf className="text-[#005C66]" size={28} />
              <span className="flex flex-col">
                <span className="font-serif text-2xl font-bold leading-none tracking-tight text-[#005C66]">
                  ResQ
                </span>
                <span className="mt-1 text-[9px] uppercase leading-none tracking-[0.25em] text-gray-400">
                  Organics
                </span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav
              className="hidden h-full space-x-8 lg:flex"
              onMouseLeave={() => setActiveMenu(null)}
            >
              {navigationData.map((item) => (
                <div
                  key={item.key}
                  className="flex h-full items-center"
                  onMouseEnter={() => setActiveMenu(item.key)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200 ${
                      activeMenu === item.key
                        ? "text-[#005C66]"
                        : "text-gray-600 hover:text-[#005C66]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        activeMenu === item.key ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                </div>
              ))}
              <div className="flex h-full items-center">
                <Link
                  href="/purity-lab"
                  className="text-sm font-medium tracking-wide text-gray-600 transition-colors hover:text-[#005C66]"
                >
                  The Purity Lab
                </Link>
              </div>
            </nav>

            {/* Utility icons */}
            <div className="flex items-center space-x-5 text-gray-600 lg:space-x-6">
              <button
                type="button"
                aria-label="Search"
                className="transition-colors hover:text-[#005C66]"
              >
                <Search size={20} />
              </button>
              <button
                type="button"
                aria-label="Account"
                className="hidden transition-colors hover:text-[#005C66] sm:block"
              >
                <User size={20} />
              </button>
              <button
                type="button"
                aria-label="Cart"
                className="relative transition-colors hover:text-[#005C66]"
              >
                <ShoppingBag size={20} />
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#4A7C59] text-[9px] font-bold text-white">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu dropdown (desktop) */}
        <div
          className="absolute left-0 top-full hidden w-full lg:block"
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <AnimatePresence>
            {activeCategory && (
              <motion.div
                key={activeCategory.key}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full border-t border-gray-100 bg-white shadow-xl shadow-black/5"
              >
                <div className="mx-auto flex max-w-7xl gap-12 px-4 py-10 sm:px-6 lg:px-8">
                  {/* Category links */}
                  <div className="grid flex-1 grid-cols-2 gap-8">
                    {activeCategory.categories.map((cat) => (
                      <div key={cat.title}>
                        <h4 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#4A7C59]">
                          {cat.title}
                        </h4>
                        <ul className="space-y-3">
                          {cat.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                className="inline-block font-serif text-lg text-gray-600 transition-colors hover:text-[#005C66]"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <div className="col-span-2 mt-2 border-t border-gray-100 pt-6">
                      <Link
                        href={activeCategory.href}
                        className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-[#005C66] transition-colors hover:text-[#4A7C59]"
                      >
                        Shop All {activeCategory.label}
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  </div>

                  {/* Featured product */}
                  <Link
                    href={activeCategory.href}
                    className="group relative w-[400px] overflow-hidden rounded-2xl border border-gray-100 bg-[#F9F6F0] p-8"
                  >
                    <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#005C66] shadow-sm backdrop-blur-sm">
                      {activeCategory.featured.tag}
                    </div>
                    <div className="relative mb-6 flex h-48 items-center justify-center">
                      <div className="absolute inset-0 scale-150 rounded-full bg-white/40 blur-3xl" />
                      <div
                        className={`relative z-10 flex h-40 w-32 items-center justify-center rounded-xl border border-white/60 bg-gradient-to-b ${activeCategory.featured.gradient} shadow-lg transition-transform duration-500 group-hover:scale-105`}
                      >
                        <div className="text-center opacity-60">
                          <div className="mb-1 text-[10px] font-bold tracking-[0.2em] text-[#333333]">
                            RESQ
                          </div>
                          <div className="mx-auto mb-2 h-[1px] w-8 bg-[#333333]/30" />
                          <Leaf size={16} className="mx-auto text-[#333333]" />
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h5 className="mb-2 font-serif text-2xl text-[#333333] transition-colors group-hover:text-[#005C66]">
                        {activeCategory.featured.name}
                      </h5>
                      <p className="mb-4 font-sans text-sm text-gray-500">
                        {activeCategory.featured.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg text-[#005C66]">
                          {activeCategory.featured.price}
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#005C66] shadow-sm transition-colors group-hover:bg-[#005C66] group-hover:text-white">
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-white px-6 pb-10 pt-6"
            >
              <div className="mb-8 flex items-center gap-2">
                <Leaf className="text-[#005C66]" size={26} />
                <span className="font-serif text-xl font-bold tracking-tight text-[#005C66]">
                  ResQ Organics
                </span>
              </div>
              <ul className="space-y-1">
                {navigationData.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3 font-serif text-lg text-gray-700 transition-colors hover:bg-[#F9F6F0] hover:text-[#005C66]"
                    >
                      {item.label}
                      <ArrowRight size={16} className="text-[#4A7C59]" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/purity-lab"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 font-serif text-lg text-gray-700 transition-colors hover:bg-[#F9F6F0] hover:text-[#005C66]"
                  >
                    The Purity Lab
                    <ArrowRight size={16} className="text-[#4A7C59]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 font-serif text-lg text-gray-700 transition-colors hover:bg-[#F9F6F0] hover:text-[#005C66]"
                  >
                    Shop All
                    <ArrowRight size={16} className="text-[#4A7C59]" />
                  </Link>
                </li>
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
