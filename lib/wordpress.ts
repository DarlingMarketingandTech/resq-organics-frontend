import type { Category, Product } from "@/types";

const WORDPRESS_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ?? process.env.WORDPRESS_API_URL ?? "";

const WOO_CONSUMER_KEY = process.env.WOO_CONSUMER_KEY;
const WOO_CONSUMER_SECRET = process.env.WOO_CONSUMER_SECRET;

type RawEntity = Record<string, unknown>;

async function wordpressRequest<T>(path: string, params: Record<string, string> = {}) {
  if (!WORDPRESS_API_URL) {
    return null as T | null;
  }

  const url = new URL(path, WORDPRESS_API_URL);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  if (WOO_CONSUMER_KEY && WOO_CONSUMER_SECRET) {
    url.searchParams.set("consumer_key", WOO_CONSUMER_KEY);
    url.searchParams.set("consumer_secret", WOO_CONSUMER_SECRET);
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 300 },
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed (${response.status}) for ${path}`);
  }

  return (await response.json()) as T;
}

function toStringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toNumberValue(value: unknown, fallback = 0): number {
  return typeof value === "number" ? value : Number(value ?? fallback);
}

function mapProduct(rawProduct: RawEntity): Product {
  const rawCategories = Array.isArray(rawProduct.categories) ? rawProduct.categories : [];
  const rawImages = Array.isArray(rawProduct.images) ? rawProduct.images : [];

  // WooCommerce exposes product entities over REST while internally sourcing from
  // core WordPress/Woo lookup tables (e.g., wp_posts + wp_wc_product_meta_lookup).
  return {
    id: toNumberValue(rawProduct.id),
    name: toStringValue(rawProduct.name),
    slug: toStringValue(rawProduct.slug),
    description: toStringValue(rawProduct.description),
    short_description: toStringValue(rawProduct.short_description),
    price: toStringValue(rawProduct.price, "0"),
    regular_price: toStringValue(rawProduct.regular_price, "0"),
    sale_price: toStringValue(rawProduct.sale_price),
    average_rating: toStringValue(rawProduct.average_rating, "0"),
    rating_count: toNumberValue(rawProduct.rating_count),
    stock_status:
      toStringValue(rawProduct.stock_status, "outofstock") as Product["stock_status"],
    categories: rawCategories
      .filter((category): category is RawEntity => typeof category === "object" && category !== null)
      .map((category) => ({
        id: toNumberValue(category.id),
        name: toStringValue(category.name),
        slug: toStringValue(category.slug),
      })),
    images: rawImages
      .filter((image): image is RawEntity => typeof image === "object" && image !== null)
      .map((image) => ({
        id: toNumberValue(image.id),
        src: toStringValue(image.src, "/placeholder-product.png"),
        alt: toStringValue(image.alt, toStringValue(rawProduct.name, "Product image")),
      })),
  };
}

export async function getProducts(limit = 8): Promise<Product[]> {
  const data = await wordpressRequest<RawEntity[]>("/wp-json/wc/v3/products", {
    per_page: String(limit),
    status: "publish",
  });

  if (!data) {
    return [];
  }

  return data.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await wordpressRequest<RawEntity[]>("/wp-json/wc/v3/products", {
    slug,
    status: "publish",
  });

  if (!data?.length) {
    return null;
  }

  return mapProduct(data[0]);
}

export async function getCategories(): Promise<Category[]> {
  const data = await wordpressRequest<RawEntity[]>("/wp-json/wc/v3/products/categories", {
    per_page: "100",
    hide_empty: "true",
  });

  if (!data) {
    return [];
  }

  return data.map((category) => ({
    id: toNumberValue(category.id),
    name: toStringValue(category.name),
    slug: toStringValue(category.slug),
    description: toStringValue(category.description),
    count: toNumberValue(category.count),
  }));
}
