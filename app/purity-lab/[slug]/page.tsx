import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Leaf } from "lucide-react";

import { ArticleCard } from "@/components/ArticleCard";
import { MarkdownContent } from "@/components/MarkdownContent";
import {
  getAllArticles,
  getArticleBySlug,
  getCategoryTitle,
  getRelatedArticles,
} from "@/lib/articles";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found | The Purity Lab" };
  }

  return {
    title: `${article.title} | The Purity Lab`,
    description: article.excerpt,
  };
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article);

  return (
    <div className="bg-white">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-gray-100 bg-[#F9F6F0]">
        <Leaf className="absolute -right-16 -top-10 h-64 w-64 rotate-12 text-[#4A7C59] opacity-[0.07]" />
        <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
          <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-wider text-gray-400">
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
            <Link
              href={`/purity-lab/category/${article.category}`}
              className="transition-colors hover:text-[#005C66]"
            >
              {getCategoryTitle(article.category)}
            </Link>
          </nav>

          <Link
            href={`/purity-lab/category/${article.category}`}
            className="inline-block rounded-full bg-[#005C66]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#005C66] transition-colors hover:bg-[#005C66]/20"
          >
            {getCategoryTitle(article.category)}
          </Link>

          <h1 className="mt-5 font-serif text-3xl leading-tight text-brand-teal lg:text-5xl">
            {article.title}
          </h1>

          <p className="mt-5 max-w-2xl font-serif text-lg italic leading-relaxed text-gray-600">
            {article.excerpt}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
            <span className="font-medium text-charcoal">{article.author}</span>
            <span aria-hidden className="text-gray-300">
              •
            </span>
            <span>{formatDate(article.publishedAt)}</span>
            <span aria-hidden className="text-gray-300">
              •
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {article.readTime} min read
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <MarkdownContent content={article.body} />

        <div className="mt-16 rounded-2xl border border-gray-100 bg-[#F9F6F0] p-6 text-sm leading-relaxed text-gray-500">
          <p>
            <strong className="font-semibold text-charcoal">
              Editorial note:
            </strong>{" "}
            This article is provided for educational purposes only and is not
            intended as medical advice. ResQ Organics products are not intended
            to diagnose, treat, cure, or prevent any disease. Always consult your
            physician before starting a new supplement or treatment.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/purity-lab"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#4A7C59] transition-all hover:gap-3"
          >
            <ArrowLeft size={16} /> Back to The Purity Lab
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-[#F9F6F0]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-6 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-widest text-gray-400">
              Keep Reading
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
