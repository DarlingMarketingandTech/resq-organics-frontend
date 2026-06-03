import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, Leaf } from "lucide-react";

const categories = [
  {
    title: "The Science of Purity",
    desc: "Educating on the bio-mechanics of natural ingredients vs. synthetic chemicals.",
    count: 12,
  },
  {
    title: "The Relief Protocol",
    desc: "Actionable, empathetic advice for managing painful, long-term skin conditions.",
    count: 8,
  },
  {
    title: "Family & Fur",
    desc: "Highlighting the safety of food-grade organic care for babies, adults, and animals.",
    count: 15,
  },
  {
    title: "The Clean Blueprint",
    desc: "Exposing industry secrets, decoding labels, and teaching clean lifestyle habits.",
    count: 6,
  },
];

export default function PurityLabPage() {
  return (
    <div className="bg-[#F9F6F0]">
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="border-b border-gray-200 pb-8">
          <span className="mb-3 inline-block font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#4A7C59]">
            Clean Healing & Organic Skin Science
          </span>
          <h1 className="mb-3 font-serif text-4xl text-[#005C66] lg:text-5xl">
            The Purity Lab
          </h1>
          <p className="max-w-2xl font-serif text-lg italic text-gray-600">
            Your essential guide to clean healing and organic skin science.
          </p>
        </div>

        {/* Featured research */}
        <div>
          <h2 className="mb-6 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-widest text-gray-400">
            Featured Research
          </h2>
          <Link
            href="/purity-lab"
            className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg md:flex-row"
          >
            <div className="relative flex min-h-[250px] items-center justify-center overflow-hidden bg-[#F9F6F0] md:w-1/2">
              <div className="absolute inset-0 bg-[#4A7C59]/5 transition-colors duration-500 group-hover:bg-[#4A7C59]/10" />
              <Leaf className="absolute -bottom-12 -right-12 h-48 w-48 rotate-12 text-[#4A7C59] opacity-10 transition-transform duration-700 group-hover:rotate-45" />
              <div className="z-10 font-serif text-2xl italic text-[#005C66] opacity-40">
                Bio-Spotlight
              </div>
            </div>

            <div className="flex flex-col justify-center bg-white p-8 md:w-1/2 md:p-12">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-[#005C66]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#005C66]">
                  Ingredient Deep Dive
                </span>
                <span className="flex items-center gap-1 font-sans text-xs text-gray-400">
                  <Clock size={12} /> 6 min read
                </span>
              </div>
              <h3 className="mb-4 font-serif text-2xl leading-tight text-[#333333] transition-colors group-hover:text-[#005C66] lg:text-3xl">
                Beyond the Hive: The Scientific Reason Manuka Honey Speeds Up
                Cellular Skin Repair.
              </h3>
              <p className="mb-8 line-clamp-3 font-sans text-sm leading-relaxed text-gray-500">
                Sourced directly from New Zealand, medical-grade Manuka honey&apos;s
                unique methylglyoxal (MGO) rating provides unmatched antibacterial
                and anti-inflammatory properties designed for deep cellular
                repair...
              </p>
              <div className="flex items-center text-sm font-bold uppercase tracking-wide text-[#4A7C59] transition-all group-hover:gap-2">
                Read Article <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* Categories */}
        <div>
          <h2 className="mb-6 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-widest text-gray-400">
            Explore By Category
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href="/purity-lab"
                className="group flex h-full cursor-pointer flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-[#005C66]/30 hover:shadow-md md:p-8"
              >
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="font-serif text-2xl text-[#333333] transition-colors group-hover:text-[#005C66]">
                    {cat.title}
                  </h3>
                  <span className="rounded border border-gray-100 bg-gray-50 px-2 py-1 font-mono text-[10px] text-gray-400">
                    {cat.count} Articles
                  </span>
                </div>
                <p className="mb-6 flex-grow font-sans text-sm leading-relaxed text-gray-500">
                  {cat.desc}
                </p>
                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-[#005C66] opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight size={14} className="ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
