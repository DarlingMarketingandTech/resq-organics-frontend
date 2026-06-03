import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, Leaf } from "lucide-react";

import { ArticleCard } from "@/components/ArticleCard";
import {
  articleCategories,
  getAllArticles,
  getCategoryArticleCount,
  getFeaturedArticle,
} from "@/lib/articles";

export const metadata = {
  title: "The Purity Lab | ResQ Organics",
  description:
    "Your essential guide to clean healing and organic skin science — research, relief protocols, and clean-living blueprints from ResQ Organics.",
};

export default function PurityLabPage() {
  const featured = getFeaturedArticle();
  const latest = getAllArticles().filter(
    (article) => article.slug !== featured.slug,
  );

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
            href={`/purity-lab/${featured.slug}`}
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
                  {featured.badge}
                </span>
                <span className="flex items-center gap-1 font-sans text-xs text-gray-400">
                  <Clock size={12} /> {featured.readTime} min read
                </span>
              </div>
              <h3 className="mb-4 font-serif text-2xl leading-tight text-charcoal transition-colors group-hover:text-[#005C66] lg:text-3xl">
                {featured.title}
              </h3>
              <p className="mb-8 line-clamp-3 font-sans text-sm leading-relaxed text-gray-500">
                {featured.excerpt}
              </p>
              <div className="flex items-center text-sm font-bold uppercase tracking-wide text-[#4A7C59] transition-all group-hover:gap-2">
                Read Article <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* Latest articles */}
        <div>
          <h2 className="mb-6 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-widest text-gray-400">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="mb-6 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-widest text-gray-400">
            Explore By Category
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {articleCategories.map((cat) => {
              const count = getCategoryArticleCount(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/purity-lab/category/${cat.slug}`}
                  className="group flex h-full cursor-pointer flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-[#005C66]/30 hover:shadow-md md:p-8"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="font-serif text-2xl text-charcoal transition-colors group-hover:text-[#005C66]">
                      {cat.title}
                    </h3>
                    <span className="rounded border border-gray-100 bg-gray-50 px-2 py-1 font-mono text-[10px] text-gray-400">
                      {count} {count === 1 ? "Article" : "Articles"}
                    </span>
                  </div>
                  <p className="mb-6 grow font-sans text-sm leading-relaxed text-gray-500">
                    {cat.description}
                  </p>
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-[#005C66] opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowRight size={14} className="ml-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
