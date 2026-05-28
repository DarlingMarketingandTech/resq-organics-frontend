import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/wordpress";
import type { Product } from "@/types";

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "All-In-One Intensive Skin Treatment",
    slug: "all-in-one-intensive-skin-treatment",
    description: "",
    short_description: "",
    price: "68",
    regular_price: "68",
    sale_price: "",
    average_rating: "5",
    rating_count: 128,
    stock_status: "instock",
    categories: [],
    images: [{ id: 1, src: "/products/intensive-treatment.jpg", alt: "Intensive skin treatment" }],
  },
  {
    id: 2,
    name: "Restoring Face and Body Wash",
    slug: "restoring-face-and-body-wash",
    description: "",
    short_description: "",
    price: "42",
    regular_price: "42",
    sale_price: "",
    average_rating: "5",
    rating_count: 95,
    stock_status: "instock",
    categories: [],
    images: [{ id: 2, src: "/products/restoring-wash.jpg", alt: "Face and body wash" }],
  },
  {
    id: 3,
    name: "Full Spectrum CBD Oil",
    slug: "full-spectrum-cbd-oil",
    description: "",
    short_description: "",
    price: "74",
    regular_price: "74",
    sale_price: "",
    average_rating: "4.9",
    rating_count: 151,
    stock_status: "instock",
    categories: [],
    images: [{ id: 3, src: "/products/full-spectrum-cbd-oil.jpg", alt: "CBD oil bottle" }],
  },
];

export default async function Home() {
  const products = (await getProducts(6)).slice(0, 3);
  const featuredProducts = products.length ? products : fallbackProducts;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-10 md:px-8 md:py-14">
      <section className="rounded-3xl bg-earth-900 px-8 py-14 text-cream-50 md:px-12">
        <p className="text-xs uppercase tracking-[0.16em] text-earth-100">Premium Organic Skincare</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
          Visible skin renewal, rooted in plants and powered by purpose.
        </h1>
        <p className="mt-6 max-w-xl text-earth-100">
          Discover clinically aligned formulas for daily repair, restoration, and relief.
        </p>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Core Offerings</h2>
          <a className="text-sm font-medium text-earth-700" href="/shop">
            View all
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl bg-white p-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Made with Love</h3>
          <p className="mt-2 text-sm text-earth-700">Small-batch formulations with ethically sourced botanicals.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Non-GMO + Organic Focus</h3>
          <p className="mt-2 text-sm text-earth-700">Every blend avoids unnecessary additives and synthetic fillers.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Giving Back Program</h3>
          <p className="mt-2 text-sm text-earth-700">
            A portion of every purchase supports community wellness and charitable health initiatives.
          </p>
        </div>
      </section>
    </div>
  );
}
