import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ArticleCard } from "@/components/ArticleCard";
import {
  articleCategories,
  getArticlesByCategory,
  getCategoryBySlug,
} from "@/lib/articles";

export function generateStaticParams() {
  return articleCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | The Purity Lab" };
  }

  return {
    title: `${category.title} | The Purity Lab`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(slug);

  return (
    <div className="bg-[#F9F6F0]">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="border-b border-gray-200 pb-8">
          <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-wider text-gray-400">
            <Link href="/" className="transition-colors hover:text-[#005C66]">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/purity-lab"
              className="transition-colors hover:text-[#005C66]"
            >
              The Purity Lab
            </Link>
            <span>/</span>
            <span className="text-charcoal">{category.title}</span>
          </nav>
          <span className="mb-3 inline-block font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#4A7C59]">
            Category
          </span>
          <h1 className="mb-3 font-serif text-4xl text-[#005C66] lg:text-5xl">
            {category.title}
          </h1>
          <p className="max-w-2xl font-serif text-lg italic text-gray-600">
            {category.description}
          </p>
        </div>

        {/* Article grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <p className="font-serif text-xl text-charcoal">
              Fresh research is on the way.
            </p>
            <p className="mt-2 font-sans text-sm text-gray-500">
              We&apos;re busy formulating new articles for this category. Check
              back soon.
            </p>
          </div>
        )}

        <div>
          <Link
            href="/purity-lab"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#4A7C59] transition-all hover:gap-3"
          >
            <ArrowLeft size={16} /> Back to The Purity Lab
          </Link>
        </div>
      </div>
    </div>
  );
}
