import Link from "next/link";
import { ChevronRight, Clock, Leaf } from "lucide-react";

import { getCategoryTitle } from "@/lib/articles";
import type { Article } from "@/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/purity-lab/${article.slug}`}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[#F9F6F0]">
        <div className="absolute inset-0 bg-[#4A7C59]/5 transition-colors duration-500 group-hover:bg-[#4A7C59]/10" />
        <Leaf className="absolute -bottom-8 -right-8 h-32 w-32 rotate-12 text-[#4A7C59] opacity-10 transition-transform duration-700 group-hover:rotate-45" />
        <span className="z-10 font-serif text-lg italic text-[#005C66] opacity-40">
          {getCategoryTitle(article.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full bg-[#005C66]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#005C66]">
            {article.badge}
          </span>
          <span className="flex items-center gap-1 font-sans text-xs text-gray-400">
            <Clock size={12} /> {article.readTime} min read
          </span>
        </div>
        <h3 className="mb-3 font-serif text-xl leading-snug text-charcoal transition-colors group-hover:text-[#005C66]">
          {article.title}
        </h3>
        <p className="mb-6 line-clamp-3 flex-1 font-sans text-sm leading-relaxed text-gray-500">
          {article.excerpt}
        </p>
        <div className="flex items-center text-xs font-bold uppercase tracking-wide text-[#4A7C59] transition-all group-hover:gap-2">
          Read Article <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
}
